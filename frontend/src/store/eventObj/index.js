import { GET_EVENTS, SAVE_EVENT } from "./mutations";
import { eventApi } from "../../api/eventApi";

const state = {
  events: [],
};

const getters = {
  getEventById: (state) => (id) => state.events.find((h) => h.eventId === id),
};

const mutations = {
  [GET_EVENTS](state, events) {
    state.events = events;
  },
  [SAVE_EVENT](state, result) {
    state.events.push(result);
  },
};

const actions = {
  async getEventsAction({ commit }, { userId, token }) {
    const events = await eventApi.getEvents(userId, token);
    commit(GET_EVENTS, events);
  },
  async saveEventAction({ commit }, { eventObj, token }) {
    await eventApi.saveEvent(eventObj, token);
    commit(SAVE_EVENT, true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
