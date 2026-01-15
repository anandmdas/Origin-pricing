import { expect, Page, TestInfo } from "@playwright/test";
import * as fs from 'fs';
import { Utility } from "../../utils/utility";

export class PlanPdfPage{
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
     * @description Method to download the pdf plan from the plan link provided
     * @param planLink url link of the plan pdf to be downloaded
     * @returns path where the pdf is downloaded
     */
    async downloadPdf(planLink:string):Promise<string> {
         const [download] = await Promise.all([
            this.page.waitForEvent('download'), 
            this.page.goto(planLink).catch(error => {
                if (!error.message.includes('Download is starting')) {
                throw error;
                }
            }),
            ]);
        const path = `./downloads/${download.suggestedFilename()}`;
        await download.saveAs(path);
        return path;
    }

    /**
     * @description Method to validate the content of the downloaded pdf against the test data provided
     * @param path path where the pdf is downloaded
     * @param testData Testdata object for the scenario from the json file
     */
    async validatePdfContent(path:string, testData:any){
        const dataBuffer = fs.readFileSync(path);
        const pdf = require('pdf-parse');
        const data = await pdf(dataBuffer);

        const pdfText = data.text;
        console.log(pdfText);

        for(const pdfTextItem of testData.pdfContenet){
            await Utility.validateTextContains(pdfText, pdfTextItem, this.testInfo);
        }
    }
}