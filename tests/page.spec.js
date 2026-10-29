// Home page: the ATIDFA order, the main button, phones, motion and the notes switch.
// Plus a quick check of the privacy and terms pages.
const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
    test('the top says what it is, with the main button and a price', async ({ page }) => {
        await page.goto('/index.html');
        await expect(page.locator('h1')).toHaveText('Websites that win you customers, not just compliments.');
        await expect(page.locator('.hero-lead')).toContainText('5+ years in e-commerce');
        const cta = page.locator('.hero .btn');
        await expect(cta).toHaveAttribute('href', '#check');
        await expect(cta).toBeInViewport();
        await expect(page.locator('.facts')).toContainText('Websites from £2,000');
    });

    test('sections follow the ATIDFA order', async ({ page }) => {
        await page.goto('/index.html');
        const ids = await page.locator('main > section').evaluateAll((els) => els.map((el) => el.id));
        expect(ids).toEqual(['top', 'how', 'rules', 'offer', 'kyle', 'faq', 'check']);
    });

    test('every big section ends with the same button', async ({ page }) => {
        await page.goto('/index.html');
        for (const id of ['how', 'rules', 'offer', 'kyle', 'faq']) {
            const btn = page.locator(`#${id} .section-cta .btn`);
            await expect(btn).toHaveText('Get a free website check');
            await expect(btn).toHaveAttribute('href', '#check');
        }
    });

    test('the main button takes you to the form', async ({ page }) => {
        await page.goto('/index.html');
        await page.locator('.hero .btn').click();
        await expect(page.locator('#cf-name')).toBeInViewport();
    });

    test('booking systems and apps are not sold as services', async ({ page }) => {
        await page.goto('/index.html');
        const titles = (await page.locator('#offer h3').allTextContents()).join(' | ');
        expect(titles).not.toMatch(/booking|\bapps?\b/i);
        await expect(page.locator('#offer .dont')).toContainText('custom booking systems');
    });

    test('questions open and close', async ({ page }) => {
        await page.goto('/index.html');
        const first = page.locator('#faq details').first();
        await first.locator('summary').scrollIntoViewIfNeeded();
        await first.locator('summary').click();
        await expect(first.locator('.faq-a')).toBeVisible();
        await first.locator('summary').click();
        await expect(first.locator('.faq-a')).toBeHidden();
    });

    test('nothing is wider than the screen', async ({ page }) => {
        await page.goto('/index.html');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
    });

    test('the step line fills like a checkout as you scroll', async ({ page }) => {
        await page.goto('/index.html');
        const list = page.locator('.checkout');
        await expect(list).toHaveClass(/animating/);
        await expect(list).not.toHaveClass(/complete/);
        await page.locator('#rules').scrollIntoViewIfNeeded();
        await expect(list).toHaveClass(/complete/);
    });

    test('things below the fold appear as you scroll to them', async ({ page }) => {
        await page.goto('/index.html');
        const heading = page.locator('#offer-title');
        await expect(heading).toHaveClass(/pre/);
        await heading.scrollIntoViewIfNeeded();
        await expect(heading).not.toHaveClass(/pre/);
        await expect(heading).toHaveCSS('opacity', '1');
    });

    test('with reduced motion everything shows straight away', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/index.html');
        expect(await page.locator('.reveal.pre').count()).toBe(0);
        await expect(page.locator('#check-title')).toHaveCSS('opacity', '1');
        await expect(page.locator('.checkout')).not.toHaveClass(/animating/);
    });

    test("the switch hides and shows Kyle's notes", async ({ page }) => {
        await page.goto('/index.html');
        const note = page.locator('#how .kyle-note');
        const toggle = page.locator('.site-footer [data-notes-toggle]');
        await expect(note).toBeVisible();
        await toggle.scrollIntoViewIfNeeded();
        await toggle.click();
        await expect(note).toBeHidden();
        await expect(toggle).toHaveText("Show Kyle's notes");
        await expect(toggle).toHaveAttribute('aria-pressed', 'true');
        await toggle.click();
        await expect(note).toBeVisible();
    });

    test('?notes=off opens the page without the notes', async ({ page }) => {
        await page.goto('/index.html?notes=off');
        await expect(page.locator('#how .kyle-note')).toBeHidden();
        // Gaps in the story stay visible: they are missing words, not notes
        await expect(page.locator('mark.gap').first()).toBeVisible();
    });

    test('no errors in the console', async ({ page }) => {
        const errors = [];
        page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
        page.on('pageerror', (err) => errors.push(err.message));
        await page.goto('/index.html');
        await page.locator('#check').scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        expect(errors).toEqual([]);
    });
});

test.describe('Phones', () => {
    test('the button bar appears after the top section and hides at the form', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Phones only');
        await page.goto('/index.html');
        const bar = page.locator('#mobileBar');
        await expect(bar).not.toHaveClass(/show/);
        await page.locator('#rules').scrollIntoViewIfNeeded();
        await expect(bar).toHaveClass(/show/);
        await expect(bar.locator('.btn')).toBeInViewport();
        await page.locator('#cf-name').scrollIntoViewIfNeeded();
        await expect(bar).not.toHaveClass(/show/);
    });
});

test.describe('Privacy and terms pages', () => {
    for (const [file, title] of [['privacy.html', 'Privacy Policy'], ['terms.html', 'Terms & Conditions']]) {
        test(`${file} loads with the site's look`, async ({ page }) => {
            await page.goto('/' + file);
            await expect(page.locator('h1')).toHaveText(title);
            await expect(page.locator('.legal-header .logo')).toBeVisible();
            await expect(page.locator('.legal-back')).toHaveAttribute('href', 'index.html');
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
            expect(overflow).toBeLessThanOrEqual(0);
        });
    }
});
