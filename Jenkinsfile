pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/your-repo.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t yourusername/your-app:latest .'
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
                sh 'docker push yourusername/your-app:latest'
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
    }
}
