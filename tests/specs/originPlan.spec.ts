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
    await pricingPage.ValidateTableDisplayed();  //Validate table displayed after address search
    await pricingPage.unCheckEnergyFilter(testData); //Uncheck electricity to have only gas plans
    await pricingPage.ValidateTableDisplayed(); //Validate table displayed after filter applied
    await pricingPage.validateEnergyFilterApplied(testData); //Validate only gas plans are displayed
    const planLink= await pricingPage.getEnergyPlanUrl(testData); //Get the plan link for the gas plan and click to open in new tab
    if (!planLink) throw new Error(`Failed to find plan link for "${testInfo.title}"`);
    const path = await pdfPage.downloadPdf(planLink); //Download the pdf from the plan link
    await pdfPage.validatePdfContent(path, testData); //Validate the pdf content against the test data
  });

});
