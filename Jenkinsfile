pipeline {
    agent any

    tools {
        nodejs "NodeJS_20" // Configure NodeJS in Jenkins (Manage Jenkins > Global Tool Configuration)
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/dnarayana74/Cypress_101.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci' // faster and cleaner than npm install
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Use Chrome instead of Electron for more stable test runs
                bat 'npx cypress run --browser chrome --reporter mochawesome'
            }
        }
    }

    post {
        always {
            echo 'Archiving Cypress Reports...'
            archiveArtifacts artifacts: 'cypress/reports/**/*.html', allowEmptyArchive: true
        }
        success {
            echo '✅ Build and Tests Successful!'
        }
        failure {
            echo '❌ Some tests failed. Check the Console Output or HTML report for details.'
        }
    }
}
