interface UnauthorizedTemplateParams {
    title?: string;
    cookieName?: string;
}

export const unauthorizedTemplate = (params: UnauthorizedTemplateParams) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${params.title}</title>
    <style>
        #retry {
            text-decoration: underline;
            cursor: pointer;
            color: blue;
        }
    </style>
    <script>
        const clearCookie = (name) => {
            document.cookie = \`\${name}=\`;
        }
        const retry = () => {
            clearCookie("${params.cookieName}");
            window.location.assign('/login');
        }
    </script>
</head>
<body>
    <span>Unauthorized</span>
    <br />
    <a id="retry" onclick="retry()">Retry Login</a>
    
</body>
</html>
`