pipeline {
    agent any
    
    environment {
        // Using fixed "latest" tag as requested.
        DOCKER_IMAGE = "hello-si-devops:latest"
        SONAR_PROJECT_KEY = "hello-si-devops"
        EMAIL_RECIPIENTS = "lahbariismail@gmail.com"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                dir('app') {
                    bat 'npm install'
                }
            }
        }
        
        // stage('Code Analysis with SonarQube') {
        //     steps {
        //         echo 'Running SonarQube analysis...'
        //         withSonarQubeEnv('SonarQube') {
        //             // For Windows environments
        //             bat """
        //                 sonar-scanner.bat -Dsonar.projectKey=${SONAR_PROJECT_KEY} ^
        //                 -Dsonar.sources=app ^
        //                 -Dsonar.exclusions=app/node_modules/**,app/__tests__/** ^
        //                 -Dsonar.tests=app/__tests__ ^
        //                 -Dsonar.javascript.lcov.reportPaths=app/coverage/lcov.info
        //             """
        //         }
            
        //         // Quality Gate check
        //         timeout(time: 5, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                dir('app') {
                    bat 'npm test'
                }
            }
        }
        
        stage('Dependency Scan with Trivy') {
            steps {
                echo 'Scanning dependencies with Trivy...'
                // Using Trivy in Windows environment with Docker
                bat 'docker run --rm -v %CD%:/app aquasec/trivy fs --format table --severity HIGH,CRITICAL /app/app'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building the application...'
                bat "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        
        stage('Scan Docker Image with Trivy') {
            steps {
                echo 'Scanning Docker image with Trivy...'
                bat "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --format table --severity HIGH,CRITICAL ${DOCKER_IMAGE}"
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat 'kubectl apply -f k8s/'
            }
        }
    }
    
    post {
        always {
            // Clean up workspace.
            cleanWs()
        }
        success {
            // Email notification for successful builds
            emailext (
                subject: "✅ Pipeline Success: ${currentBuild.fullDisplayName}",
                body: """<p>The pipeline was successful!</p>
                <p><b>Project:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Build URL:</b> ${env.BUILD_URL}</p>""",
                to: "${EMAIL_RECIPIENTS}",
                attachLog: true
            )
        }
        failure {
            // Email notification for failed builds
            emailext (
                subject: "❌ Pipeline Failed: ${currentBuild.fullDisplayName}",
                body: """<p>The pipeline failed!</p>
                <p><b>Project:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Build URL:</b> ${env.BUILD_URL}</p>""",
                to: "${EMAIL_RECIPIENTS}",
                attachLog: true
            )
        }
    }
}