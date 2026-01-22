pipeline {
  agent {
    kubernetes {
      // This YAML defines the "Docker Container" you want to use
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: my-builder  # We will refer to this name later
            image: node:18-alpine
            command:
            - cat
            tty: true
      '''
    }
  }
  stages {
    stage('Check Node Version') {
      steps {
        // We tell Jenkins: "Run this step inside the 'my-builder' container"
        container('my-builder') {
          sh 'node --version'
          sh 'npm --version'
          sh 'echo "Hello from inside the container!"'
        }
      }
    }
    stage('Check Host') {
      steps {
        // This runs in the default 'jnlp' agent (the base runner)
        sh 'echo "I am running on the Kubernetes Agent pod"'
      }
    }
    stage('Build Application') {
      steps {
        container('my-builder') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
  }
}