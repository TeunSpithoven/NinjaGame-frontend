export default {
  state: {
    username: 'defaultusername',
    token: '',
    refresh: '',
  },
  mutations: {
    SET_username(state, username) {
      state.username = username;
    },
    SET_token(state, token) {
      state.token = token;
    },
    SET_refresh(state, refresh) {
      state.refresh = refresh;
    },
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
    getToken(state) {
      return state.token;
    },
    getRefresh(state) {
      return state.refresh;
    },
  },
};