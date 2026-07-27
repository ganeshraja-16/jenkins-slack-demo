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
                echo 'Validating site files...'
                sh '''
                    test -f site/index.html
                    test -f site/style.css
                    echo "Build validation passed"
                '''
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

        stage('Deploy') {
            steps {
                echo 'Deploying site to web server...'
                sh '''
                    sed "s/BUILD_NUMBER_PLACEHOLDER/${BUILD_NUMBER}/" site/index.html > /var/www/break/index.html
                    cp site/style.css /var/www/html/style.css
                '''
            }
            post {
                success {
                    slackSend(
                        channel: '#deployments',
                        color: 'good',
                        message: "🚀 Deployment SUCCESS: *${env.JOB_NAME}* #${env.BUILD_NUMBER} is live at http://100.60.64.127/"
                    )
                }
                failure {
                    slackSend(
                        channel: '#deployments',
                        color: 'danger',
                        message: "🛑 Deployment FAILED: *${env.JOB_NAME}* #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
                    )
                }
            }
        }
    }

    post {
        always {
            slackSend(
                channel: '#jenkins-builds',
                color: '#439FE0',
                message: "ℹ️ Pipeline finished: *${env.JOB_NAME}* #${env.BUILD_NUMBER} — status: ${currentBuild.currentResult}"
            )
        }
    }
}
