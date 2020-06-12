import { GET_GROUPS } from "./mutations";
import { groupApi } from "../../api/groupApi";

const state = {
  groups: [],
};

const mutations = {
  [GET_GROUPS](state, groups) {
    state.groups = groups;
  },
};

const actions = {
  getGroupsAction({ commit }) {
    const groups = groupApi.getGroups();

    commit(GET_GROUPS, groups);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
