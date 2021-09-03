<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :style="`--background: ${currentColor}; color: white;`">
                <ion-buttons slot="start">
                    <ion-back-button
                        @click="closeModal()"
                        :icon="chevronBack"
                        style="display: block; color: white"
                    ></ion-back-button>
                </ion-buttons>
                <ion-title>Mulligan Calculator</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content id="background"  class="background">
            <h2> Starting-Hand Draw Percentages</h2>
            <p> This table shows the probability of drawing one or more copies of the desired card on the initial hand of 5 cards. </p>
            <div id="table" >
                <div class="row header"  :style="`background-color: ${currentColor};`">
                    <div class="col">Target [Amount]</div>
                    <div class="col"> ≥1(%) </div>
                    <div class="col"> ≥2(%) </div>
                    <div class="col"> ≥3(%) </div>
                    <div class="col"> ≥4(%) </div>
                    <div class="col"> 5(%) </div>
                </div>
                <div class="row" v-for="r in tableRows" :key="r">
                    <div class="col">{{r.target}}</div>
                    <div class="col">{{r.result1}}</div>
                    <div class="col">{{r.result2}}</div>
                    <div class="col">{{r.result3}}</div>
                    <div class="col">{{r.result4}}</div>
                    <div class="col">{{r.result5}}</div>
                </div>
            </div>
            <h2> Mulligan Draw Percentages</h2>
            <p> This table shows the probability of drawing one or more copyes of the desired card when mulligating, assuming you did <strong>NOT</strong> draw any of them in your starting 5-card hand. </p>
            <div id="table">
                <div class="row header"  :style="`background-color: ${currentColor};`">
                    <div class="col">Target [Amount]</div>
                    <div class="col"> 1(%) </div>
                    <div class="col"> 2(%) </div>
                    <div class="col"> 3(%) </div>
                    <div class="col"> 4(%) </div>
                    <div class="col"> 5(%) </div>
                </div>
                <div class="row" v-for="r in mulliganTableRows" :key="r">
                    <div class="col">{{r.target}}</div>
                    <div class="col">{{r.result1}}</div>
                    <div class="col">{{r.result2}}</div>
                    <div class="col">{{r.result3}}</div>
                    <div class="col">{{r.result4}}</div>
                    <div class="col">{{r.result5}}</div>
                </div>
            </div>
            <p><i>* (One less card is counted than the Main Deck if a card is in the Ride Deck.)</i></p>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonBackButton,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    modalController,
} from "@ionic/vue";

import { mapState } from "vuex";

import { chevronBack } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Calculator",
  components: {
    IonBackButton,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
  },
  setup() {
    return {
      chevronBack,
    };
  },
  props: {
    nation: null,
    deckList: null,
  },
  computed:{
    ...mapState({
      cards: state => state.cards.cards,
      nations: state => state.nations,
      currentDeck: state => state.decks.currentDeck
    }),
    currentColor: function(){
      if(this.currentDeck)
        return this.nations[this.currentDeck.nation].color;

      return null;
    }
  },
  data() {
    return {
      deck: this.deckList,

      populationSize: null,
      successesInPopulation: null,
      sampleSize: null,

      grades0: 0,
      grades1: 0,
      grades2: 0,
      grades3: 0,
      triggers: 0,
      orders: 0,
      unit0: 0,
      unit1: 0,
      unit2: 0,
      unit3: 0,

      tableRows: [],
      mulliganTableRows: [],

      result: "",
    };
  },
  mounted() {
      this.countGradeAmount();
      this.calculate();
  },
  methods: {
    calculate() 
    {
      //First Table
      this.tableRows.push(this.calculateRow(this.grades0, `*Grades 0 [${this.grades0}]`));
      this.tableRows.push(this.calculateRow(this.grades1, `*Grades 1 [${this.grades1}]`));
      this.tableRows.push(this.calculateRow(this.grades2, `*Grades 2 [${this.grades2}]`));
      this.tableRows.push(this.calculateRow(this.grades3, `*Grades 3 [${this.grades3}]`));

      this.tableRows.push(this.calculateRow(this.orders, `Orders[${this.orders}]`));
      this.tableRows.push(this.calculateRow(this.triggers, `Triggers [${this.triggers}]`));

      this.tableRows.push(this.calculateRow(this.unit0, `*Grades 0 Units [${this.unit0}]`));
      this.tableRows.push(this.calculateRow(this.unit1, `*Grades 1 Units [${this.unit1}]`));
      this.tableRows.push(this.calculateRow(this.unit2, `*Grades 2 Units [${this.unit2}]`));
      this.tableRows.push(this.calculateRow(this.unit3, `*Grades 3 Units [${this.unit3}]`));

      this.tableRows.push(this.calculateRow(4, '4 copies in main deck'));
      this.tableRows.push(this.calculateRow(3, '3 copies in main deck'));
      this.tableRows.push(this.calculateRow(2, '2 copies in main deck'));
      this.tableRows.push(this.calculateRow(1, '1 copies in main deck'));

      //Second Table
      this.mulliganTableRows.push(this.calculateMulliganRow(this.grades0, `*Grades 0 [${this.grades0}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.grades1, `*Grades 1 [${this.grades1}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.grades2, `*Grades 2 [${this.grades2}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.grades3, `*Grades 3 [${this.grades3}]`));

      this.mulliganTableRows.push(this.calculateMulliganRow(this.orders, `Orders[${this.orders}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.triggers, `Triggers [${this.triggers}]`));

      this.mulliganTableRows.push(this.calculateMulliganRow(this.unit0, `*Grades 0 Units [${this.unit0}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.unit1, `*Grades 1 Units [${this.unit1}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.unit2, `*Grades 2 Units [${this.unit2}]`));
      this.mulliganTableRows.push(this.calculateMulliganRow(this.unit3, `*Grades 3 Units [${this.unit3}]`));

      this.mulliganTableRows.push(this.calculateMulliganRow(4, '4 copies in main deck'));
      this.mulliganTableRows.push(this.calculateMulliganRow(3, '3 copies in main deck'));
      this.mulliganTableRows.push(this.calculateMulliganRow(2, '2 copies in main deck'));
      this.mulliganTableRows.push(this.calculateMulliganRow(1, '1 copies in main deck'));
    },
    calculateRow(k, name)
    {
        const _result5 = k<5? 0 : this.formula(46, k, 5, 5);
        const _result4 = k<4? 0 : this.formula(46, k, 5, 4) + _result5;
        const _result3 = k<3? 0 :(this.formula(46, k, 5, 3) + _result4);
        const _result2 = k<2? 0 :(this.formula(46, k, 5, 2) + _result3);
        const _result1 = k<1? 0 :(this.formula(46, k, 5, 1) + _result2);


        return {target:name, result1: this.trunc(_result1), result2: this.trunc(_result2), result3: this.trunc(_result3), result4: this.trunc(_result4), result5: this.trunc(_result5)}
    },
    calculateMulliganRow(k, name)
    {

        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_1_1 = k<1? 0 :(this.formula(41, k, 1, 1));

        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_2_2 = k<2? 0 :(this.formula(41, k, 2, 2));
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_2_1 = k<1? 0 :(this.formula(41, k, 2, 1) + _result_2_2);


        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_3_3 = k<3? 0 :(this.formula(41, k, 3, 3));
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_3_2 = k<2? 0 :(this.formula(41, k, 3, 2) + _result_3_3);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_3_1 = k<1? 0 :(this.formula(41, k, 3, 1) + _result_3_2);

        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_4_4 = k<4? 0 : this.formula(41, k, 4, 4);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_4_3 = k<3? 0 :(this.formula(41, k, 4, 3) + _result_4_4);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_4_2 = k<2? 0 :(this.formula(41, k, 4, 2) + _result_4_3);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_4_1 = k<1? 0 :(this.formula(41, k, 4, 1) + _result_4_2);


        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_5_5 = k<5? 0 : this.formula(41, k, 5, 5);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_5_4 = k<4? 0 : this.formula(41, k, 5, 4) + _result_5_5;
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_5_3 = k<3? 0 :(this.formula(41, k, 5, 3) + _result_5_4);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_5_2 = k<2? 0 :(this.formula(41, k, 5, 2) + _result_5_3);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const _result_5_1 = k<1? 0 :(this.formula(41, k, 5, 1) + _result_5_2);

        return {target:name, result1: this.trunc(_result_1_1), result2: this.trunc(_result_2_1), result3: this.trunc(_result_3_1), result4: this.trunc(_result_4_1), result5: this.trunc(_result_5_1)}

    },
    formula(N, k, n, x) {
      // N: The number of items in the population. (populationSize)
      // k: The number of items in the population that are classified as successes. (successesInPopulation)
      // n: The number of items in the sample. (sampleSize)
      // x: The number of items in the sample that are classified as successes. (successesInSample)
      // kCx: The number of combinations of k things, taken x at a time.
      // h(x; N, n, k): hypergeometric probability - the probability that an n-trial hypergeometric experiment results in exactly x successes, when the population consists of N items, k of which are classified as successes.
      // FORMULA => h(x; N, n, k) = [ kCx ] [ N-kCn-x ] / [ NCn ]
      const result =
        (this.comb(k, x) * this.comb(N - k, n - x)) / this.comb(N, n);

      return result;
    },
    comb(n, r) {
      const result = this.fact(n);
      const divider = this.fact(r) * this.fact(n - r);

      return result / divider;
    },
    fact(n) {
      let result = 1;
      for (let i = 1; i <= n; i++) {
        result = result * i;
      }
      return result;
    },
    trunc(n) 
    {
        const nString = (n*100).toString();
        return Number(nString.slice(0, nString.indexOf(".")+4));
    },
    countGradeAmount() {
      this.grades0 = 0;
      this.grades1 = 0;
      this.grades2 = 0;
      this.grades3 = 0;
      this.orders = 0;
      this.triggers = 0;
      this.unit0 = 0; 
      this.unit1 = 0; 
      this.unit2 = 0; 
      this.unit3 = 0; 

      this.deck.forEach((e) => {
        
        let cardAmount = e.amount;
        if(e.inRideDeck == true) //If in ride deck, dont count one copy of the card for the stadistics
          cardAmount -=1;

        if (e.grade == 0)
        {
          this.grades0 += cardAmount;
          if(e.type == "Normal Unit")
            this.unit0 += cardAmount;
        }
        else if (e.grade == 1)
        {
          this.grades1 += cardAmount;
          if(e.type == "Normal Unit")
            this.unit1 += cardAmount;
        }
        else if (e.grade == 2) 
        {
          if(e.type == "Normal Unit")
            this.unit2 += cardAmount;
          this.grades2 += cardAmount;
        }
        else if (e.grade == 3) 
        {
          if(e.type == "Normal Unit")
            this.unit3 += cardAmount;
          this.grades3 += cardAmount;
        }

        if(e.type == "Normal Order" || e.type == "Blitz Order" || e.type == "Set Order")
          this.orders += cardAmount;
        else if(e.type == 'Trigger Unit')
          this.triggers += cardAmount;
      });
    },
    closeModal() {
      modalController.dismiss({ flag: true });
    },
  },
});
</script>

<style scoped>
ion-title {
  font-size: 5vw;
}

#table
{
    margin:auto;
    width: 95%;
}

.col {
  border: solid 1px grey;
  border-bottom-style: none;
  border-right-style: none;
  width: 15%;
  height: 80px;

  font-size: 14px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2px
}

.col:first-child
{
  width: 30%;
}

.col:last-child {
  border-right: solid 1px grey;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: rgba(82, 82, 82, 0.3);
  
}

.row:nth-child(even)
{
  background-color: rgba(180, 180, 180, 0.3);

}

.row:last-child .col {
  border-bottom: solid 1px grey;
}

.header .col {
    color: white;
    font-weight: bold;
    height: 50px;
}

h2
{
    color: var(--ion-color-secondary);
    text-align: center;
}

h2:not(:first-of-type)
{
    margin-top: 40px;
}

p
{
    text-align: justify;
    padding: 0 20px;
}

i
{
    color:DarkGrey;
}

</style>
