

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CI/CD Application</title>

                <style>
                    * {
                        box-sizing: border-box;
                    }

                    body {
                        background: #101827;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        padding: 20px;
                    }

                    .status-box {
                        background: #1e293b;
                        color: white;
                        padding: 40px;
                        border-radius: 16px;
                        text-align: center;
                        box-shadow: 0 8px 25px #00000055;
                        max-width: 500px;
                        width: 100%;
                    }

                    h1 {
                        margin-top: 0;
                        font-size: 28px;
                    }

                    .message {
                        color: #cbd5e1;
                        line-height: 1.6;
                    }

                    .status {
                        color: #4ade80;
                        font-weight: bold;
                        margin-top: 24px;
                    }
                </style>
            </head>

            <body>
                <div class="status-box">
                    <h1>Application Running!</h1>

                    <p class="message">
                        CI/CD Pipeline Application is Running!
                    </p>

                    <p class="status">● Server Online</p>
                </div>
            </body>
            </html>
        `);

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });

        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>404 - Page Not Found</title>
                <style>
                    body {
                        background: #101827;
                        color: white;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 80px 20px;
                    }
                </style>
            </head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The requested page does not exist.</p>
                <a href="/" style="color: #4ade80;">
                    Return to Home
                </a>
            </body>
            </html>
        `);
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
