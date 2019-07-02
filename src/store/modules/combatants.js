import Vue from 'vue';
import nanoid from 'nanoid';

const state = {};

const getters = {
  getOrderedByInitiative: state => Object.values(state).sort((a, b) => b.initiative - a.initiative),
};

const mutations = {
  setCombatant(state, { id, key, value }) {
    // state[id][key] = value;
    Vue.set(state[id], key, value);
  },
  addCombatant(state, combatant) {
    const id = nanoid();
    // state[id] = {
    //   ...combatant,
    //   id,
    // };
    Vue.set(state, id, {
      ...combatant,
      id,
    });
  },
  removeCombatant(state, id) {
    // delete state[id];
    Vue.delete(state, id);
  },
};

export default {
  state,
  getters,
  mutations,
};
