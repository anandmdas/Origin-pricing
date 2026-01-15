import { expect, Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import pricingPageConst from '../../../resources/constants/pricingPage.json';
import { pricingPage as pricingPageLocators } from "./pricing.object";
//import pdfParse from 'pdf-parse';

export class PricingPage{
    page:Page;
    testInfo:TestInfo;

    /**
     * @description Constructor for the class to initialize
     * @param page Page context created by the test 
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    constructor(page:Page, testInfo:TestInfo){
        this.page=page;
        this.testInfo=testInfo;
    }

    /**
     * @description Method to navigate to Origin Pricing Page and validate the title
     */
    public async navigateToOrigin(){
        await this.page.goto('/pricing.html');
        const pageTitle= await this.page.title();
        await Utility.validateText(pricingPageConst.pricingPageTitle, pageTitle, this.testInfo);
    }

    /**
     * @description Method to validate the heading of Pricing Page
     */
    public async validatePricingPageHeading(){
        const headingText= await this.page.locator(pricingPageLocators.ttlPricingPageHeading).innerText();
        await Utility.validateText(pricingPageConst.pricingPageHeading, headingText, this.testInfo);
    }

    /**
     * @description Method to search address in the address search box
     * @param testData Testdata object for the scenario from the json file
     */
    public async SearchAddress(testData:any){
        await Utility.inputValue(this.page, pricingPageLocators.inputAddressSearch, testData.address, this.testInfo);
        //await this.page.getByRole('option', { name: '17 Bolinda Road, BALWYN NORTH VIC' }).click();
        await this.page.getByRole('option', { name: `${testData.address}` }).first().click();
    }

    /**
     * @description Method to validate the pricing table is displayed
     */
    public async ValidateTableDisplayed(){
       await Utility.validateElementVisibility(this.page, pricingPageLocators.tblTableHeaders, this.testInfo);
    }

    /**
     * @description Method to identify a specific plan url based on the test data open in new tab, validate the number of tabs and return the plan url
     * @param testData Testdata object for the scenario from the json file
     * @returns  Plan Url string
     */
    public async getEnergyPlanUrl(testData:any){
        const rowCount= await this.page.locator(pricingPageLocators.tblTableRows).count();
        for(let i=1; i<=(rowCount/2)-1; i++){
            let distributor= await Utility.getTextValue(this.page, pricingPageLocators.tblColumnVal.replace('__rowNum__',i.toString()).replace('__colNum__','1'), this.testInfo);
            let energyType= await Utility.getTextValue(this.page, pricingPageLocators.tblColumnVal.replace('__rowNum__',i.toString()).replace('__colNum__','2'), this.testInfo);
            let planName= await Utility.getTextValue(this.page, pricingPageLocators.tblColumnVal.replace('__rowNum__',i.toString()).replace('__colNum__','3'), this.testInfo);
            let tariffType= await Utility.getTextValue(this.page, pricingPageLocators.tblColumnVal.replace('__rowNum__',i.toString()).replace('__colNum__','4'), this.testInfo);
            if(distributor.trim()===testData.distributor && energyType.trim()===testData.energyType && planName.trim()===testData.planName && tariffType.trim()===testData.tariffType){
                let planLink= await this.page.locator(pricingPageLocators.hprLinkPlanName.replace('__rowNum__',i.toString()).replace('__colNum__','3')).getAttribute('href');
                if(!planLink){
                    throw new Error(`Plan link not found for row ${i}`);
                }

                const context = this.page.context();
                const [newPage] = await Promise.all([
                    context.waitForEvent('page'),
                    Utility.click(
                        this.page, 
                        pricingPageLocators.hprLinkPlanName
                            .replace('__rowNum__', i.toString())
                            .replace('__colNum__', '3'), 
                        this.testInfo
                    )
                ]);
                console.log(`Number of open pages: ${context.pages().length}`);
                Utility.validateTwoValues(context.pages().length, 2, this.testInfo);
                return planLink;
            }
            
        }
    }

    /**
     * @description Method to uncheck the energy type Checkbox based on the test data
     * @param testData Testdata object for the scenario from the json file
     */
    public async unCheckEnergyFilter(testData:any){
        switch(testData.uncheckEnergyTypeFilter.toLowerCase()){
            case 'electricity':
                await Utility.click(this.page, pricingPageLocators.chkElectricityCheckBox, this.testInfo);
                break;
            case 'gas':
                await Utility.click(this.page, pricingPageLocators.chkGasCheckBox, this.testInfo);
                break;
            default:
                throw new Error(`Filter type ${testData.energyType} not recognized`);
        }
    }

    /**
     * @description Method to validate the energy filter is applied and the table displays only the selected energy type
     * @param testData Testdata object for the scenario from the json file
     */
    public async validateEnergyFilterApplied(testData:any){
        const rowCount= await this.page.locator(pricingPageLocators.tblTableRows).count();
        for(let i=1; i<=(rowCount/2)-1; i++){
            let energyType= await Utility.getTextValue(this.page, pricingPageLocators.tblColumnVal.replace('__rowNum__',i.toString()).replace('__colNum__','2'), this.testInfo);
            await Utility.validateText(testData.energyType, energyType, this.testInfo);   
        }
    }
}