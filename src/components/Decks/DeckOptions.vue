<template>
  <ion-item v-if="!isLoadingAdd" class="optionDeckItem">
    <ion-button fill="clear" @click="copyText()">
      Copy deck to Clipboard</ion-button
    >
  </ion-item>
  <ion-item v-if="!isLoadingAdd" class="optionDeckItem">
    <ion-button fill="clear" @click="openCalc()">
      Mulligan Calculator</ion-button
    >
  </ion-item>
  <ion-item v-if="!isLoadingAdd" class="optionDeckItem">
    <ion-button fill="clear" @click="deleteDeck()"> Delete Deck</ion-button>
  </ion-item>
  <ion-item v-if="!isLoadingAdd" class="optionDeckItem">
    <ion-button fill="clear" @click="prepareReward('decklist')">
      Generate Decklist</ion-button
    >
  </ion-item>
  <ion-item v-if="!isLoadingAdd" class="optionDeckItem">
    <ion-button fill="clear" @click="prepareReward('proxy')">
      Generate Proxy Deck</ion-button
    >
  </ion-item>
  <ion-item v-if="!isLoadingAdd" class="optionDeckItem">
    <ion-button fill="clear" class="cancel" @click="cancel()">
      Close
    </ion-button>
  </ion-item>
  <ion-spinner v-if="isLoadingAdd"></ion-spinner>
  <p id="spinnerText" v-if="isLoadingAdd">
    Genereating Document... This may take a few minutes
  </p>
</template>

<script>
import { IonItem, IonButton, modalController, IonSpinner } from "@ionic/vue";
import { useRouter } from "vue-router";

import { saveAs } from "file-saver";
import { Plugins, FilesystemDirectory } from "@capacitor/core";
const { Filesystem } = Plugins;

const { AdMob } = Plugins;

import {
  Document,
  Media,
  Packer,
  Paragraph,
  TableRow,
  TableCell,
  Table,
  BorderStyle,
  WidthType,
} from "docx";
import { PDFDocument } from "pdf-lib";

import Calculator from "@/views/Calculator";

export default {
  name: "DeckOptions",
  components: { IonItem, IonButton, IonSpinner },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    deck: null,
    cardList: null,
    rideDeck: null,
  },
  data() {
    return {
      isLoadingAdd: false,
      rewarded: false,
      options: {
        adId: "ca-app-pub-1601725610082442/1372750635",
        // isTesting: true
        // npa: true
      },
    };
  },
  mounted() {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "https://unpkg.com/downloadjs@1.4.7");
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    deleteDeck() {
      modalController.dismiss({ flag: "delete" });
    },
    cancel() {
      modalController.dismiss();
    },
    copyText() {
      const el = document.createElement("textarea");
      el.value = JSON.stringify(this.deck);
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);

      const sel = document.getSelection();
      if (sel != null) {
        const selected =
          (document != null && sel.rangeCount) > 0 ? sel.getRangeAt(0) : false;
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        if (selected) {
          sel.removeAllRanges();
          sel.addRange(selected);
        }

        modalController.dismiss();
      }
    },
    async openCalc() {
      this.modalOpen = true;
      const modal = await modalController.create({
        component: Calculator,
        cssClass: "my-custom-class",
        componentProps: {
          nation: this.deck.nation,
          deckList: this.cardList,
        },
      });
      modal.present();

      await modal.onWillDismiss();
      setTimeout(() => {
        this.modalOpen = false;
      }, 500);
    },
    getImageRoute(id) {
      const result = `https://raw.githubusercontent.com/CrowOnslaught/VanguarDecks-cardImages/master/cardImages/${id}.png`;
      return result.image;
    },
    async generateProxyDeck() {
      if (!this.rewarded) {
        window.alert("There was an error generating your Document");
        this.isLoadingAdd = false;
        return;
      }

      const doc = new Document();
      let imageArray = [];
      const tablerowArray = [];
      let tableCellArray = [];
      let tablerowIndex = 0;

      for (let index = 0; index < this.deck.decklist.length; index++) {
        const cs = this.deck.decklist[index];
        // const blob = await fetch(
        // this.getImageRoute(cs.cardId)
        // ).then(r => r.blob());

        const blob = await fetch(
          `https://raw.githubusercontent.com/CrowOnslaught/VanguarDecks-cardImages/master/cardImages/${
            cs.cardId.split("|")[0]
          }.png`
        ).then((r) => r.blob());

        for (let i = 0; i < cs.amount; i++) {
          const image = Media.addImage(doc, blob, 211.7, 308.93);
          imageArray.push(new Paragraph(image));
          tableCellArray.push(
            new TableCell({
              width: { size: 212, type: WidthType.AUTO },
              columnWidths: [3182.5, 3182.5, 3182.5],
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              },
              children: [new Paragraph(image)],
            })
          );
          tablerowIndex++;
          if (
            tablerowIndex == 3 ||
            (index == this.deck.decklist.length - 1 && i == cs.amount - 1)
          ) {
            tablerowArray.push(
              new TableRow({
                children: tableCellArray,
              })
            );

            tablerowIndex = 0;
            imageArray = [];
            tableCellArray = [];
          }
        }
      }

      const table = new Table({
        width: { size: 3182.5, type: WidthType.AUTO },
        columnWidths: [3182.5, 3182.5, 3182.5],
        rows: tablerowArray,
      });

      doc.addSection({
        margins: { top: 0, right: 200, bottom: 0, left: 1000 },
        children: [table],
      });

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const p = require("platform-detect");
      if (p.browser) {
        // console.log('browser!');
        Packer.toBlob(doc)
          .then((blob) => {
            // eslint-disable-next-line no-undef
            // download(blob, `${this.deck.name}_proxyDeck.docx`, "application/docx");

            saveAs(blob, `${this.deck.name}_proxyDeck.docx`);

            window.alert("Document created ");
          })
          .catch((err) => {
            window.alert(err);
          });
      } else if (p.android || p.ios) {
        // console.log('android!');

        Packer.toBase64String(doc)
          .then((docBase64) => {
            Filesystem.writeFile({
              path: `${this.deck.name}proxyDeck.docx`,
              data: docBase64,
              directory: FilesystemDirectory.Documents,
            }).then(
              (writeFileResponse) => {
                // console.log('writeFile success => ', writeFileResponse.uri);

                const link = document.createElement("a");
                link.download = `${this.deck.name}proxyDeck.docx`;
                link.href = writeFileResponse.uri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.alert("ProxyList saved in your DOCUMENTS folder");

                AdMob.removeAllListeners();
                this.isLoadingAdd = false;
                this.rewarded = false;
                modalController.dismiss();
              },
              (error) => {
                // console.log('writeFile error => ', error);
                window.alert(
                  "DOCUMENT CREATION FAILED\n You need to authorize 'Downloads from unknown sources' in your sistem app's configuration\n CONFIG>Applications>Vanguar[D]ecks>unknown sources"
                );
              }
            );
          })
          .catch((err) => {
            // console.log(err);
            window.alert(
              "DOCUMENT CREATION FAILED\n You need to authorize 'Downloads from unknown sources' in your sistem app's configuration\n CONFIG>Applications>Vanguar[D]ecks>unknown sources"
            );
          });
      }
    },
    async generateDecklist() {
      if (!this.rewarded) {
        window.alert("There was an error generating your Decklist");
        this.isLoadingAdd = false;
        return;
      }

      const formUrl = "../../../assets/decklist.pdf";

      const formPdfBytes = await fetch(formUrl).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const form = pdfDoc.getForm();

      const formFields = form.getFields();


      //Deck Name & Nation
      form.getTextField("Deck NameRow1").setText(this.deck.name);
      form.getTextField("ClanRow1").setText(this.deck.nation);

      //form.getFields().forEach((e, i) => console.log(i, e.getName()))

      //Ride deck
      let rideDeckIndex = 1;

      for (let i = 0; i < this.cardList.length; i++) {
        const card = this.cardList[i];
        const isInRideDeck = this.rideDeck.includes(card.id);

        if (isInRideDeck) {
          //Card Name
          const rideDeckCard = "G zone maximum 16 cardsRow" + rideDeckIndex;
          form.getTextField(rideDeckCard).setText(card.name);

          //Card Grade
          formFields[3 + rideDeckIndex].setText(card.grade.toString());


          //Card Amount
          const mainDeckAmount = "G Zone Qty" + (rideDeckIndex);
          form.getTextField(mainDeckAmount).setText("1");


          //Card set (Only if there is only one set)
          if (card.setCode.length == 1) {
            const mainDeckSet = "No." + (rideDeckIndex);
            form.getTextField(mainDeckSet).setText(card.setCode[0]);
          }

          //Card trigger or sentinel
          let triggerOrSentinel = "";
          if (card.type == "Trigger Unit") {
            triggerOrSentinel += card.trigger;
          }
          if (card.keywords.includes("Sentinel")) {
            triggerOrSentinel +=
              triggerOrSentinel == "" ? "Sentinel" : "/Sentinel";
          }
          const mainDecktrigger = "G Zone Row" + (rideDeckIndex);
          form.getTextField(mainDecktrigger).setText(triggerOrSentinel);

          rideDeckIndex++;
        }

        //Card Name
        const mainDeckCard = "Main deck 50 cardsRow" + (i + 1);
        form.getTextField(mainDeckCard).setText(card.name);

        //Card Grade
        formFields[8 + i].setText(card.grade.toString());

        //Card Amount
        const mainDeckAmount = "Main deck Qty" + (i + 1);
        form.getTextField(mainDeckAmount).setText((card.amount - (isInRideDeck? 1 : 0)).toString());

        //Card set (Only if there is only one set)
        if (card.setCode.length == 1) {
          const mainDeckSet = "No." + (i + 13 >= 15 ? i + 14 : i + 13);
          form.getTextField(mainDeckSet).setText(card.setCode[0]);
        }

        //Card trigger or sentinel
        let triggerOrSentinel = "";
        if (card.type == "Trigger Unit") {
          triggerOrSentinel += card.trigger;
        }
        if (card.keywords.includes("Sentinel")) {
          triggerOrSentinel +=
            triggerOrSentinel == "" ? "Sentinel" : "/Sentinel";
        }
        const mainDecktrigger = "Main deck Row" + (i + 1);
        form.getTextField(mainDecktrigger).setText(triggerOrSentinel);
      }

      const pdfBytes = await pdfDoc.save();
      const pdfBytes64 = await pdfDoc.saveAsBase64();

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const p = require("platform-detect");
      if (p.browser) {
        // console.log('browser!');
        // eslint-disable-next-line no-undef
        download(pdfBytes, `${this.deck.name}_decklist.pdf`, "application/pdf");
      } else if (p.android || p.ios) {
        // console.log('android!');
        Filesystem.writeFile({
          path: `${this.deck.name}Decklist.pdf`,
          data: pdfBytes64,
          directory: FilesystemDirectory.Documents,
        }).then(
          (writeFileResponse) => {
            // console.log('writeFile success => ', writeFileResponse.uri);

            const link = document.createElement("a");
            link.download = `${this.deck.name}decklist.pdf`;
            link.href = writeFileResponse.uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.alert("Decklist saved in your DOCUMENTS folder");

            AdMob.removeAllListeners();
            this.isLoadingAdd = false;
            this.rewarded = false;
            modalController.dismiss();
          },
          (error) => {
            window.alert(
              "DOCUMENT CREATION FAILED\n You need to authorize 'Downloads from unknown sources' in your sistem app's configuration\n CONFIG>Applications>Vanguar[D]ecks>unknown sources"
            );
            // console.log('writeFile error => ', error);
          }
        );
      }
    },

    async prepareReward(reward) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const p = require("platform-detect");
      if (p.browser) {
        this.rewarded = true;
        switch (reward) {
          case "decklist":
            this.generateDecklist();
            break;
          case "proxy":
            this.generateProxyDeck();
            break;
        }
        return;
      }

      this.isLoadingAdd = true;

      //Listen to ad error
      switch (reward) {
        case "decklist":
          AdMob.addListener("onRewardedVideoAdFailedToLoad", (info) => {
            window.alert(
              "There was an error loading the add. Generating Document anyways"
            );
            this.rewarded = true;
            this.generateDecklist();
          });
          // AdMob.addListener( 'onAdFailedToLoad', (info) => this.generateDecklist());
          break;
        case "proxy":
          AdMob.addListener("onRewardedVideoAdFailedToLoad", (info) => {
            window.alert(
              "There was an error loading the add. Generating Document anyways"
            );
            this.rewarded = true;
            this.generateProxyDeck();
          });
          // AdMob.addListener( 'onAdFailedToLoad', (info) => this.generateProxyDeck());
          break;
      }

      if (process.env.VUE_APP_PREMIUM_VERSION == "TRUE") {
        this.rewarded = true;
        switch (reward) {
          case "decklist":
              this.generateDecklist()
            break;
          case "proxy":
              this.generateProxyDeck()
            break;
        }
        return;
      }
      else{
          await AdMob.prepareRewardVideoAd(this.options);
          //.catch(e => console.log(e));
          AdMob.addListener("onRewarded", (info) => (this.rewarded = true));
          switch (reward) {
            case "decklist":
              AdMob.addListener("onRewardedVideoAdClosed", (info) =>
                this.generateDecklist()
              );
    
              break;
            case "proxy":
              AdMob.addListener("onRewardedVideoAdClosed", (info) =>
                this.generateProxyDeck()
              );
              break;
          }
    
          await this.showReward();
      }

    },
    async showReward() {
      await AdMob.showRewardVideoAd();
      //.catch(e => console.log(e));
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    },
    processfile(imageURL) {
      const image = new Image();
      const onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        canvas.toBlob(function (blob) {
          return blob;
        });
      };

      image.onload = onload;
      image.src = imageURL;
    },
  },
};
</script>

<style>
.cancel {
  color: red;
  text-align: center;
  width: 100%;
}

ion-spinner {
  width: 100%;
  text-align: center;
  margin-top: 40%;
  color: var(--ion-color-primary);
}

#spinnerText {
  color: var(--ion-color-primary);
  text-align: center;
  padding-top: -20px;
}

.optionDeckItem {
  font-size: 15px;
}

.buttons {
  align-items: center;
}
</style>
