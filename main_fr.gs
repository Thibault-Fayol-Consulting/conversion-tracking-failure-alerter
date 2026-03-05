/**
 * --------------------------------------------------------------------------
 * conversion-tracking-failure-alerter - Google Ads Script for SMBs
 * --------------------------------------------------------------------------
 * Author: Thibault Fayol - Consultant SEA PME
 * Website: https://thibaultfayol.com
 * License: MIT
 * --------------------------------------------------------------------------
 */
var CONFIG = { TEST_MODE: true, DAYS_WITHOUT_CONV: 2, EMAIL: "contact@votredomaine.com" };
function main() {
    var today = new Date();
    today.setDate(today.getDate() - CONFIG.DAYS_WITHOUT_CONV);
    var dateString = Utilities.formatDate(today, AdsApp.currentAccount().getTimeZone(), "yyyyMMdd");
    
    var stats = AdsApp.currentAccount().getStatsFor(dateString, Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), "yyyyMMdd"));
    if (stats.getCost() > 100 && stats.getConversions() === 0) {
        Logger.log("CRITIQUE : " + stats.getCost() + "€ dépensés mais 0 conversion ces " + CONFIG.DAYS_WITHOUT_CONV + " derniers jours.");
        if (!CONFIG.TEST_MODE) MailApp.sendEmail(CONFIG.EMAIL, "ALERTE ZERO CONVERSION : " + AdsApp.currentAccount().getName(), "Vérifiez vos balises urgemment.");
    } else {
        Logger.log("Tracking de conversion ok. (" + stats.getConversions() + " convs)");
    }
}
