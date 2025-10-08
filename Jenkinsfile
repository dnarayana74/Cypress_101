pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    tools {
        nodejs 'NodeJS_22'
    }

    environment {
        PATH = "${tool 'NodeJS_22'};${env.PATH}"
        NODE_CACHE_DIR = "${WORKSPACE}\\node_modules_cache"
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
                        credentialsId: 'github-access-token' // Replace with your Jenkins credential ID
                    ]]
                ])
            }
        }

        stage('Restore Node Modules Cache') {
            steps {
                echo "Restoring node_modules from cache..."
                powershell '''
                    if (Test-Path $env:NODE_CACHE_DIR) {
                        Write-Host "Cache found. Restoring node_modules..."
                        Copy-Item "$env:NODE_CACHE_DIR\\*" "$PWD\\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
                    } else {
                        Write-Host "No cache found."
                    }
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                powershell '''
                    Write-Host "Node version: $(node -v)"
                    Write-Host "NPM version: $(npm -v)"

                    if (!(Test-Path "node_modules")) { New-Item -ItemType Directory -Path "node_modules" | Out-Null }

                    Write-Host "Installing dependencies..."
                    npm ci

                    Write-Host "Ensuring Cypress is installed..."
                    npx cypress verify || npx cypress install

                    Write-Host "Running npm audit fix (non-breaking)..."
                    npm audit fix || Write-Host "Some vulnerabilities remain, continuing..."
                '''
            }
        }

        stage('Save Node Modules Cache') {
            steps {
                echo "Saving node_modules to cache..."
                powershell '''
                    if (!(Test-Path $env:NODE_CACHE_DIR)) { New-Item -ItemType Directory -Path $env:NODE_CACHE_DIR | Out-Null }
                    Copy-Item "$PWD\\node_modules\\*" "$env:NODE_CACHE_DIR" -Recurse -Force
                    Write-Host "node_modules cache updated."
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests with screenshots, videos, and JUnit report...'
                powershell '''
                    npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/results-[hash].xml,toConsole=true"
                '''
            }
            post {
                always {
                    echo 'Archiving Cypress artifacts and test results...'
                    archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
                    junit 'cypress/results/*.xml'
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
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Cypress test results!'
        }
    }
}
