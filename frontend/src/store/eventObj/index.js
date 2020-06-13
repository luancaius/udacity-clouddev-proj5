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
  [SAVE_EVENT](state, { item, g }) {
    item["groupName"] = g.find(a => a.id == item.groupId).name;
    state.events.push(item);
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
  async saveEventAction({ commit }, { item, g, token }) {
    const result = await eventApi.saveEvent(item, token);
    commit(SAVE_EVENT, { item: result.item, g });
  },
  async deleteEventAction({ commit }, { eventId, token }) {
    await eventApi.deleteEvent(eventId, token);
    commit(DELETE_EVENT, eventId);
  },
  async updateEventAction({ commit }, { updatedItem, token }) {
    const result = await eventApi.updateEvent(updatedItem, token);
    commit(UPDATE_EVENT, result);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
