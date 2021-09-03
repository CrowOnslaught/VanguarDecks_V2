<template>
  <ion-page>
    <ion-content :fullscreen="true"  class="background">
      <list :list="decks"/>
      <ion-button id="optionBut" @click="newDeck()"> <ion-icon :icon="add"></ion-icon></ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon, modalController } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { mapState } from 'vuex';

import List from "@/components/List.vue"
import NewDeck from "@/components/Decks/NewDeck.vue"

export default  {
  name: 'Tab2',
  components: { 
    IonContent, 
    IonPage,
    IonButton,
    IonIcon,
    List
  },
  setup() {
    return { add };
  },
  computed:{
    ...mapState({
      decks: state => state.decks.decks,
      filters: state => state.cards.filters
    })
  },
  methods:{
    async newDeck()
    {
      const modal = await modalController.create({
        component: NewDeck,
        cssClass: 'small-modal-newDeck',
        enableBackdropDismiss: true,
      });

      await modal.present();
      
      const {data} = await modal.onWillDismiss();
      
      if(data != null)
      {
        if(data.imported)
          setTimeout(() => {
            this.$forceUpdate();
          }, (500));
        else
          setTimeout(() => {
            this.createEmptyDeck(data);
            this.$store.dispatch("cards/setFilters", { nations: [data.nation, 'NationLess'] });
          }, (500));
      }
    },
    createEmptyDeck(d)
    {
      this.$store.dispatch("decks/createDeck", d);
      this.$forceUpdate();
    },
  }
}
</script>

<style scoped>
#optionBut
{
    position: fixed;
    bottom: 10px;
    right: 10px;

    --border-radius	: 50%;
    width: 50px;
    height: 50px;

  --ionicon-stroke-width: 100px;
}
</style>