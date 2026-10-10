// Playwright config — serves the static site locally and runs the tests
// on desktop Chrome, an Android phone and an iPhone.
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;

module.exports = defineConfig({
    testDir: './tests',
    timeout: 45000,
    retries: 1,
    reporter: 'list',
    use: {
        baseURL: `http://127.0.0.1:${PORT}`,
    },
    webServer: {
        command: `npx http-server -p ${PORT} -c-1 --silent`,
        url: `http://127.0.0.1:${PORT}/index.html`,
        reuseExistingServer: true,
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'android', use: { ...devices['Pixel 7'] } },
        { name: 'iphone', use: { ...devices['iPhone 14'] } },
    ],
});
