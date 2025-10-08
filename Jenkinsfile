stage('Setup Node & Dependencies') {
    steps {
        echo 'Setting up Node.js and installing dependencies...'
        powershell '''
            node -v
            npm -v

            Write-Host "Installing npm dependencies..."
            npm ci

            Write-Host "Running npm audit fix (non-breaking)..."
            try {
                npm audit fix
            } catch {
                Write-Host "Some issues may need manual review, continuing..."
            }
        '''
    }
}
