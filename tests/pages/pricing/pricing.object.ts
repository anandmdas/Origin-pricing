export const pricingPage = {
    ttlPricingPageHeading:"//h1[@data-id='heading']",
    inputAddressSearch: "//input[@id='address-lookup']",
    txtAdrressList: "//input[@id='address-lookup']/../../p//*[1]",
    chkElectricityCheckBox:"(//*[@data-id='elc-checkbox-label']//input[@name='elc-checkbox' and @type='checkbox'])[1]",
    chkGasCheckBox:"(//*[@data-id='gas-checkbox-label']//input[@name='gas-checkbox' and @type='checkbox'])[1]",
    tblTableRows:"//*[@data-id='table']//tr",
    tblTableHeaders:"(//*[@data-id='table']//thead)[1]",
    tblColumnVal:"(//*[@data-id='table']//tr[__rowNum__]//td[__colNum__])[1]",
    hprLinkPlanName:"(//*[@data-id='table']//tr[__rowNum__]//td[__colNum__])[1]//a"
}