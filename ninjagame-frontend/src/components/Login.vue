<template>
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <br />
    <input v-model="username" placeholder="username" type="text" />
    <br />
    <label for="psw"><b>Password</b></label>
    <br />
    <input v-model="password" placeholder="password" type="password" />

    <button v-on:click="login(username, password)">Login</button>
    <br>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login(username, password) {
      if (username != '' && password != '') {
        if (username == "teun" && password == "teun") {
          this.$emit('success', true);
        } else {
          console.log('login.vue - error: wrong username or password...');
        }
      }
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
