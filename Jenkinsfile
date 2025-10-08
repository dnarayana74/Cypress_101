pipeline {
    agent any
    
    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main',
                    credentialsId: 'github-access-token',
                    url: 'https://github.com/dnarayana74/Cypress_101.git'
            }
        }
        
        stage('Setup Node & Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                powershell '''
                    try {
                        npm install
                        Write-Host "Dependencies installed successfully"
                    } catch {
                        Write-Host "Error installing dependencies: $_"
                        exit 1
                    }
                    
                    try {
                        npm audit fix
                    } catch {
                        Write-Host "Some issues may require manual intervention"
                    }
                    
                    try {
                        npx cypress verify
                    } catch {
                        Write-Host "Cypress verification failed, attempting install..."
                        npx cypress install
                    }
                '''
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests...'
                powershell '''
                    try {
                        npx cypress run
                    } catch {
                        Write-Host "Cypress tests failed: $_"
                        exit 1
                    }
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed. Check Cypress reports and logs.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
