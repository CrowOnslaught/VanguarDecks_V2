<template>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck >= 1">
    <ion-button fill="clear" @click="addToDeck(1)">
      Add 1 to {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck >= 2 && !(openSlotsInDeck<= (cardMaxAmount-3))">
    <ion-button fill="clear" @click="addToDeck(2)">
      Add 2 to {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck >= 3 && !(openSlotsInDeck<= (cardMaxAmount-2))">
    <ion-button fill="clear" @click="addToDeck(3)">
      Add 3 to {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck >= 4">
    <ion-button fill="clear" @click="addToDeck(4)">
      Add 4 to {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck <= (cardMaxAmount-1)">
    <ion-button fill="clear" @click="removeFromDeck(1)">
      Remove 1 from {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck <= (cardMaxAmount-2) && !(openSlotsInDeck >=3)">
    <ion-button fill="clear" @click="removeFromDeck(2)">
      Remove 2 from {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck <= (cardMaxAmount-3)  && !(openSlotsInDeck >=2)">
    <ion-button fill="clear" @click="removeFromDeck(3)">
      Remove 3 from {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item class="optionDeckItem" v-if="openSlotsInDeck <= (cardMaxAmount-4)">
    <ion-button fill="clear" @click="removeFromDeck(4)">
      Remove 4 from {{ currentDeck.name }}
    </ion-button>
  </ion-item>
  <ion-item v-if="card.setCode.length > 1" class="setSelector">
    <ion-label>Set:</ion-label>
    <ion-select v-model="selectedSet">
      <ion-select-option v-for="n in card.setCode" :key="n" :value="n">{{
        n
      }}</ion-select-option>
    </ion-select>
  </ion-item>
  <ion-item class="optionDeckItem">
    <ion-button fill="clear" class="cancel" @click="close()">
      Close
    </ion-button>
  </ion-item>

</template>

<script>
import {
  IonItem,
  IonButton,
  modalController,
  IonSelect,
  IonLabel,
  IonSelectOption,
} from "@ionic/vue";

import { mapState } from "vuex";

export default {
  name: "AddToDeck",
  components: { IonItem, IonButton, IonSelect, IonSelectOption, IonLabel },
  data() {
    return {
      openSlotsInDeck: this.cardMaxAmount,
      selectedSet: this.card.setCode[0],
    };
  },
  props: {
    card: null,
  },
  computed: {
    ...mapState({
      decks: (state) => state.decks.decks,
      currentDeck: (state) => state.decks.currentDeck,
    }),
    cardIdCode: function() {
      if (this.card.id.includes("|")) 
        return this.card.id;
      return this.card.id + "|" + this.selectedSet;
    },
    cardMaxAmount: function(){
      switch(this.card.id.split("|")[0]){
        case "493":
          return 16;
        default:
          return 4;
      }
    }
  },
  watch: {
    selectedSet: function() {
      this.checkAmountInDeck();
    },
  },
  mounted() {
    this.checkAmountInDeck();
  },
  methods: {
    addToDeck(n) {
      this.$store.dispatch("decks/addCardToCurrentdeck", {amount: n, cardIdCode: this.cardIdCode})
      this.close();
    },
    removeFromDeck(n) {
      this.$store.dispatch("decks/removeCardFromCurrentdeck", {card: this.card, amount: n, cardIdCode: this.cardIdCode})
      this.close();
    },
    checkAmountInDeck() {
      const cardSlot = this.currentDeck.decklist.find(
        (e) => e.cardId == this.cardIdCode
      );
      if (cardSlot == undefined) this.openSlotsInDeck = this.cardMaxAmount;
      else this.openSlotsInDeck = this.cardMaxAmount - cardSlot.amount;
    },
    close() {
      modalController.dismiss({ flag: true });
    },
  },
};
</script>

<style scoped>
.cancel {
  color: red;
  text-align: center;
  width: 100%;
}

.optionDeckItem {
  font-size: 15px;
}

.setSelector {
  color: var(--ion-color-primary);
  text-align: left;
}

.buttons {
  align-items: center;
}
</style>
