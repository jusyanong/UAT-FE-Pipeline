pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        APP_NAME       = 'jusyanong-cicd'
        DOCKER_IMAGE   = "jusyanong/${APP_NAME}"
        IMAGE_TAG      = "${BUILD_NUMBER}"
        DOCKER_CREDS   = credentials('docker-hub-credentials')
        CONTAINER_PORT = '80'
        HOST_PORT      = '80'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        sh 'npm install'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Dependency install failed: ${e.message}")
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    try {
                        sh 'npm run build'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Frontend build failed: ${e.message}")
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        sh """
                            docker build \\
                                -t ${DOCKER_IMAGE}:${IMAGE_TAG} \\
                                -t ${DOCKER_IMAGE}:latest \\
                                .
                        """
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
                        sh """
                            echo \$DOCKER_CREDS_PSW | \\
                            docker login -u \$DOCKER_CREDS_USR --password-stdin
                            docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                            docker push ${DOCKER_IMAGE}:latest
                        """
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Docker push failed: ${e.message}")
                    }
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    try {
                        sh """
                            docker stop ${APP_NAME} || true
                            docker rm ${APP_NAME} || true
                            docker pull ${DOCKER_IMAGE}:${IMAGE_TAG}
                            docker run -d \\
                                --name ${APP_NAME} \\
                                --restart always \\
                                -p ${HOST_PORT}:${CONTAINER_PORT} \\
                                ${DOCKER_IMAGE}:${IMAGE_TAG}
                        """
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Deployment failed: ${e.message}")
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    try {
                        sh 'sleep 5'
                        sh """
                            docker ps | grep ${APP_NAME}
                            docker logs ${APP_NAME} --tail=20
                        """
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Verification failed: ${e.message}")
                    }
                }
            }
        }

    }

    post {
        success {
            echo "✅ Build #${BUILD_NUMBER} deployed successfully!"
            echo "🐳 Running as: ${DOCKER_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ Build #${BUILD_NUMBER} failed — check the logs."
        }
        always {
            echo "Pipeline finished for ${APP_NAME}"
            // "Magic" line that clears space after every build
            sh 'docker system prune -f'
        }
    }

}
