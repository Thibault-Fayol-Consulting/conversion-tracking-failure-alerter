/**
 * --------------------------------------------------------------------------
 * conversion-tracking-failure-alerter - Google Ads Script for SMBs
 * --------------------------------------------------------------------------
 * Author: Thibault Fayol - Consultant SEA PME
 * Website: https://thibaultfayol.com
 * License: MIT
 * --------------------------------------------------------------------------
 */
var CONFIG = { TEST_MODE: true, DAYS_WITHOUT_CONV: 2, EMAIL: "contact@domain.com" };
function main() {
    var today = new Date();
    today.setDate(today.getDate() - CONFIG.DAYS_WITHOUT_CONV);
    var dateString = Utilities.formatDate(today, AdsApp.currentAccount().getTimeZone(), "yyyyMMdd");
    
    var stats = AdsApp.currentAccount().getStatsFor(dateString, Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), "yyyyMMdd"));
    if (stats.getCost() > 100 && stats.getConversions() === 0) {
        Logger.log("CRITICAL: " + stats.getCost() + " spend but 0 conversions in last " + CONFIG.DAYS_WITHOUT_CONV + " days.");
        if (!CONFIG.TEST_MODE) MailApp.sendEmail(CONFIG.EMAIL, "ZERO CONVERSIONS ALERT: " + AdsApp.currentAccount().getName(), "Please check the tracking immediately.");
    } else {
        Logger.log("Conversions tracking looks healthy. (" + stats.getConversions() + " convs)");
    }
}
