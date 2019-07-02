import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import combatants from './modules/combatants';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexPersist = new VuexPersistence({
  key: 'tracker-store',
  storage: window.localStorage,
});

const store = new Vuex.Store({
  modules: {
    combatants,
  },
  strict: debug,
  plugins: [vuexPersist.plugin],
});

export default store;
