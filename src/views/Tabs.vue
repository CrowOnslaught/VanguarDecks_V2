<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div id='toolbar'>
          <img id='logo' src="@/assets/icon.png">
          <ion-title>Vanguar[D]ecks</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="cards" href="/cards">
            <ion-icon :icon="reader" />
            <ion-label>Cards</ion-label>
          </ion-tab-button>
            
          <ion-tab-button tab="decks" href="/decks">
            <ion-icon :icon="layers" />
            <ion-label>Decks</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="filters" href="/filters">
            <ion-icon :icon="cog" />
            <ion-label>Filters</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { layers, cog, reader } from 'ionicons/icons';

import { Plugins } from '@capacitor/core';
import { AdSize, AdPosition } from '@capacitor-community/admob';
const { AdMob } = Plugins;


export default {
  name: 'Tabs',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonLabel, 
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonPage, 
    IonRouterOutlet 
  },
  setup() {
    return {
      layers, 
      cog, 
      reader,
    }
  },
  data() {
    return{
      options: 
      {
        adId: 'ca-app-pub-1601725610082442/7473278643',
        adSize: AdSize.BANNER,
        position: AdPosition.TOP_CENTER,
        margin: 0,
        // isTesting: true
        // npa: true
      }
    }
  },
  mounted()
  {
      if(process.env.VUE_APP_PREMIUM_VERSION == "FALSE")
      {
        AdMob.initialize();
  
         // // Show Banner Ad
        AdMob.showBanner(this.options);
  
        // // Subscribe Banner Event Listener
        AdMob.addListener('onAdLoaded', (info) => {
          // console.log('Banner Ad Loaded', info);
        });
  
        // // Get Banner Size
        AdMob.addListener('onAdSize', (info) => {
          // console.log(info);
        }); 
      }
  },
}
</script>

<style scoped>
#toolbar
{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#logo
{
  padding-top: 4px;
  padding-left: 4px;
  height: 40px;
  width: auto;

  border-radius: 50%;
}
</style>