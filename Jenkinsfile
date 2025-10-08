pipeline {
    agent any

    environment {
        CYPRESS_BROWSER = 'chrome' // Run Cypress in Chrome
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/dnarayana74/Cypress_101.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --browser chrome --headless'
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'cypress\\screenshots\\**\\*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress\\videos\\**\\*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            junit 'cypress\\results\\*.xml'
        }
    }
}
