<template>
  <div class="container">
    <h1>This is the game page!</h1>
    <h3>Your username: {{ this.username }}</h3>
    <h3>The name of this game: {{ this.gamename }}</h3>
    <button @click="this.$emit('leave')">Leave Game</button>
  </div>
</template>

<script>
export default {
  name: "Game",
  props: {
    username: String,
    gamename: String,
  },
  data() {
    return {
      connection: null,
      messages: [],
    };
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

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

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

button:hover {
  opacity: 0.8;
}
</style>
