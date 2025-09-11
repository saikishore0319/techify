pipeline {
   agent {
        node {
            label 'any'
            customWorkspace '/home/jenkins/workspace/techify'
        }
    }

    environment {
        DOCKER_USER = 'saikishore1903'
        DOCKER_CREDS = credentials('docker-hub-creds')
        BACKEND_IMAGE  = "${DOCKER_USER}/techify-backend:latest"
        FRONTEND_IMAGE = "${DOCKER_USER}/techify-frontend:latest"
        BACKEND_ENV_FILE = credentials('backend-env-file')
        SONARQUBE_SERVER = tool 'Sonar'         
  
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv("Sonar") {
                    sh '''
                        $SONARQUBE_SERVER/bin/sonar-scanner \
                            -Dsonar.projectName=techify \
                            -Dsonar.projectKey=techify \
                    '''
                }
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

        stage('Prepare Backend Env for Deployment') {
             steps {
                sh '''
                    mkdir -p ./backend
                    chmod u+w ./backend
                    cp "$BACKEND_ENV_FILE" ./backend/.env
                    echo " Backend .env copied for runtime"
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
            sh 'echo "build success"'
        }
        failure {
            sh 'echo "build failed"'
        }
    }
}
