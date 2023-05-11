interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string; 
}

interface LoginTemplateParams {
    title?: string;
    cookieName?: string;
    firebaseConfig: FirebaseConfig;
}

export const loginTemplate = (params: LoginTemplateParams) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${params.title}</title>
</head>
<body>
    <span>Logging in...</span>
    <script type="module">
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
        import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';

        const firebaseConfig = {
            apiKey: "${params.firebaseConfig.apiKey}",
            authDomain: "${params.firebaseConfig.authDomain}",
            projectId: "${params.firebaseConfig.projectId}",
            storageBucket: "${params.firebaseConfig.storageBucket}",
            messagingSenderId: "${params.firebaseConfig.messagingSenderId}",
            appId: "${params.firebaseConfig.appId}",
            measurementId: "${params.firebaseConfig.measurementId}",
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        const setCookie = (name, value) => {
            document.cookie = \`\${name}=\${value}\`;
        }

        const authenticate = async () => {
            try {
                await signInWithPopup(auth, provider);
                const idToken = await auth.currentUser.getIdToken(true);
                setCookie("${params.cookieName}", idToken);
                window.location.assign('/');
            } catch (error) {
                console.error(error);
            }
        }

        authenticate();
    </script>
    
</body>
</html>
`