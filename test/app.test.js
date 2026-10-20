

const { test } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { spawn } = require('node:child_process');

test('Homepage displays the styled application page', async (t) => {
    const serverProcess = spawn('node', ['app.js'], {
        stdio: 'ignore'
    });

    try {
        // Wait for the application server to start.
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(
                () => reject(new Error('Server startup timed out')),
                5000
            );

            const checkServer = () => {
                http.get('http://localhost:3000/', (res) => {
                    clearTimeout(timeout);
                    resolve(res);
                    res.resume();
                }).on('error', () => {
                    setTimeout(checkServer, 200);
                });
            };

            checkServer();
        });

        const response = await new Promise((resolve, reject) => {
            http.get('http://localhost:3000/', (res) => {
                let body = '';

                res.setEncoding('utf8');
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => resolve({ statusCode: res.statusCode, body }));
            }).on('error', reject);
        });

        assert.strictEqual(response.statusCode, 200);
        assert.match(response.body, /Application Running!/);
        assert.match(response.body, /status-box/);
        assert.match(response.body, /Server Online/);
    } finally {
        serverProcess.kill();
    }
});

test('Unknown route returns 404', async () => {
    const serverProcess = spawn('node', ['app.js'], {
        stdio: 'ignore'
    });

    try {
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(
                () => reject(new Error('Server startup timed out')),
                5000
            );

            const checkServer = () => {
                http.get('http://localhost:3000/unknown', (res) => {
                    clearTimeout(timeout);
                    resolve(res);
                    res.resume();
                }).on('error', () => {
                    setTimeout(checkServer, 200);
                });
            };

            checkServer();
        });

        const response = await new Promise((resolve, reject) => {
            http.get('http://localhost:3000/unknown', (res) => {
                let body = '';

                res.setEncoding('utf8');
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => resolve({ statusCode: res.statusCode, body }));
            }).on('error', reject);
        });

        assert.strictEqual(response.statusCode, 404);
        assert.match(response.body, /Page Not Found/);
    } finally {
        serverProcess.kill();
    }
});
