<template>
    <ion-page>
        <ion-header>
            <ion-toolbar style="--background:  var(--ion-color-primary-shade);">
                <ion-buttons slot="start">
                    <ion-back-button @click="closeModal()" :icon='chevronBack' style="display: block; color: white;"></ion-back-button>
                </ion-buttons>        
                <ion-title>Vanguar[D]ecks Info</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <div class="section">
                    <p class="text title">Version {{data.version}}</p>
                    <p class="text">This App's version have {{data.cards.length}} cards from the Standard [D] format from {{data.sets.length}} different sets.</p>
                </div>
            </ion-item>
            <ion-item>
                <div class="section">
                    <p class="text title">Cardfight! Vanguard OverDress</p>
                    <p class="text subtitle">Learn more about OverDress and the [D] format <a href="https://en.cf-vanguard.com/information/vg_project_2_presentation/">HERE</a></p>
                </div>
            </ion-item>
            <ion-item>
                <div class="section">
                    <p class="text title">CREDITS</p>
                    <p class="text subtitle">Developing & Design:</p>
                    <p class="text">Jaume Garcia (Crow Onslaught)</p>
                    <p class="text subtitle">Developing Support:</p>
                    <p class="text">Ignasi Peláez</p>
                    <p class="text subtitle">Design Support:</p>
                    <p class="text">María García (<a href="https://www.instagram.com/purpleravenart/">PurpleRavenArt</a>)</p>
                    <p class="text subtitle">Special thanks to:</p>
                    <p class="text">Vicente Lozano, David Jurado, <br>Alejandro Nasarre, Over</p>
                    
                </div>
            </ion-item>
            <ion-item>
                <div class="section">
                    <p class="text title">Licence</p>
                    <p class="text">My free Android application use advertising provided by capacitor-community admob.<br>Community admob's Licence is availible at <a href="https://github.com/capacitor-community/admob/blob/master/LICENSE">https://github.com/capacitor-community/admob/blob/master/LICENSE</a></p>
                </div>
            </ion-item>
            <ion-item>
                <div class="section">
                    <p class="text title">Privacy Policy</p>
                    <p class="text">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.<br><a href="https://www.privacypolicies.com/live/8f907a7b-25a6-4ec9-9157-bf93b5548ffe">https://www.privacypolicies.com/live/8f907a7b-25a6-4ec9-9157-bf93b5548ffe</a></p>
                </div>
            </ion-item>
            <!-- <ion-item>
                <div class="section">
                    <p class="text title">Donations</p>
                    <p class="text"> If you liked the application and want to give some support, you can do it through my Ko-fi at <a href="https://ko-fi.com/crowonslaught">www.ko-fi.com/CrowOnslaught</a></p>
                </div>
            </ion-item> -->
            <ion-item>
                <div class="section">
                    <p class="text title">Contact</p>
                    <p class="text">If you have fond any bug or problem, or if you have any suggestion, contact me by emailing at <a href="mailto:crowblackclaws@gmail.com">CrowBlackClaws@Gmail.com</a></p>
                </div>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonBackButton, IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonItem, modalController } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { defineComponent } from "vue";
import { mapState } from 'vuex';

export default defineComponent({
    name: 'Credits',
    components: { IonBackButton, IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonItem, IonTitle, },
    setup() {
        return {
        chevronBack
        }
    },
    computed:{
        ...mapState({
            data: state => state.cards,
        })
    },
    methods:
    {
        closeModal() {
            modalController.dismiss({flag: true});          
        }
    },
    mounted()
    {
        // console.log('holo');
    }
})
</script>

<style scoped>

ion-title
{
    font-size: 20px;
    font-size: 5vw;
}

ion-list, ion-item
{
  background-color: rgba(255, 0, 0, 0);
  --background: transparent;
}

.section
{
    width: 100vw;
    margin-bottom: 20px;
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