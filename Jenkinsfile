pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
                 checkout scm  // (uncomment if using pipeline from SCM)
            }
        }

        stage('Build') {
            steps {
                echo "Building the project..."
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying application..."
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
