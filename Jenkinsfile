@Library('my-shared-library') _

pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        APP_NAME           = 'uat-fe-app'
        DOCKER_IMAGE       = "jusyanong/${APP_NAME}"
        IMAGE_TAG          = "${BUILD_NUMBER}"
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // uses job config — no hardcoded URL
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  // cleaner than npm install for CI
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Tests failed: ${e.message}")
                    }
                }
            }
            post {
                always {
                    // publish test results if using Jest/Mocha reporters
                    // junit '**/test-results/*.xml'
                    echo 'Test stage complete'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Docker build failed: ${e.message}")
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    try {
                        sh '''
                            echo $DOCKER_CREDENTIALS_PSW | \
                            docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                            docker push ''' + DOCKER_IMAGE + ''':''' + IMAGE_TAG + '''
                            docker push ''' + DOCKER_IMAGE + ''':latest
                        '''
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Docker push failed: ${e.message}")
                    }
                }
            }
        }

        stage('Deploy to UAT') {
            when {
                branch 'main'  // only deploy from main
            }
            steps {
                script {
                    try {
                        sh "./deploy.sh ${IMAGE_TAG}"
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Deployment failed: ${e.message}")
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build #${BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "❌ Build #${BUILD_NUMBER} failed — check the logs."
        }
        always {
            // clean up docker credentials from memory
            sh 'docker logout'
            cleanWs()  // clean workspace after build
        }
    }
}
