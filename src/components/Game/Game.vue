<template>
  <div>
    <MyCanvas style="width: 100%; height: 600px;">
      <MyBox
        v-for="(obj, index) of chartValues"
        :key=index
        :x1="(index / chartValues.length) * 100"
        :x2="(index / chartValues.length) * 100 + 100 / chartValues.length"
        :y1="100"
        :y2="100 - obj.val"
        :color="obj.color"
        :value="obj.val"
      >
      </MyBox>
    </MyCanvas>
    <h3>Connected to Websocket: {{ this.connected }}</h3>
    <br>
    <label v-bind="this.connected"></label>
    <div
      v-if="!this.connected.connected"
      class="joinContainer"
    >
      <label for="gamename"><b>GameName</b></label>
      <br />
      <input v-model="this.gamename" placeholder="gamename" type="text" />
      <br />
      <button v-on:click="join()">Connect</button>
    </div>
    <div
      id="gameContainer"
    >
      <button @click="disconnect()">Disconnect</button>
      <br>
      <button v-on:click="sendGameData()">Test Send GameData</button>
      <br>
      <textarea v-model="this.messages" id="chat-log" cols="100" rows="20"></textarea><br>
      {{ messages }}
      <ul>
        <li v-for="message in messages" v-bind:key="message.player.username">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MyCanvas from '../MyCanvas.vue';
import MyBox from '../MyBox.vue';

export default {
  name: "Join",
  components: {
    MyCanvas,
    MyBox,
  },
  data() {
    return {
      chartValues: [
        { val: 24, color: 'red' },
        { val: 32, color: '#0f0' },
        { val: 66, color: 'rebeccapurple' },
        { val: 1, color: 'green' },
        { val: 28, color: 'blue' },
        { val: 60, color: 'rgba(150, 100, 0, 0.2)' },
      ],

      connection: null,
      connected: false,
      gamename: '',
      messages: null,

      username: '',
      playerPosX: null,
      playerPosy: null,
      platerName: '',
      shurikenPosX: null,
      shurikenPosY: null,

      message: {
        player: {
          username: '',
          posX: null,
          posY: null,
        },
        shuriken: {
          playerName: '',
          posX: null,
          posY: null,
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      'getUsername',
    ]),
  },
  mounted() {
    let dir = 1;
    let selectedVal = Math.floor(Math.random() * this.chartValues.length);

    setInterval(() => {
      if (Math.random() > 0.995) dir *= -1;
      if (Math.random() > 0.99)
        selectedVal = Math.floor(Math.random() * this.chartValues.length);

      this.chartValues[selectedVal].val = Math.min(
        Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0),
        100
      );
    }, 16);
  },
  methods: {
    join() {
      this.connection = new WebSocket(`ws://127.0.0.1:8008/ws/chat/${this.gamename}/`);

      let data = {};

      this.connection.onopen = function(event) {
        console.log(event);
        this.connected = true;
        console.log(this.connected);
      }
      this.connection.onmessage = function(event) {
        data = JSON.parse(event.data);
        console.log(data.message);
        document.querySelector('#chat-log').value += (data.message.player.username + '\n');
      }
      this.connection.onclose = function(event) {
        this.connected = false;
        console.log(event);
        console.log(this.connection);
      }
      this.connection.onerror = function(event) {
        this.connected = false;
        console.log(event);
      }
    },
    sendGameData() {
      this.message.player.username = this.getUsername;
      this.message.player.posX = 100;
      this.message.player.posY = 200;
      this.message.shuriken.playerName = this.getUsername;
      this.message.shuriken.posX = 300;
      this.message.shuriken.posY = 400;

      this.connection.send(JSON.stringify(this.message));
    },
    disconnect() {
      this.connection.close();
    },
  },
};
</script>

<style>
.joinContainer {
  margin-left: auto;
  margin-right: auto;
  margin-top: 3vh;
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
