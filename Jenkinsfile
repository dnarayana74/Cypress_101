pipeline {
    agent any

    environment {
        NODEJS_HOME = "C:\\Program Files\\nodejs"  // Update if Node is installed elsewhere
        PATH = "${env.NODEJS_HOME};${env.PATH}"
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout SCM') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/dnarayana74/Cypress_101.git',
                        credentialsId: 'github-access-token'
                    ]]
                ])
            }
        }

        stage('Setup Node & Dependencies') {
            steps {
                echo 'Setting up Node.js and installing dependencies...'
                powershell '''
                    node -v
                    npm -v

                    Write-Host "Installing npm dependencies..."
                    try {
                        npm ci
                    } catch {
                        Write-Host "npm install completed with warnings, continuing..."
                    }

                    Write-Host "Running npm audit fix (non-breaking)..."
                    npm audit fix || Write-Host "Some issues may need manual review."
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests...'
                powershell '''
                    # Run Cypress tests in headless mode
                    npx cypress run --browser chrome
                '''
            }
        }

        stage('Archive Test Results') {
            steps {
                echo 'Archiving Cypress test results...'
                archiveArtifacts artifacts: 'cypress/results/**/*.xml', allowEmptyArchive: true
                junit 'cypress/results/**/*.xml'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Cypress tests completed successfully!'
        }
        failure {
            echo 'Cypress tests or pipeline failed. Check archived artifacts for details.'
        }
    }
}
