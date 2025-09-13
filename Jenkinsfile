pipeline{
    agent{
        node{
            label ''
            customWorkspace '/home/jenkins/workspace/techify'
        }
    }
    parameters{
        string(name: "FRONTEND_DOCKER_TAG", defaultValue: "", description:'version of the docker image')
        string(name: "BACKEND_DOCKER_TAG", defaultValue: "", description:'version of the docker image')
    }
    environment{
        DOCKER_USER = 'saikishore1903'
        SONARQUBE_SERVER = tool 'Sonar'
        BACKEND_ENV_FILE = credentials('backend-env-file')
    }
    stages{
        stage('Validate Parameters'){
            steps{
                script{
                    if(params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == ''){
                        error("FRONTEND_DOCKER_TAG and BACKEND_DOCKER_TAG nust be provided")
                    }
                }
            }
        }
        stage('Checkout'){
            steps{
                cleanWs()
                checkout scm
            }
        }
        stage('SonarQube Scan'){
            steps{
                script{
                    sonarqube_analysis('Sonar','techify','tecchify')
                }
            }
        }
        stage('QualityGate check'){
            steps{
                script{
                    quality_gates()
                }
            }
        }
        stage('OWASP Dependency Check'){
            steps{
                script{
                    owasp_dependency_check('OWASP')
                }
            }
        }
        stage('Trivy file system scan'){
            steps{
                script{
                    trivy_scan()
                }
            }
        }
        stage('Build Docker image'){
            steps{
                script{

                    dir('backend'){
                    dockerBuild("techify-backend","${params.BACKEND_DOCKER_TAG}","${DOCKER_USER}")
                    }

                    dir('frontend'){
                    dockerBuild("techify-frontend","${params.FRONTEND_DOCKER_TAG}","${DOCKER_USER}")
                    }
                    
                }
            }
        }
        stage('Push images to registry'){
            steps{
                script{
                    docker_push('docker-hub-creds', 'techify-frontend',"${params.FRONTEND_DOCKER_TAG}")
                    docker_push('docker-hub-creds', 'techify-backend',"${params.BACKEND_DOCKER_TAG}")
                }
            }
        }
        stage('change the tags'){
            steps{
                script{
                    update_compose_file("${params.FRONTEND_DOCKER_TAG}","${params.BACKEND_DOCKER_TAG}",env.DOCKER_USER)
                }
            }
        }
        stage('prepare env file'){
            steps{
                script{
                    prepare_env_file(BACKEND_ENV_FILE)
                }
            }
        }
        stage('Deploy'){
            steps{
                script{
                    docker_compose()
                }
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