import { createStore } from 'vuex'
import cards from './modules/cards'
import nations from './modules/nations'
import decks from './modules/decks'

export default createStore({
  state: {},
  mutations: {
  },
  actions: {
  },
  modules: {
    cards,
    nations,
    decks
  }
})
