<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="(c, i) in cardList" :key="c.id" :size="size">
        <card :card="c" :index="i" :cardList="cardList" />
      </ion-col>
    </ion-row>
  </ion-grid>
  <h3 class='noCards' v-if="cardList.length ==0">There are no cards that meet those conditions</h3>
</template>

<script>
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import Card from "@/components/Cards/Card.vue";
import { mapState } from 'vuex';

export default {
  name: 'card-grid',
  components: { 
    IonGrid, 
    IonRow, 
    IonCol,
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

</style>