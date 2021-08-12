<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="(c, i) in cardList" :key="c.id" :size="size">
        <card :card="c" :index="i" :cardList="cardList" />
      </ion-col>
    </ion-row>
  </ion-grid>
  <ion-spinner v-if="cards.length ==0" id="spinner"></ion-spinner>
  <h3 class='noCards' v-else-if="cardList.length ==0">There are no cards that meet those conditions</h3>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/vue';
import Card from "@/components/Cards/Card.vue";
import { mapState } from 'vuex';

export default {
  name: 'card-grid',
  components: { 
    IonGrid, 
    IonRow, 
    IonCol,
    IonSpinner,
    Card
  }, 
  props: {
    cardList: Array,
    size: Number
  },
  computed:{
    ...mapState({
        cards: state => state.cards.cards,
    }),
  },
}
</script>

<style scoped>
.noCards
{
  margin-top: 80%;
  text-align: center;
}

#spinner
{
  --color: var(--ion-color-primary);
  position: absolute;
  top: 48%;
  left: 48%;
}


</style>