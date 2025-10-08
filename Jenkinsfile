pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Generate Mochawesome Report') {
      steps {
        sh 'npm run merge-reports'
        sh 'npm run generate-report'
      }
    }
  }

  post {
    always {
      // Archive the Mochawesome HTML report
      archiveArtifacts artifacts: 'cypress/reports/mochawesome/**/*.html', fingerprint: true

      // Publish the HTML report to Jenkins
      publishHTML ([
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
