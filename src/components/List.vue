<template>
    <ion-list class="list-item">
      <ion-item class="itemDeckTab" v-for="(item, index) in list" :key="index" @click="OpenDeck(item)"  >
        <h2>{{item.name}}</h2>
        <img slot="end" class="nationImage" :src="getNationImage(item.nation)" :alt="item.nation">
      </ion-item>
    </ion-list>
</template>

<script>
import { IonList, IonItem } from '@ionic/vue';
import { mapState } from 'vuex';
import { useRouter } from 'vue-router';


export default {
  name: 'item-list',
  components: { 
    IonList, 
    IonItem, 
  }, 
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    list: Array,
    size: Number
  },
  computed:{
    ...mapState({
      nations: state => state.nations
    })
  },  
  methods:{
    OpenDeck(d)
    {
      const path = `/decks/${d.id}`
      this.router.push({path});
    },
    getNationImage(n)
    {
        const images = require.context('@/assets/nationImages/', false, /\.png$/);
        const result = images(`./${this.nations[n].banner}.png`);

        return result;
    }
  }
}
</script>

<style scoped>
ion-list, ion-item
{
  background-color: rgba(255, 0, 0, 0);
  --background: transparent;
}
.nationImage
{
  height: 30px;
  width: auto;
}
</style>