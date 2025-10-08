pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/dnarayana74/Cypress_101.git',
                    credentialsId: 'github-access-token'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --browser chrome'
            }
        }

        stage('Cypress Audit') {
    steps {
        sh 'npx cypress run --spec "cypress/e2e/lighthouse.cy.js"'
    }
}
    }
}
