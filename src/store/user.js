export default {
  state: {
    token: '',
    refresh: '',
  },
  mutations: {
    SET_token(state, token) {
      state.token = token;
    },
    SET_refresh(state, refresh) {
      state.refresh = refresh;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getRefresh(state) {
      return state.refresh;
    },
  },
};