<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <card-grid :cardList="cards" :size="4"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import { mapState } from 'vuex';

import CardGrid from "@/components/Cards/CardGrid.vue"

export default  {
  name: 'cards',
  components: { 
    IonContent, 
    IonPage,
    CardGrid
  }, 
  computed:{
    ...mapState({
      cards: state => state.cards.filters.filterCards
    })
  }
}
</script>