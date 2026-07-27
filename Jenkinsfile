pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Code checked out from GitHub'
            }
        }
        stage('Build') {
            steps {
                echo 'Running build steps...'
                sh 'exit 0'   
            }
        }
    }
    post {
        success {
            slackSend(
                channel: '#jenkins-builds',
                color: 'good',
                message: "✅ Build SUCCESS: *${env.JOB_NAME}* #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            )
        }
        failure {
            slackSend(
                channel: '#jenkins-builds',
                color: 'danger',
                message: "❌ Build FAILED: *${env.JOB_NAME}* #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            )
        }
    }
}
