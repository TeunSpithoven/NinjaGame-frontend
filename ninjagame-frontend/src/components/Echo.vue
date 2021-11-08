<template>
<div class="container">
  <button v-on:click="connect">Connect</button>
  <br>
    <label for="message"><b>Message</b></label>
    <br />
    <input v-model="message" placeholder="message" type="text" />

    <button v-on:click="sendMessage('Hello World')">Send Message</button>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Echo',
  data() {
      return{
        message: String,
        connection: false
      };
  },
  methods: {
    connect() {
      console.log("Starting connection to websocket server");
        this.connection = new WebSocket("wss://echo.websocket.org");

        this.connection.onopen = function(event) {
          console.log(event);
          console.log("Succesfully connected to echo websocket server");
        };

        this.connection.onmessage = function(event) {
          console.log(event);
        };
    },
    sendMessage(message){
      console.log(this.connection);
      this.connection.send(message);
    },
  },
  created() {
      
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
