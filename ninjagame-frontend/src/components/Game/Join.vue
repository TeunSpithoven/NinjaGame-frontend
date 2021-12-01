<template>
  <div class="container">
    <label for="username"><b>Username</b></label>
    <br />
    <input v-model="username" placeholder="username" type="text" />
    <br />
    <label for="gamename"><b>GameName</b></label>
    <br />
    <input v-model="gamename" placeholder="gamename" type="text" />
    <br />
      <button v-on:click="join(this.game_data.gamename)">Connect
        <router-link to="./game"></router-link>
      </button>
    <br>
    <button v-on:click="sendGameData()">Test Send GameData</button>
  </div>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      connection: null,
      game_data: {
        gamename: '',
        player: {
          username: 'testusername',
          posX: 50,
          posY: 90,
        },
        shuriken: {
          playerName: 'testplayername',
          posX: 900,
          posY: 800,
        },
      },
    };
  },
  methods: {
    join(gamename) {
      //route to game and make websocket connection there
      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket(`ws://127.0.0.1:8008/ws/${gamename}/`);
    },
    sendGameData() {
      console.log(this.connection);
      this.connection.send(JSON.stringify(this.game_data));
    },
  },
};
</script>

<style>
.container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30vh;
    width: 17em;
    padding: 15px;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #b95216;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}
</style>
