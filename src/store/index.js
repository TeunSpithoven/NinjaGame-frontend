import store from 'vuex';
import Vuex from 'vuex';

export default store = new Vuex.Store({
  state: {
    roomName: '',
    userName: '',
  },
  mutations: {
    setRoomName (state, newRoomName) {
      state.roomName = newRoomName;
    },
    setUserName (state, newUserName) {
      state.userName = newUserName;
    },
  }
})