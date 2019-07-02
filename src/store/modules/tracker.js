import Vue from 'vue';
import nanoid from 'nanoid';

const DEFAULTS = {
  initiative: {
    initial: 0,
    min: -5,
    max: 20,
  },
  hp: {
    initial: 25,
    min: 1,
    max: 200,
  },
  ac: {
    initial: 15,
    min: 10,
    max: 30,
  },
  str: {
    initial: 0,
    min: -5,
    max: 5,
  },
  dex: {
    initial: 0,
    min: -5,
    max: 5,
  },
  con: {
    initial: 0,
    min: -5,
    max: 5,
  },
  int: {
    initial: 0,
    min: -5,
    max: 5,
  },
  wis: {
    initial: 0,
    min: -5,
    max: 5,
  },
  cha: {
    initial: 0,
    min: -5,
    max: 5,
  },
};

const state = {};

const getters = {
  getOrderedByInitiative: state => Object.values(state).sort((a, b) => b.initiative - a.initiative),
  getDefaults: () => DEFAULTS,
};

const mutations = {
  setCombatant(state, { id, key, value }) {
    Vue.set(state[id], key, value);
  },
  addCombatant(state, name) {
    const id = nanoid();
    const combatant = {};
    for (const key in DEFAULTS) {
      if (DEFAULTS.hasOwnProperty(key)) {
        combatant[key] = DEFAULTS[key].initial;
      }
    }
    Vue.set(state, id, {
      name,
      id,
      ...combatant,
    });
  },
  removeCombatant(state, id) {
    Vue.delete(state, id);
  },
};

export default {
  state,
  getters,
  mutations,
};
