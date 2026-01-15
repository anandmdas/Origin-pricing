import { test, expect, chromium } from '@playwright/test';
import { getScenarioData } from '../utils/testdataUtility'
import { PricingPage } from '../pages/pricing/pricing.page';
import { PlanPdfPage } from '../pages/planPdf/planPdf.page';

test.describe('Origin Energy Plans and Pricing Page Validations', async() => {
  
  test('Validate Origin Energy Pricing Landing', async ({ page }, testInfo) => {
    const pricingPage= new PricingPage(page, testInfo);
    await pricingPage.navigateToOrigin();
    await pricingPage.validatePricingPageHeading();
  });

test('Validate Available Plans for Address', async ({ page }, testInfo) => {
    const testData = await getScenarioData('originTestData', testInfo.title);
    const pricingPage= new PricingPage(page, testInfo);
    await pricingPage.navigateToOrigin();
    await pricingPage.SearchAddress(testData);
    await pricingPage.ValidateTableDisplayed();
});

test('Validate pdfGasPlan', async ({ page }, testInfo) => {
    const testData = await getScenarioData('originTestData', testInfo.title);
    const pricingPage= new PricingPage(page, testInfo);
    const pdfPage =new PlanPdfPage(page, testInfo);
    await pricingPage.navigateToOrigin();
    await pricingPage.SearchAddress(testData);
    await pricingPage.ValidateTableDisplayed();
    await pricingPage.unCheckEnergyFilter(testData);
    await pricingPage.ValidateTableDisplayed();
    await pricingPage.validateEnergyFilterApplied(testData);
    const planLink= await pricingPage.getEnergyPlanUrl(testData);
    if (!planLink) throw new Error(`Failed to find plan link for "${testInfo.title}"`);
    const path = await pdfPage.downloadPdf(planLink);
    await pdfPage.validatePdfContent(path, testData);
  });

});
