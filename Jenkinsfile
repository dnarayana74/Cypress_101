pipeline {
    agent any

    environment {
        CYPRESS_BASE_URL = 'http://localhost:3000'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/dnarayana74/Cypress_101.git', credentialsId: 'github-access-token'
            }
        }

        stage('Setup Node & Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                powershell '''
                    Write-Host "Node version: $(node -v)"
                    Write-Host "NPM version: $(npm -v)"

                    # Install dependencies
                    npm ci

                    # Attempt to fix vulnerabilities without breaking changes
                    npm audit fix || Write-Host "Some issues may require manual review"

                    # Verify or install Cypress
                    npx cypress verify || npx cypress install
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests...'
                powershell '''
                    npx cypress run --headless --browser chrome
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline passed!'
        }
        failure {
            echo 'Pipeline failed. Check Cypress reports and logs.'
        }
    }
}
