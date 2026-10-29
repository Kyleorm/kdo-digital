// Free website check form: end-to-end journeys (happy and unhappy paths).
// Web3Forms is mocked, so the tests never send real emails.
const { test, expect } = require('@playwright/test');

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Open the home page and bring the form into view
async function openForm(page) {
    await page.goto('/index.html#check');
    await page.locator('#checkForm').scrollIntoViewIfNeeded();
}

async function fillValidForm(page) {
    await page.fill('#cf-name', 'Jane Tester');
    await page.fill('#cf-email', 'jane@example.com');
    await page.fill('#cf-website', 'janesbakery.im');
    await page.fill('#cf-message', 'We bake cakes in Douglas. Our website is old.');
}

// Mock Web3Forms and record every request the page makes to it
async function mockWeb3Forms(page, respond) {
    const calls = [];
    await page.route(WEB3FORMS_URL, async (route) => {
        calls.push(route.request().postDataJSON());
        await respond(route);
    });
    return calls;
}

const sendOk = (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });

const submitBtn = (page) => page.locator('#checkForm .form-submit');
const successPanel = (page) => page.locator('#formCard .form-success');
const errorBox = (page) => page.locator('#cf-status');
const fieldError = (page, id) => page.locator(`#${id}-error`);

test.describe('Free website check form', () => {
    test('sends a valid request and shows the thank-you message', async ({ page }) => {
        const calls = await mockWeb3Forms(page, sendOk);
        await openForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();

        await expect(successPanel(page)).toBeVisible();
        await expect(successPanel(page)).toContainText("it's on its way");
        await expect(page.locator('#checkForm')).toBeHidden();

        expect(calls).toHaveLength(1);
        expect(calls[0]).toMatchObject({
            name: 'Jane Tester',
            email: 'jane@example.com',
            website: 'janesbakery.im',
            message: 'We bake cakes in Douglas. Our website is old.',
            subject: 'Free website check: Jane Tester',
        });
        expect(typeof calls[0].access_key).toBe('string');
    });

    test('works with just a name and email (no website yet)', async ({ page }) => {
        const calls = await mockWeb3Forms(page, sendOk);
        await openForm(page);
        await page.fill('#cf-name', 'Sam');
        await page.fill('#cf-email', 'sam@example.com');
        await submitBtn(page).click();

        await expect(successPanel(page)).toBeVisible();
        expect(calls).toHaveLength(1);
        expect(calls[0]).toMatchObject({ website: 'No website yet', message: '(no message)' });
    });

    test('blocks an empty form and shows the name and email errors', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openForm(page);
        await submitBtn(page).click();

        await expect(fieldError(page, 'cf-name')).toBeVisible();
        await expect(fieldError(page, 'cf-email')).toBeVisible();
        await expect(fieldError(page, 'cf-website')).toBeHidden();
        await expect(page.locator('#cf-name')).toBeFocused();
        await expect(page.locator('#cf-name')).toHaveAttribute('aria-invalid', 'true');
        expect(calls).toHaveLength(0);
    });

    test('rejects a badly formed email address', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openForm(page);
        await fillValidForm(page);
        await page.fill('#cf-email', 'not-an-email');
        await submitBtn(page).click();

        await expect(fieldError(page, 'cf-email')).toBeVisible();
        await expect(page.locator('#cf-email')).toBeFocused();
        expect(calls).toHaveLength(0);
    });

    test('rejects something that is not a web address', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openForm(page);
        await fillValidForm(page);
        await page.fill('#cf-website', 'not a website');
        await submitBtn(page).click();

        await expect(fieldError(page, 'cf-website')).toBeVisible();
        expect(calls).toHaveLength(0);

        // Fixing it clears the error straight away
        await page.fill('#cf-website', 'https://www.janesbakery.co.uk/cakes');
        await expect(fieldError(page, 'cf-website')).toBeHidden();
    });

    test('handles junk and script tags as plain text', async ({ page }) => {
        const calls = await mockWeb3Forms(page, sendOk);
        await openForm(page);
        await fillValidForm(page);
        const nasty = '<script>alert(1)</script> ' + 'x'.repeat(6000);
        await page.fill('#cf-message', nasty);
        await submitBtn(page).click();

        await expect(successPanel(page)).toBeVisible();
        expect(calls).toHaveLength(1);
        // The box stops at 5,000 characters and nothing on the page ran the script
        expect(calls[0].message.length).toBeLessThanOrEqual(5000);
        expect(calls[0].message.startsWith('<script>')).toBe(true);
    });

    test('keeps what they typed and offers email when sending fails', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();

        await expect(errorBox(page)).toBeVisible();
        await expect(errorBox(page)).toContainText('kyle@kdodigital.co.uk');
        await expect(page.locator('#cf-name')).toHaveValue('Jane Tester');
        await expect(successPanel(page)).toBeHidden();
        await expect(submitBtn(page)).toBeEnabled();
        expect(calls).toHaveLength(1);
    });

    test('treats a rejected send as a failure', async ({ page }) => {
        await mockWeb3Forms(page, (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: false }) })
        );
        await openForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();

        await expect(errorBox(page)).toBeVisible();
        await expect(successPanel(page)).toBeHidden();
    });

    test('a bot that ticks the hidden box is dropped without sending', async ({ page }) => {
        const calls = await mockWeb3Forms(page, sendOk);
        await openForm(page);
        await fillValidForm(page);
        await page.evaluate(() => { document.getElementById('cf-botcheck').checked = true; });
        await submitBtn(page).click();

        await expect(successPanel(page)).toBeVisible();
        expect(calls).toHaveLength(0);
    });

    test('a double click only sends once', async ({ page }) => {
        const calls = await mockWeb3Forms(page, async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 600));
            await sendOk(route);
        });
        await openForm(page);
        await fillValidForm(page);
        await submitBtn(page).dblclick();

        await expect(successPanel(page)).toBeVisible();
        expect(calls).toHaveLength(1);
    });
});
