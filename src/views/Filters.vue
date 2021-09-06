<template>
  <ion-page>
    <ion-content>
      <ion-item v-if="!is_premium_version">
          <div class="section">
              <p class="text title">adFree version now at <a href="https://play.google.com/store/apps/details?id=io.ionic.vanguardecksadfree">Google play!</a></p>
          </div>
      </ion-item>
      <ion-item class="item">
        <ion-button class="selButton resetAll" @click="ResetAll()">
          RESET ALL</ion-button
        >
      </ion-item>
      <ion-item class="orderItem">
        <ion-select
          :value="orderInput"
          selected-text="Order by"
          class="orderSel"
          @ionChange="onSortOrder($event.target.value)"
        >
          <ion-select-option value="name">name</ion-select-option>
          <ion-select-option value="setCode">set number</ion-select-option>
          <ion-select-option value="grade">grade</ion-select-option>
          <ion-select-option value="id" selected>revealed</ion-select-option>
        </ion-select>
        <!-- <div id="checkBox"> -->
        <p>Descendant:</p>
        <ion-checkbox
          :checked="!sortDescendant"
          class="selButton"
          @click="onSortOrderBox()"
        >
          Descendant</ion-checkbox
        >
        <!-- </div> -->
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Nations"
          v-model="nationInput"
          class="selInput"
          multiple="true"
          @ionChange="onNationSelect($event.target.value)"
          :value="nations"
        >
          <ion-select-option v-for="n in nations" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('nation')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('nation')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="nationInput.length == 0">None selected</span>
        <span v-else-if="nationInput.length == nations.length"
          >All selected</span
        >
        <span v-else v-for="n in nationInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Grades"
          v-model="gradeInput"
          class="selInput"
          multiple="true"
          @ionChange="onGradeSelect($event.target.value)"
          :value="grades"
        >
          <ion-select-option v-for="n in grades" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('grade')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('grade')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="gradeInput.length == 0">None selected</span>
        <span v-else-if="gradeInput.length == grades.length">All selected</span>
        <span v-else v-for="n in gradeInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Card Types"
          v-model="typeInput"
          class="selInput"
          multiple="true"
          @ionChange="onTypeSelect($event.target.value)"
          :value="types"
        >
          <ion-select-option v-for="n in types" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('type')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('type')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="typeInput.length == 0">None selected</span>
        <span v-else-if="typeInput.length == types.length">All selected</span>
        <span v-else v-for="n in typeInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item class="item">
        <ion-input
          v-model="nameInput"
          placeholder="Name"
          class="selInput"
          @input="onNameSelect($event.target.value)"
        ></ion-input>
        <ion-button class="selButton soloButton" @click="SelectNone('name')">
          Clear
        </ion-button>
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Sets"
          v-model="setInput"
          class="selInput"
          multiple="true"
          @ionChange="onSetSelect($event.target.value)"
          :value="sets"
        >
          <ion-select-option v-for="n in sets" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('set')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('set')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="setInput.length == 0">None selected</span>
        <span v-else-if="setInput.length == sets.length">All selected</span>
        <span v-else v-for="n in setInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Keywords"
          v-model="keywordInput"
          class="selInput"
          multiple="true"
          @ionChange="onKeywordSelect($event.target.value)"
          :value="keywords"
        >
          <ion-select-option v-for="n in keywords" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('keyword')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('keyword')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="keywordInput.length == 0">None selected</span>
        <span v-else-if="keywordInput.length == keywords.length"
          >All selected</span
        >
        <span v-else v-for="n in keywordInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item class="item">
        <ion-input
          v-model="skillInput"
          placeholder="Skill"
          class="selInput"
          @input="onSkillSelect($event.target.value)"
        ></ion-input>
        <ion-button class="selButton soloButton" @click="SelectNone('skill')">
          Clear
        </ion-button>
      </ion-item>
      <ion-item class="item">
        <ion-input
          v-model="powerInput"
          placeholder="Power"
          type="number"
          class="selInput"
          @input="onPowerSelect($event.target.value)"
        ></ion-input>
        <ion-button class="selButton soloButton" @click="SelectNone('power')">
          Clear
        </ion-button>
      </ion-item>
      <ion-item class="item">
        <ion-input
          v-model="shieldInput"
          placeholder="Shield"
          type="number"
          class="selInput"
          @input="onShieldSelect($event.target.value)"
        ></ion-input>
        <ion-button class="selButton soloButton" @click="SelectNone('shield')">
          Clear
        </ion-button>
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Abilities"
          v-model="abilityInput"
          class="selInput"
          multiple="true"
          @ionChange="onAbilitySelect($event.target.value)"
          :value="abilities"
        >
          <ion-select-option v-for="n in abilities" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('ability')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('ability')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="abilityInput.length == 0">None selected</span>
        <span v-else-if="abilityInput.length == abilities.length"
          >All selected</span
        >
        <span v-else v-for="n in abilityInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item class="item">
        <ion-input
          v-model="raceInput"
          placeholder="Race"
          class="selInput"
          @input="onRaceSelect($event.target.value)"
        ></ion-input>
        <ion-button class="selButton soloButton" @click="SelectNone('race')">
          Clear
        </ion-button>
      </ion-item>
      <ion-item lines="none">
        <ion-select
          selected-text="Triggers"
          v-model="triggerInput"
          class="selInput"
          multiple="true"
          @ionChange="onTriggerSelect($event.target.value)"
          :value="triggers"
        >
          <ion-select-option v-for="n in triggers" :key="n" :value="n">{{
            n
          }}</ion-select-option>
        </ion-select>
        <ion-button class="selButton" @click="SelectAll('trigger')">
          SELECT<br />ALL</ion-button
        >
        <ion-button class="selButton" @click="SelectNone('trigger')">
          SELECT<br />NONE</ion-button
        >
      </ion-item>
      <ion-item class="selectValue">
        <span v-if="triggerInput.length == 0">None selected</span>
        <span v-else-if="triggerInput.length == triggers.length"
          >All selected</span
        >
        <span v-else v-for="n in triggerInput" :key="n">{{ n }}</span>
      </ion-item>
      <ion-item class="item">
        <ion-button class="selButton resetAll" @click="openCredits()"
          >ABOUT</ion-button
        >
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonSelect,
  IonItem,
  IonSelectOption,
  IonButton,
  IonInput,
  modalController,
  IonCheckbox,
} from "@ionic/vue";

import CreditsVue from "@/components/Filters/Credits.vue";
import { mapState } from "vuex";

export default {
  name: "Filters",
  components: {
    IonContent,
    IonPage,
    IonSelect,
    IonItem,
    IonSelectOption,
    IonButton,
    IonInput,
    IonCheckbox,
  },
  data() {
    return {
      nations: [],
      abilities: [],
      sets: [],
      keywords: [],
      types: [],
      triggers: [],
      grades: [],

      orderInput: "id",
      nameInput: "",
      skillInput: "",
      raceInput: "",
      powerInput: "",
      shieldInput: "",

      nationInput: [],
      gradeInput: [],
      abilityInput: [],
      setInput: [],
      keywordInput: [],
      typeInput: [],
      triggerInput: [],

      sortDescendant: false,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.cards,
      filters: (state) => state.cards.filters,
    }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    is_premium_version : function(){
      return process.env.VUE_APP_PREMIUM_VERSION == "TRUE";
    }
  },
  ionViewWillEnter() {
    this.nationInput = this.filters.nations;
  },
  mounted(){
    this.onLoad();
  },
  methods: {
    onLoad(){
        this.nations= this.data.nations;
        this.abilities= this.data.abilities;
        this.sets= this.data.sets;
        this.keywords= this.data.keywords;
        this.types= this.data.types;
        this.triggers= this.data.triggers;
        this.grades= this.data.grades;

        this.nameInput= "";
        this.skillInput= "";
        this.raceInput= "";
        this.powerInput= "";
        this.shieldInput= "";

        this.nationInput= this.data.nations;
        this.gradeInput= this.data.grades;
        this.abilityInput= this.data.abilities;
        this.setInput= this.data.sets;
        this.keywordInput= this.data.keywords;
        this.typeInput= this.data.types;
        this.triggerInput= this.data.triggers;

        this.sortDescendant= false;
    },
    onSortOrder(value) {
      this.orderInput = value;
      this.$store.dispatch("cards/setFilters", { order: (this.sortDescendant ? "-" : "") + value });
    },
    onSortOrderBox() {
      this.sortDescendant = !this.sortDescendant;

      if (!this.sortDescendant && this.filters.order.startsWith("-")) {
        this.$store.dispatch("cards/setFilters", { order: this.filters.order.substr(1) });

      } else if (this.sortDescendant && !this.filters.order.startsWith("-")) {
        this.$store.dispatch("cards/setFilters", { order: "-" + this.filters.order });
      }
    },
    onNationSelect(value) {
      this.$store.dispatch("cards/setFilters", { nations: value });
    },
    onGradeSelect(value) {
      this.$store.dispatch("cards/setFilters", { grades: value });
    },
    onNameSelect(value) {
      this.$store.dispatch("cards/setFilters", { name: value });
    },
    onSkillSelect(value) {
      this.$store.dispatch("cards/setFilters", { skill: value });
    },
    onPowerSelect(value) {
      this.$store.dispatch("cards/setFilters", { power: value });
    },
    onShieldSelect(value) {
      this.$store.dispatch("cards/setFilters", { shield: value });
    },
    onAbilitySelect(value) {
      this.$store.dispatch("cards/setFilters", { abilities: value });
    },
    onRaceSelect(value) {
      this.$store.dispatch("cards/setFilters", { race: value });
    },
    onSetSelect(value) {
      this.$store.dispatch("cards/setFilters", { sets: value });
    },
    onKeywordSelect(value) {
      this.$store.dispatch("cards/setFilters", { keywords: value });
    },
    onTypeSelect(value) {
      this.$store.dispatch("cards/setFilters", { types: value });
    },
    onTriggerSelect(value) {
      this.$store.dispatch("cards/setFilters", { trigger: value });
    },

    SelectAll(value) {
      if (value == "nation" || value == "default") {
        this.nationInput = this.data.nations;
        this.$store.dispatch("cards/setFilters", { nations: this.nationInput });
      }
      if (value == "grade" || value == "default") {
        this.gradeInput = this.data.grades;
        this.$store.dispatch("cards/setFilters", { grades: this.gradeInput });
      }
      if (value == "ability" || value == "default") {
        this.abilityInput = this.data.abilities;
        this.$store.dispatch("cards/setFilters", { abilities: this.abilityInput });
      }
      if (value == "set" || value == "default") {
        this.setInput = this.data.sets;
        this.$store.dispatch("cards/setFilters", { sets: this.setInput });
      }
      if (value == "keyword" || value == "default") {
        this.keywordInput = this.data.keywords;
        this.$store.dispatch("cards/setFilters", { keywords: this.keywordInput });
      }
      if (value == "type" || value == "default") {
        this.typeInput = this.data.types;
        this.$store.dispatch("cards/setFilters", { types: this.typeInput });
      }
      if (value == "trigger" || value == "default") {
        this.triggerInput = this.data.triggers;
        this.$store.dispatch("cards/setFilters", { trigger: this.triggerInput });
      }
    },
    SelectNone(value) {
      if (value == "name" || value == "default") {
        this.nameInput = "";
        this.onNameSelect("");
      }
      if (value == "skill" || value == "default") {
        this.skillInput = "";
        this.onSkillSelect("");
      }
      if (value == "power" || value == "default") {
        this.powerInput = "";
        this.onPowerSelect("");
      }
      if (value == "shield" || value == "default") {
        this.shieldInput = "";
        this.onShieldSelect("");
      }
      if (value == "race" || value == "default") {
        this.raceInput = "";
        this.onRaceSelect("");
      }

      if (value == "nation" || value == "default") {
        this.nationInput = [];
      }
      if (value == "grade" || value == "default") {
        this.gradeInput = [];
      }
      if (value == "ability" || value == "default") {
        this.abilityInput = [];
      }
      if (value == "set" || value == "default") {
        this.setInput = [];
      }
      if (value == "keyword" || value == "default") {
        this.keywordInput = [];
      }
      if (value == "type" || value == "default") {
        this.typeInput = [];
      }
      if (value == "trigger" || value == "default") {
        this.triggerInput = [];
      }
    },

    ResetAll() {
      this.SelectNone("default");
      this.SelectAll("default");
    },
    async openCredits() {
      const modal = await modalController.create({
        component: CreditsVue,
        cssClass: "my-custom-class",
      });
      modal.present();
    },
  },
};
</script>

<style scoped>
.selectValue {
  font-size: 11px;
  white-space: pre;
}
.selectValue > span:not(:last-child)::after {
  content: " | ";
}

.selInput {
  width: 80vw;
  max-width: 80vw;
}

.resetAll {
  width: 100%;
}

.orderItem {
}

.orderSel {
  width: 60%;
}

ion-checkbox {
  width: 40px;
  height: 40px;
}

.selButton {
  height: 40px;
  margin: 10px 0px 10px 10px;
}

.soloButton {
  width: 132px;
}

ion-input {
  --color: var(--ion-color-primary);
  --placeholder-color: var(--ion-color-dark);
}

.section
{
    width: 100vw;
}

.text
{
    margin: 8px;
    font-size: 16px;
    text-align: center;
    color: var(--ion-color-dark);
}

.title
{
    font-size: 18px;
    text-decoration: underline;
    color: var(--ion-color-primary-shade);
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
}

a
{
    color: var(--ion-color-medium);
}

.subtitle
{
    color: var(--ion-color-secondary);
}

</style>
