<template>
  <ion-card class="card-item" type="button"  @click="openModal(card, index)" @contextmenu="addToDeckModal(card)">
    <img class='card-image' :src ="getImageRoute(card)">
    <div class="card-details">
      <h4>{{card.name}}</h4>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, modalController } from '@ionic/vue';
import CardDetail from "@/components/Cards/CardDetail.vue"
import AddToDeck from "@/components/Decks/AddToDeck.vue"
import { mapState } from "vuex";

export default {
  name: 'card',
  components:{
    IonCard
  },
  data(){
    return{
      modalOpen: false,
    };
  },
  computed:{
    ...mapState({
        decks: state => state.decks.decks,
        currentDeck: state => state.decks.currentDeck
    }),
  },
  props: {
    card: Object,
    cardList: Array,
    index: Number
  },
  methods:{
    getImageRoute(c){
      let result = '';
      try
      {
        const images = require.context('@/assets/cardImages/', false, /\.jpg$/);
        result = images('./'+c.id+'.jpg');
      }
      catch(err)
      {
        result = c.image;
      }
      return result;
    },
    async openModal(c, i){
      if(this.modalOpen)
        return;

      this.modalOpen = true;
      const modal = await modalController
        .create({
          component: CardDetail,
          cssClass: 'card-detail-modal',
          componentProps: {
            card: c,
            cardList: this.cardList,
            index: i
          },
        });
      modal.present();
      
      await modal.onWillDismiss();
      setTimeout(() => {
        this.modalOpen = false;
      }, (500));

    },
    async addToDeckModal(c)
    {
      if(this.currentDeck == null)
        return;

      const modal = await modalController
        .create({
          component: AddToDeck,
          cssClass: 'small-modal-addToDeck',
          componentProps: {
            card: c,
          },
        });
      modal.present();
    },
  }
}
</script>

<style scoped>

h4
{
  text-align:center;
  font-size: 15px;
  margin: 0px;
  vertical-align: middle;
}

.card-item{
    margin: -2px !important;    
}

.card-image
{
  width: 100%;
  min-height: 168.52px;
}
.card-details
{
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>