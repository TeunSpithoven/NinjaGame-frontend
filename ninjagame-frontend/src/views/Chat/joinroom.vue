<template>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Chat Rooms</title>
    </head>
    <body>
      What chat room would you like to enter?<br />
      <input v-bind="this.roomName" type="text" size="100" /><br />
      <button type="button" value="Enter">
        <router-link v-bind:to="route">Go To Room</router-link>
      </button>
    </body>
  </html>
</template>

<script>
export default {
  name: "joinroom",
  props: {
      roomName: String,
  },
  data() {
      return {
          route: `room/${this.roomName}`
      };
  }
};
</script>
