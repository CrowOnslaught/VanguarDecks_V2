<template>
            <ion-item class="newDeckItem">
                <h1>Create Deck</h1>
            </ion-item>
            <ion-item lines="none" class="newDeckItem buttons">
                <ion-button fill="clear" id='importBot' @click="importDeck()"> Import from Clipboard</ion-button>
            </ion-item>
            <ion-item class="newDeckItem">
                <ion-label>Name:</ion-label>
                <ion-input placeholder="Name" maxlength=23 v-model="selectedName"></ion-input>
            </ion-item>
            <ion-item class="newDeckItem">
                <ion-label>Nation:</ion-label>
                <ion-select v-model="selectedNation">
                    <ion-select-option v-for="n in nations" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item  class="newDeckItem buttons">
                <ion-button fill="clear" @click="cancel()"> Cancel</ion-button>
                <ion-button slot='end' fill="clear" :disabled="selectedNation == '' || selectedName == ''" @click="createDeck()"> Create</ion-button>
            </ion-item>
</template>

<script>

import { IonSelect, IonSelectOption, IonInput, IonItem, IonButton, IonLabel, modalController } from '@ionic/vue';
import { mapState } from "vuex";

import { Plugins } from '@capacitor/core'; 
const { Clipboard  } = Plugins;

export default {
    name:'NewDeck',
    components: { IonSelect, IonSelectOption, IonInput, IonItem, IonButton, IonLabel},
    data()
    {
        return{
            nations: [],
            selectedName: '',
            selectedNation: ''
        }
    },
    computed:{
        ...mapState({
            cards: state => state.cards.cards,
            data: state => state.cards.nations,
            decks: state => state.decks.decks,
            currentDeck: state => state.decks.currentDeck
        }),
    },
    mounted()
    {
        this.nations = this.data;
        this.nations.splice(this.nations.length-1,1);
    },
    methods:
    {
        createDeck()
        {
            modalController.dismiss({id: '', name: this.selectedName, nation: this.selectedNation, decklist: []});
        },
        cancel()
        {
            modalController.dismiss();
        },
        async importDeck()
        {
            await Clipboard.read()
                .then(text => {
                    try
                    {
                        const t = JSON.parse(text.value);

                        //createID
                        let currentId = 0;
                        let newId = '';
                        while (newId == '')
                        {
                            if(this.decks.find(e => e.id == currentId.toString()))
                                currentId++;
                            else
                                newId = currentId.toString();

                            
                        }

                        t.id = newId;
                        this.$store.dispatch("decks/addDeck", t);

                        modalController.dismiss({imported: true});
                    }catch(err)
                    {
                        console.log(err);
                        window.alert('Failed generating a deck from Clipboard Content');
                    }
                })
                .catch(err=>
                {
                    window.alert('Failed reading clipboard content')
                    console.log(err);
                });
        }
    }

}
</script>

<style>
h1{
    margin: 20px 0px 10px 0px;
    text-align: center;
    width: 100%;
}

#import
{
    width: 80px;
}

#importBot
{
    width: 100%;
    margin: 0;
    margin-bottom: 10px;
    text-align: center;
}

.newDeckItem
{
    --min-height: 60px;
}

.buttons
{
    align-items: center;
}

</style>