pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                bat 'npm run merge-reports'
                bat 'npm run generate-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/mochawesome/**/*.html', fingerprint: true

            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports/mochawesome',
                reportFiles: 'mochawesome.html',
                reportName: 'Cypress Test Report'
            ])
        }
    }
}
