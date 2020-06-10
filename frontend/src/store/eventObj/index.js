import { GET_EVENTS, SAVE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./mutations";
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
  [DELETE_EVENT](state, eventId) {
    state.events = [...state.events.filter(p => p.eventId !== eventId)];
  },
  [UPDATE_EVENT](state, result) {
    const index = state.events.findIndex(h => h.eventId === result.eventId);
    state.events.splice(index, 1, result);
    state.events = [...state.events];
  },
};

const actions = {
  async getEventsAction({ commit }, { token }) {
    const events = await eventApi.getEvents(token);
    commit(GET_EVENTS, events);
  },
  async saveEventAction({ commit }, { item, token }) {
    const result = await eventApi.saveEvent(item, token);
    commit(SAVE_EVENT, result.item);
  },
  async deleteEventAction({ commit }, { eventId, token }) {
    await eventApi.deleteEvent(eventId, token);
    commit(DELETE_EVENT, eventId);
  },
  async updateEventAction({ commit }, { item, token }) {
    const updatedItem = await eventApi.updateEvent(item, token);
    commit(UPDATE_EVENT, updatedItem);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
