const state = {
  decks: [],
  currentDeck: null,
};

const getters = {};

const mutations = {
  SET_DATA(state: any, data: any) {
    state.decks = data;
    if(state.decks.length > 0)
        state.currentDeck = state.decks[0];

    console.log(2, 'currentDeck', state.currentDeck)
  },
  SET_CURRENTDECK(state: any, data: any) {
    if(state.decks.length <= 0)
      state.currentDeck = null;
    else
      state.currentDeck = state.decks.find((e: any) => e.id == data)
  },
  ADD_DECK(state: any, data: any){
    state.decks.push(data);
    localStorage.setItem('decks', JSON.stringify(state.decks));
  },
  CREATE_DECK(state: any, data: any){
    //createID
    let currentId = 0;
    let newId = '';
    while (newId == '')
    {
      if(state.decks.find((e: any) => e.id == currentId.toString()))
        currentId++;
      else
        newId = currentId.toString();
    }

    data.id = newId;
    state.decks.push(data);
    localStorage.setItem('decks', JSON.stringify(state.decks));
  },
  DELETE_DECK(state: any, data: any){
    state.decks.splice(data, 1);
    localStorage.setItem('decks', JSON.stringify(state.decks));
  },
  ADD_CARD_TO_CURRENTDECK(state: any, data: any){
    const cardSlot = state.currentDeck.decklist.find(
      (e: any) => e.cardId == data.cardIdCode
    );
    if (cardSlot != undefined) cardSlot.amount += data.amount;
    else {
      const cs = { cardId: data.cardIdCode, amount: data.amount, inRideDeck: false };
      state.currentDeck.decklist.push(cs);
    }

    localStorage.setItem("decks", JSON.stringify(state.decks));
  },
  REMOVE_CARD_FROM_CURRENTDECK(state: any, data: any){
    const cardSlot = state.currentDeck.decklist.find(
      (e: any) => e.cardId == data.cardIdCode
    );
    if (cardSlot != undefined) {
      cardSlot.amount -= data.amount;
      if (cardSlot.amount <= 0) {
        const cardSlotIndex = state.currentDeck.decklist.findIndex(
          (e: any) => e.cardId == data.card.id
        );
        state.currentDeck.decklist.splice(cardSlotIndex, 1);
      }
    }
    localStorage.setItem("decks", JSON.stringify(state.decks));
  },
};

const actions = {
  fetchData({ commit }: any /*params*/) {
    return new Promise((resolve, reject) => {
      const ls = localStorage.getItem("decks");
      if (ls != null) {
        const data = JSON.parse(ls);
        commit("SET_DATA", data);
        resolve(data);
      }
    });
  },
  setCurrentDeck({ commit }: any, params: any){
    return new Promise((resolve, reject) => {
      commit("SET_CURRENTDECK", params.id);
      resolve(state.currentDeck);
    });
  },
  addDeck({ commit }: any, params: any){
    return new Promise((resolve, reject) => {
      commit("ADD_DECK", params);
      resolve(state.decks);
    });
  },
  createDeck({ commit }: any, params: any){
    return new Promise((resolve, reject) => {
      commit("CREATE_DECK", params);
      resolve(state.decks);
    });
  },
  deleteDeck({ commit }: any, params: any){
    return new Promise((resolve, reject) => {
      commit("DELETE_DECK", params.index);
      resolve(state.decks);
    });
  },
  addCardToCurrentdeck({ commit }: any, params: any){
    return new Promise((resolve, reject) => {
      commit("ADD_CARD_TO_CURRENTDECK", params);
      resolve(state.currentDeck);
    });
  },
  removeCardFromCurrentdeck({ commit }: any, params: any){
    return new Promise((resolve, reject) => {
      commit("REMOVE_CARD_FROM_CURRENTDECK", params);
      resolve(state.currentDeck);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
