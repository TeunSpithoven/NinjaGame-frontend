<template>
  <div>
    <h3>Connection status: <div id="connected">closed</div></h3>
    <br>
    <div
      id="joinContainer"
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
      <canvas id="gameCanvas"></canvas>
      <br>
      <button @click="disconnect()">Disconnect</button>
      <br>
      <button v-on:click="sendGameData()">Start</button>
      <br>
      <button id="upButton" v-on:click="onUp()">Up</button>
      <br>
      <button id="leftButton" v-on:click="onLeft()">Left</button>
      <button id="rightButton" v-on:click="onRight()">Right</button>
      <br>
      <br>
      <br>
      <br>
      <button id="downButton" v-on:click="onDown()">Down</button>
    </div>
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
      gamename: '',

      username: '',
      playerPosX: 100,
      playerPosY: 100,
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
    document.getElementById('gameContainer').style.display = 'none';
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
    printMessages() {
      console.log(this.messages);
    },
    join() {
      if(this.connection != null) {
        this.connection.close(1000, 'Deliberate disconnection');
      }
      this.connection = new WebSocket(`ws://127.0.0.1:8008/ws/chat/${this.gamename}/`);

      let data = {};

      this.connection.onopen = (e) => {
        document.querySelector('#connected').innerHTML = e.type;
        document.getElementById('joinContainer').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
      };
      this.connection.onmessage = (e) => {
        data = JSON.parse(e.data);
        console.log(data.message);
        // prepare coordinates
        var posX = data.message.player.posX;
        var posY = data.message.player.posY;
        // draw on gameCanvas
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(posX, posY, 30, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      }
      this.connection.onclose = (e) => {
        console.log(e);
        document.querySelector('#connected').innerHTML = e.type;
        document.getElementById('joinContainer').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
      }
      this.connection.onerror = (e) => {
        console.log(e);
        document.querySelector('#connected').innerHTML = e.type;
        document.getElementById('joinContainer').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
      }
    },
    sendGameData() {
      this.message.player.username = this.getUsername;
      this.message.player.posX = this.playerPosX;
      this.message.player.posY = this.playerPosY;
      this.message.shuriken.playerName = this.getUsername;
      this.message.shuriken.posX = 300;
      this.message.shuriken.posY = 400;

      this.connection.send(JSON.stringify(this.message));
    },
    disconnect() {
      this.connection.close();
    },
    onLeft() {
      this.playerPosX = this.playerPosX - 5;
      this.sendGameData();
    },
    onUp() {
      this.playerPosY = this.playerPosY - 5;
      this.sendGameData();
    },
    onDown() {
      this.playerPosY += 5;
      this.sendGameData();
    },
    onRight() {
      this.playerPosX += 5;
      this.sendGameData();
    },
  },
};
</script>

<style>
#gameCanvas {
  margin-left: auto;
  margin-right: auto;
  width: 20vw;
  border:1px solid #000000;
}

#leftButton {
  margin-left: 35vw;
  float: left;
  margin-right:10px;
  width: 9em;
}
#rightButton{
  float: left;
  margin-left: 10px;
  width: 9em;
}

#joinContainer {
  margin-left: auto;
  margin-right: auto;
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
  width: 20%;
  box-sizing: border-box;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}
</style>
