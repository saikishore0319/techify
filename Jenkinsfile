pipeline {
    agent any

    environment {
        // 🔹 Hard-coded Docker Hub username
        DOCKER_USER = 'saikishore1903'

        // 🔹 Jenkins credential ID for Docker Hub password or token
        DOCKER_CREDS = credentials('docker-hub-creds')

        // 🔹 Images with tag
        BACKEND_IMAGE  = "${DOCKER_USER}/techify-backend:latest"
        FRONTEND_IMAGE = "${DOCKER_USER}/techify-frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh '''
                    echo "$DOCKER_CREDS_PSW" | docker login -u "$DOCKER_USER" --password-stdin
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build -t ${BACKEND_IMAGE} ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build -t ${FRONTEND_IMAGE} ./frontend
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh '''
                    docker push ${BACKEND_IMAGE}
                    docker push ${FRONTEND_IMAGE}
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    docker compose pull
                    docker compose up -d
                '''
            }
        }
    }

    post {
        success {
            sh "echo build success"
        }
        failure {
            sh "echo build failed"
        }
    }
}
