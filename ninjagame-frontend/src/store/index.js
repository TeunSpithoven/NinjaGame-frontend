export default store = new Vuex.Store({
  state: {
    roomName: '',
  },
  mutations: {
    setRoomName (state, newRoomName) {
      state.roomName = newRoomName;
    }
  }
})