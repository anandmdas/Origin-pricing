# Scenario Coverage

Test scenarios covered are under /tests/specs folder
1. Specs files is available originPlan.spec.ts:
    This covers the Pricing Page landing validation
    Address Search and Filtering
    Selection of the Plan and Validate the PDF content


# High level Project Structure

Origin/
├── resources/  
│   ├── constants/  
│   │   └── < Page based JSON files >.json  
│   ├── testdata/  
│   │   └── < Spec based JSON file >.json  
│── test-results/  
├── tests/  
│   ├── pages/  
│   │   ├── < Page based Folders >  
│   │   │   ├── < Page Object >.object.ts  
│   │   │   └── < Page Reusable methods >.page.ts  
│   |── specs/  
│   |   └── < Spec files which has the test scenarios >  
|   ├── utils/  
├── .gitignore    
├── package-lock.json  
├── package.json  
├── playwright.config.ts  
└── tsconfig.json  

In the Above structure
1. constants has the static text which are displayed in each page. This is used as the expected values for assertions
2. testdata folder has the data used for each test/scenario
3. Test folder has page folder, specs folder and utils folder
4. page folder has the objects for each page and the reusable methods used in each of these page
5. specs floder has the test scenarios
6. utils folder has the framework level actions like clicking validations and loging related methods and testdataUtility method for reading the data
7. Jenkinsfile has the config and groovy commands to run in Jenkins
8. playwright.config.ts has the playwright related configuration

# Execution

Before making the execution make sure that the node versions are installed

run *npm install* to install all the package dependencies

run  *npx playwright install* to install the browser configurations of playwright

run *npx playwright test* to run the test

# Report

Playwright Execution video is available on playwright-report folder
test-results have the playwright report as well


