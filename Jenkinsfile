pipeline {
   agent {
        node {
            label ''
            customWorkspace '/home/jenkins/workspace/techify'
        }
    }

    environment {
        DOCKER_USER = 'saikishore1903'
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
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }   
        }   

        stage('Build  Images') {
            steps {
                sh '''
                    docker build -t ${BACKEND_IMAGE} ./backend
                    docker build -t ${FRONTEND_IMAGE} ./frontend
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                 withCredentials([usernamePasword(credentialsId: 'docker-hub-creds', passwordVariable: 'dockerhubpass',usernameVariable: 'dockerhubuser')]){
                    sh "docker login -u ${dockerhubuser} -p${dockerhubpass}"
                 }
                sh ''' 
                    docker push ${BACKEND_IMAGE}
                    docker push ${FRONTEND_IMAGE}
                '''
            }
        }

        stage('Prepare Backend Env for Deployment') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'backend-env-file', variable: 'BACKEND_ENV_PATH')]) {
                        sh '''
                            mkdir -p ./backend
                            cp "${BACKEND_ENV_PATH}" ./backend/.env
                            echo "Backend .env copied for runtime"
                        '''
                    }
                }
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
