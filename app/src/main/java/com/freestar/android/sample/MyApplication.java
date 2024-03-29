package com.freestar.android.sample;


import android.os.Build;

import com.freestar.android.ads.AdRequest;
import com.freestar.android.ads.FreeStarAds;

import androidx.multidex.MultiDexApplication;

public class MyApplication extends MultiDexApplication {
    @Override
    public void onCreate() {
        super.onCreate();

        String countryCode;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            countryCode = getResources().getConfiguration().getLocales().get(0).getCountry();
        } else {
            countryCode = getResources().getConfiguration().locale.getCountry();
        }
        FreeStarAds.setCustomSegmentProperty(this, "CountryCode", countryCode);

        AdRequest adRequest = new AdRequest(this);
        adRequest.addCustomTargeting("some target", "my value");
        FreeStarAds.enableLogging(true);  //set false for production or don't call
        FreeStarAds.enableTestAds(true);  //set false for production or don't call

        FreeStarAds.setUserId(this, "my-test-user-id");

        //Uncomment to utilize App Open Ads
        //FreeStarAds.requestAppOpenAds("app_open_p2", true, null);

        //Turn off automated test mode just OMIT the next line
        //FreeStarAds.setAutomatedTestMode(FreeStarAds.AutomatedTestMode.LIMITED_MEDIATION);
        //Also try:
        //FreeStarAds.setAutomatedTestMode(FreeStarAds.AutomatedTestMode.BYPASS_ALL_ADS);
        FreeStarAds.init(this, MainActivity.API_KEY, adRequest);

    }
}
