// Contact form — end-to-end journeys (happy + unhappy paths).
// Web3Forms is mocked so tests never send real emails.
const { test, expect } = require('@playwright/test');

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Open the homepage, wait for the loader to hand off, then scroll to the form
async function openContactForm(page) {
    await page.goto('/index.html#contact');
    await page.waitForSelector('body.loaded', { timeout: 20000 });
    await page.locator('#projectForm').scrollIntoViewIfNeeded();
}

async function fillValidForm(page) {
    await page.fill('#cf-name', 'Jane Tester');
    await page.fill('#cf-email', 'jane@example.com');
    await page.fill('#cf-business', 'FitnessPod referral');
    await page.selectOption('#cf-need', 'A mobile app');
    await page.fill('#cf-message', 'Hi Kyle, FitnessPod recommended you. I need an app.');
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

const submitBtn = (page) => page.locator('#projectForm .form-submit');
const successPanel = (page) => page.locator('#contactForm .form-success');
const errorBox = (page) => page.locator('#cf-status');

test.describe('Contact form', () => {
    test('sends a valid enquiry and shows the thank-you message', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
        );
        await openContactForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();

        await expect(successPanel(page)).toBeVisible();
        await expect(successPanel(page)).toContainText('on its way');
        await expect(page.locator('#projectForm')).toBeHidden();

        expect(calls).toHaveLength(1);
        expect(calls[0]).toMatchObject({
            name: 'Jane Tester',
            email: 'jane@example.com',
            business: 'FitnessPod referral',
            looking_for: 'A mobile app',
            message: 'Hi Kyle, FitnessPod recommended you. I need an app.',
            subject: 'New project enquiry — Jane Tester',
        });
        expect(typeof calls[0].access_key).toBe('string');
    });

    test('blocks an empty form and shows every required-field error', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openContactForm(page);
        await submitBtn(page).click();

        await expect(page.locator('#cf-name').locator('xpath=..').locator('.field-error')).toBeVisible();
        await expect(page.locator('#cf-email').locator('xpath=..').locator('.field-error')).toBeVisible();
        await expect(page.locator('#cf-message').locator('xpath=..').locator('.field-error')).toBeVisible();
        await expect(page.locator('#cf-name')).toBeFocused();
        expect(calls).toHaveLength(0);
    });

    test('rejects a badly formed email address', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openContactForm(page);
        await fillValidForm(page);
        await page.fill('#cf-email', 'not-an-email');
        await submitBtn(page).click();

        await expect(page.locator('#cf-email').locator('xpath=..').locator('.field-error')).toBeVisible();
        await expect(page.locator('#cf-name').locator('xpath=..').locator('.field-error')).toBeHidden();
        expect(calls).toHaveLength(0);
    });

    test('shows a friendly error and keeps the message when the service refuses it', async ({ page }) => {
        await mockWeb3Forms(page, (route) =>
            route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Invalid key' }) })
        );
        await openContactForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();

        await expect(errorBox(page)).toBeVisible();
        await expect(errorBox(page).locator('a[href="mailto:kyle@kdodigital.co.uk"]')).toBeVisible();
        await expect(errorBox(page)).not.toContainText('Invalid key'); // raw service errors never shown
        await expect(successPanel(page)).toBeHidden();
        await expect(page.locator('#cf-message')).toHaveValue('Hi Kyle, FitnessPod recommended you. I need an app.');
        await expect(submitBtn(page)).toBeEnabled();
    });

    test('shows a friendly error when the connection fails, then recovers on retry', async ({ page }) => {
        let attempt = 0;
        await mockWeb3Forms(page, (route) => {
            attempt += 1;
            return attempt === 1
                ? route.abort('internetdisconnected')
                : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
        });
        await openContactForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();
        await expect(errorBox(page)).toBeVisible();

        await submitBtn(page).click();
        await expect(successPanel(page)).toBeVisible();
    });

    test('only sends once if the button is pressed repeatedly', async ({ page }) => {
        const calls = await mockWeb3Forms(page, async (route) => {
            await new Promise((r) => setTimeout(r, 800)); // slow network
            await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
        });
        await openContactForm(page);
        await fillValidForm(page);
        await submitBtn(page).click();

        await expect(submitBtn(page)).toBeDisabled();
        await expect(submitBtn(page)).toContainText('Sending');
        await page.locator('#projectForm').evaluate((f) => f.requestSubmit());

        await expect(successPanel(page)).toBeVisible();
        expect(calls).toHaveLength(1);
    });

    test('silently drops spam bots that fill the hidden field', async ({ page }) => {
        const calls = await mockWeb3Forms(page, (route) => route.abort());
        await openContactForm(page);
        await fillValidForm(page);
        await page.locator('#cf-botcheck').evaluate((el) => { el.checked = true; });
        await submitBtn(page).click();

        await expect(successPanel(page)).toBeVisible();
        expect(calls).toHaveLength(0);
    });

    test('form fits the screen with no sideways scrolling', async ({ page }) => {
        await openContactForm(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        const box = await page.locator('#contactForm').boundingBox();
        const viewport = page.viewportSize();
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
    });
});
