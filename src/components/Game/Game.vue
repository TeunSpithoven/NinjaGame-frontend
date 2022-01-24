<template>
  <div>
    <h3>Connection status: <div id="connected">closed</div></h3>
    <br>
    <div
      id="joinContainer"
    >
      <label for="gamename"><b>GameName</b></label>
      <br />
      <input id="gamenameInput" v-model="this.gamename" placeholder="gamename" type="text" />
      <br />
      <button id="connectButton" class="button" v-on:click="join()">Connect</button>
    </div>
    <div
      id="gameContainer"
    >
      <canvas id="gameCanvas"></canvas>
      <br>
      <button @click="disconnect()">Disconnect</button>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import MyCanvas from '../MyCanvas.vue';
// import MyBox from '../MyBox.vue';

export default {
  name: "Join",
  // components: {
  //   MyCanvas,
  //   MyBox,
  // },
  data() {
    return {
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
      let game_data;

      this.connection.onopen = (e) => {
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'green';
        ctx.fill();
        document.querySelector('#connected').innerHTML = e.type;
        document.getElementById('joinContainer').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
      };
      this.connection.onmessage = (e) => {
        data = JSON.parse(e.data);
        game_data = data.message;
        console.log(game_data);
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game_data.forEach(message => {
          var canvas = document.getElementById("gameCanvas");
          var ctx = canvas.getContext("2d");
          var posX = message.player.posX;
          var posY = message.player.posY;
          // draw on gameCanvas
          ctx.beginPath();
          ctx.arc(posX, posY, 30, 0, 2 * Math.PI);
          ctx.stroke();
          if(message.player.username === this.getUsername) {
            ctx.fillStyle = 'green';
          }
          if(message.player.username !== this.getUsername) {
            ctx.fillStyle = 'black';
          }
          ctx.fill();
        });
      }
      this.connection.onclose = (e) => {
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(e);
        document.querySelector('#connected').innerHTML = e.type;
        document.getElementById('joinContainer').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
      }
      this.connection.onerror = (e) => {
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      this.playerPosX = 100;
      this.playerPosY = 100;
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

<style scoped>
#gameCanvas {
  margin-left: auto;
  margin-right: auto;
  width: 50vw;
  border:1px solid #000000;
}

.button{
  width: 100%;
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
