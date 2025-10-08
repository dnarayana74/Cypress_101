pipeline {
    agent any

    environment {
        NODEJS_HOME = "C:\\Program Files\\nodejs" // your Node.js path
        PATH = "${env.NODEJS_HOME};${env.PATH}"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo "Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/dnarayana74/Cypress_101.git', credentialsId: 'github-access-token'
            }
        }

        stage('Setup Node & Dependencies') {
            steps {
                echo 'Setting up Node.js and installing dependencies...'
                powershell '''
                    node -v
                    npm -v

                    Write-Host "Installing npm dependencies..."
                    npm ci

                    Write-Host "Running npm audit fix (non-breaking)..."
                    try {
                        npm audit fix
                    } catch {
                        Write-Host "Some issues may need manual review, continuing..."
                    }
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "Running Cypress tests..."
                powershell '''
                    npx cypress run
                '''
            }
        }

        stage('Archive Test Results') {
            steps {
                echo "Archiving test results..."
                junit 'cypress/results/*.xml'
                archiveArtifacts artifacts: 'cypress/screenshots/**/*.*, cypress/videos/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
        success {
            echo "Pipeline succeeded!"
        }
        failure {
            echo "Pipeline failed. Check test results."
        }
    }
}
