
const { test } = require('node:test');
const assert = require('node:assert');

test('application returns the expected response', async () => {
    const response = await fetch('http://localhost:3000');
    const body = await response.text();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(
        body,
        'CI/CD Pipeline Application is Running!'
    );
});

test('application returns 404 for unknown routes', async () => {
    const response = await fetch('http://localhost:3000/unknown');
    const body = await response.text();

    assert.strictEqual(response.status, 404);
    assert.strictEqual(body, 'Page Not Found');
});
