<template>
  <div class="container">
    <head>
      <meta charset="utf-8" />
      <title>Chat Rooms</title>
    </head>
    <body>
      Enter Room Name<br />
      <input v-model="roomName" type="text" size="100" /><br />
      <button v-on:click="Join()">Join room</button>
      <br />
    </body>
  </div>
</template>

<script>
import { inject } from "vue";
import computed from "vue";

export default {
  name: "joinroom",
  setup() {
    const store = inject("store");
    const { roomName } = store();

    setRoomName = (event) => {
      setRoomName();
    };

    return {
      roomName,
      getRoomName: () => store.commit(""),
    };
  },
  methods: {
    Join() {
      setRoomName();
      //conect websocket
      this.chatSocket = new WebSocket(
        "ws://localhost:8000/wstest/" + this.roomName + "/"
      );
      this.chatSocket.onopen = (event) => {
        console.log("websocket opened!");
        console.log(event);
      };

      //change window location
      window.location.assign(`http://localhost:8080/room/${this.roomName}`);
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
