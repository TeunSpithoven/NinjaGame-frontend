<template>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Chat Room</title>
    </head>
    <body>
      <textarea id="chat-log" cols="100" rows="20"></textarea><br />
      <input v-bind="this.message" type="text" size="100" placeholder="roomname"/><br />
      <input v-on:click="SendChatMessage(this.message)" type="button" />
      {{ this.roomName }}
    </body>
  </html>
</template>

<script>
import joinroom from './joinroom.vue'

export default {
  name: "room",
  props: {
      roomName: joinroom.props.roomName,
  },
  data() {
    return {
    //  roomName: String,
      message: String,
      chatSocket: undefined,
      messages: [],
    };
  },
  
  mounted: {
    Connect() {
      this.chatSocket = new WebSocket(
        "ws://localhost:8000/wstest/" + this.roomName + "/"
      );
      this.chatSocket.onopen = (event) => {
          console.log('websocket opened!');
          console.log(event);
      }
    },
    Recieve() {
      this.chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.messages += data.message;
        // document.querySelector("#chat-log").value += data.message + "\n";
      };
    },
  },

  methods: {
    SendChatMessage(message) {
        this.chatSocket.send(
          JSON.stringify({
            message: message,
          })
        );
        this.message = '';
    },
    Disconnect() {
      this.chatSocket.onclose = (event) => {
        console.error("Chat socket closed" + event.error);
      };
    },
  },
};
</script>
