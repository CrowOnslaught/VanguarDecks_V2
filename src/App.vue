<template>
  <ion-app :class="`ion-app__${premium_version}`">
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  computed:{
    // eslint-disable-next-line @typescript-eslint/camelcase
    premium_version : function(){
      return process.env.VUE_APP_PREMIUM_VERSION == "TRUE"? 'premium' : 'free';
    }
  },
  mounted(){
    this.$store.dispatch("cards/fetchData")
      .then(data => { console.log(1, 'data' ,data) });
    this.$store.dispatch("decks/fetchData") 
      .then(data => console.log(3, 'Decks', data)); 
  }
});
</script>

<style>
ion-app
{
  max-width: 1000px;
  margin: auto;
}

.ion-app__free{
  margin-top: 50px;
}

ion-content.background{
  --background: var(--ion-color-background) url('./assets/splash.png') no-repeat center center /cover;
}

.small-modal-newDeck .modal-wrapper
{

  height: 250px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;

}
.small-modal-optionDeck .modal-wrapper
{

  height: 270px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;
}
.small-modal-addToDeck .modal-wrapper
{

  height: 226px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;
}

.small-modal-delete>.alert-wrapper
{
  border-radius: 16px;
  border: var(--ion-color-primary-shade) 3px solid;
}

.card-detail-modal>.modal-wrapper
{
  width: 100%;
  height: 100%;
}

</style>