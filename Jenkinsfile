pipeline {
    agent any

    environment {
        NODE_VERSION = "18"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                git url: 'https://github.com/dnarayana74/Cypress_101.git', branch: 'main'
            }
        }

        stage('Setup Node & Dependencies') {
            steps {
                echo "Setting up Node.js and installing dependencies..."
                powershell '''
                    # Check Node version
                    node -v
                    # Clean install dependencies
                    npm ci
                    # Fail fast on high-severity vulnerabilities
                    npm audit --audit-level=high
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "Running Cypress tests..."
                powershell '''
                    npx cypress run --browser chrome
                '''
            }
        }

        stage('Archive Test Results') {
            steps {
                echo "Archiving Cypress videos and screenshots..."
                archiveArtifacts artifacts: 'cypress\\videos\\**\\*.mp4', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress\\screenshots\\**\\*.png', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }

        success {
            echo "All Cypress tests passed! ✅"
        }

        failure {
            echo "Cypress tests or pipeline failed. ❌ Check archived artifacts for details."
        }
    }
}
