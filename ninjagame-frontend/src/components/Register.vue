<template>
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <br />
    <input v-model="username" placeholder="username" type="text" />
    <br />
    <label for="psw"><b>Password</b></label>
    <br />
    <input v-model="password" placeholder="password" type="password" />

    <button v-on:click="register(username, password)">Register</button>
    <br>
  </div>
</template>

<script>
export default {
  name: "Register",
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

</style>