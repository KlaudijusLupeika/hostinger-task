// @ts-check

//Write automated test for this flow:

//1. Visit hostinger.com;
//2. Initiate the purchase of any plan for 24 months;
//3. Ensure the proper validations are added.

const { test, expect, chromium } = require('@playwright/test');
require('dotenv').config();

test.describe('Verify validations for purchase', async () =>{
  test.setTimeout(100000);
  let browser,context,page;

  test.beforeAll(async () => {
    //Setup browser
    browser = await chromium.launch({
        headless: false,
        /*  proxy: { server: 'ip' }*/
    });
    context = await browser.newContext({});
    page = await context.newPage();
  });

  test('should open hostinger.com', async() => {
    await page.goto('https://hostinger.com');
    await page.waitForLoadState('networkidle');
  });

  test('should initiate the purchase of any plan for 24 months', async() => {
    await page.click('button[data-click-id="hgr-homepage-pricing_table-add_to_cart-hosting_hostinger_business"]');
    await page.waitForLoadState('networkidle');

    await page.click('#hcart-cart-period-selector >> nth=2');


    await page.click('#hcart-submit-payment');

    //Check validation for email
    await expect(page.locator('p.h-input__error >> nth=0')).toBeVisible();
    await expect(page.locator('p.h-input__error >> nth=0')).toHaveText('Enter your email to complete the purchase');

    if (await page.locator('p.h-input__error >> nth=1').isVisible()){
      await expect(page.locator('p.h-input__error >> nth=1')).toHaveText('Create your password');
    }
  });

  test('should login', async() => {
    await page.click('#hcart-login-secondary');
    await page.fill('input.h-input__input[password="false"]', process.env.EMAIL);
    await page.fill('input.h-input__input[password="true"]', process.env.PASS);
    await page.click('form > button > span');

    await page.waitForLoadState('networkidle');
    await expect(page.locator('.cart-user__user')).toBeVisible();
    await expect(page.locator('.cart-user__user')).toHaveText('QA Engineerer Testing APIs');
  });

  test('should initiate the purchase of any plan for 24 months while logged in', async() => {

    await page.click('#hcart-submit-payment');
    await page.waitForLoadState("networkidle");

    //Check validation for name on card
    await expect(page.locator('.error-message.invalid >> nth=0')).toBeVisible();
    await expect(page.locator('.error-message.invalid >> nth=0')).toHaveText('Name on card field is required');

    //Check validation for card number
    await expect(page.locator('.error-message.invalid >> nth=1')).toBeVisible();
    await expect(page.locator('.error-message.invalid >> nth=1')).toHaveText('The card number is invalid.');
    
    //Check validation for expiration date
    await expect(page.locator('.error-message.invalid >> nth=2')).toBeVisible();
    await expect(page.locator('.error-message.invalid >> nth=2')).toHaveText('The card expiry month is invalid.');
 
    //Check validation for CVC code
    await expect(page.locator('.error-message.invalid >> nth=3')).toBeVisible();
    await expect(page.locator('.error-message.invalid >> nth=3')).toHaveText('The card CVC is required.');
  });
});

