pipeline {
    agent any

    // 1. ADD PARAMETERS BLOCK
    parameters {
        choice(name: 'Environment', choices: ['Staging', 'Production'], description: 'Select the environment to deploy to')
        string(name: 'BRANCH', defaultValue: 'master', description: 'GitHub branch to use')
    }

    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        APP_NAME       = 'jusyanong-cicd'
        DOCKER_IMAGE   = "jusyanong/${APP_NAME}"
        IMAGE_TAG      = "${BUILD_NUMBER}"
        DOCKER_CREDS   = credentials('docker-hub-credentials')
        
        // 2. DEFINE ENVIRONMENT SPECIFICS
        // You can change these ports if you want Staging on 3002 and Prod on 80
        STAGING_PORT   = ''
        PROD_PORT      = '3002'
        
        // 3. ADD SSH CREDENTIALS (ID from Jenkins Credentials Provider)
        // This is needed if your Jenkins is on a different server than your App
        EC2_CREDS      = credentials('aws-ec2-ssh-key') 
    }

    stages {
        stage('Checkout') {
            steps {
                // Uses the branch from your parameter
                git branch: "${params.BRANCH}", url: 'https://github.com/jusyanong/jusyanong-cicd.git'
            }
        }

        stage('Install & Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
                    sh "echo \$DOCKER_CREDS_PSW | docker login -u \$DOCKER_CREDS_USR --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Deploy to Environment') {
            steps {
                script {
                    // 4. DYNAMIC LOGIC BASED ON PARAMETER
                    def targetPort = params.Environment == 'Production' ? env.PROD_PORT : env.STAGING_PORT
                    echo "🚀 Deploying to ${params.TARGET_ENV} on Port ${targetPort}..."

                    try {
                        // Cleanup existing container
                        sh "docker stop ${APP_NAME} || true"
                        sh "docker rm ${APP_NAME} || true"

                        // Run new container
                        sh """
                            docker run -d \
                                --name ${APP_NAME} \
                                --restart always \
                                -p ${targetPort}:80 \
                                ${DOCKER_IMAGE}:${IMAGE_TAG}
                        """
                    } catch (Exception e) {
                        error("Deployment to ${params.TARGET_ENV} failed: ${e.message}")
                    }
                }
            }
        }

        stage('Verify') {
            steps {
                sh "docker ps | grep ${APP_NAME}"
            }
        }
    }

    post {
        success {
            echo "✅ Successfully deployed to ${params.TARGET_ENV}!"
        }
        always {
            sh 'docker system prune -f'
        }
    }
}