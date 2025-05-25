pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'docker build -t hello-si-devops:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat 'kubectl apply -f k8s/'
            }
        }
    }
}