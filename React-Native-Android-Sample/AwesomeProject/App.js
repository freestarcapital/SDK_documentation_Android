import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { AppRegistry, Button } from 'react-native';
import { Dimensions } from 'react-native';
import FreestarReactBridge from '@freestar/freestar-plugin-react-native';
import BannerAd from '@freestar/freestar-plugin-react-native/BannerAd';

import MrecBannerAd from '@freestar/freestar-plugin-react-native/MrecBannerAd';
import MrecBannerAd2 from '@freestar/freestar-plugin-react-native/MrecBannerAd2';
import MrecBannerAd3 from '@freestar/freestar-plugin-react-native/MrecBannerAd3';
import MrecBannerAd4 from '@freestar/freestar-plugin-react-native/MrecBannerAd4';

import SmallNativeAd from '@freestar/freestar-plugin-react-native/SmallNativeAd';
import SmallNativeAd2 from '@freestar/freestar-plugin-react-native/SmallNativeAd2';
import SmallNativeAd3 from '@freestar/freestar-plugin-react-native/SmallNativeAd3';
import SmallNativeAd4 from '@freestar/freestar-plugin-react-native/SmallNativeAd4';

import MediumNativeAd from '@freestar/freestar-plugin-react-native/MediumNativeAd';
import MediumNativeAd2 from '@freestar/freestar-plugin-react-native/MediumNativeAd2';
import MediumNativeAd3 from '@freestar/freestar-plugin-react-native/MediumNativeAd3';
import MediumNativeAd4 from '@freestar/freestar-plugin-react-native/MediumNativeAd4';

export default function App(props) {

  const [isHungry, setIsHungry] = useState(true);
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  const windowWidth = Dimensions.get('window').width;

  return (

   <View style={styles.container}>

   <ScrollView style={styles.scrollView}>

      <Text> {'\n'} Freestar Ads - React Native Sample! {'\n'} </Text>

      <Button
        onPress={() => {
          FreestarReactBridge.loadInterstitialAd(null);
        }}
        title={"Load Interstitial Ad"}
      />


      <Button
        onPress={() => {
          FreestarReactBridge.loadRewardAd(null);
        }}
        title={"Load Rewarded Ad"}
      />


      <BannerAd
         style={{width: 320, height: 50}}
         requestOptions={
            {
               targetingParams: {
                     'someparam1': 'somevalue1',
                     'someparam2': 'somevalue2',
                     'someparam3': 'somevalue3',
               }
            }
         }
         onBannerAdLoaded={bannerLoaded}
         onBannerAdAdFailedToLoad={bannerFailed}
         onBannerAdClicked={bannerAdClicked}
      />


      <SmallNativeAd
         style={{width: 360, height: 100}}
         requestOptions={
            {
               //placement: 'home_page_p1' //NOTE: if this placement has not been setup in the back-end, then do NOT specify placement
               targetingParams: {
                     'someparam1': 'somevalue1',
                     'someparam2': 'somevalue2',
                     'someparam3': 'somevalue3',
               },
               testDeviceIds: ['deviceId1','deviceId2', 'deviceId3']
            }
         }
         onNativeAdLoaded={bannerLoaded}
         onNativeAdFailedToLoad={bannerFailed}
         onNativeAdClicked={nativeAdClicked}
      />

    </ScrollView>

    </View>

  );
}

function bannerAdClicked({nativeEvent}) {
   Alert.alert('banner ad clicked');
}

function bannerLoaded({ nativeEvent }) {
   console.log('loaded native ad. placement: ' + nativeEvent.placement + ' window width: '
   + Dimensions.get('window').width + ' winningBidder: ' + nativeEvent.winningBidder);
}

function bannerFailed({ nativeEvent }) {
   //console.log('failed ' + nativeEvent.errorDesc + ' ' + nativeEvent.size + ' placement: ' + nativeEvent.placement);
   Alert.alert('failed to load native ad. error: ' + nativeEvent.errorDesc + ' placement: ' + nativeEvent.placement);
}

function nativeAdClicked({nativeEvent}) {
   Alert.alert('native ad clicked');
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

FreestarReactBridge.initWithAdUnitID('XqjhRR');

FreestarReactBridge.subscribeToInterstitialCallbacks2((eventName, placement, eventMap) => {

    if(eventName === "onInterstitialLoaded") {

      Alert.alert('Interstitial: ' + eventMap.winningBidder);

      if (placement == 'not defined')
         placement = null;
      FreestarReactBridge.showInterstitialAd(placement);

      } else if (eventName === "onInterstitialClicked") {

      Alert.alert('Interstitial Ad clicked');

      } else if (eventName === "onInterstitialShown") {

      } else if (eventName === "onInterstitialFailed") {

        Alert.alert('Interstitial Ad not available');

      } else if (eventName === "onInterstitialDismissed") {

      } else {
       console.log("unknown event");
      }
     });


FreestarReactBridge.subscribeToRewardCallbacks2((eventName, placement, rewardName = '', rewardAmount = 0, eventMap) => {

     if (eventName === "onRewardedFailed") {

          Alert.alert('Reward Ad not available');

     } else if (eventName === "onRewardedDismissed") {

     } else if(eventName === "onRewardedLoaded") {

         Alert.alert('Rewarded: ' + eventMap.winningBidder);

         if (placement == 'not defined')
            placement = null;
         FreestarReactBridge.showRewardAd(placement, "Coins", 50, "myuserId", "12345678");

     } else if (eventName === "onRewardedCompleted") {

         //Alert.alert("reward ad completed: awarded " + rewardAmount + ' ' + rewardName );
         console.log("reward ad completed: awarded " + rewardAmount + ' ' + rewardName);

     } else if (eventName === "onRewardedShown") {

     } else if (eventName === "onRewardedShowFailed") {

          Alert.alert('Reward Ad was available but failed to show');

     } else {
        console.log("unknown event");
     }
   });