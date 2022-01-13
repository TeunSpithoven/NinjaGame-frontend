<template>
  <div class="container">
    <label for="username"><b>username</b></label>
    <br />
    <input id="usernameInput" v-model="username" placeholder="username" type="text" />
    <br />
    <label for="password"><b>password</b></label>
    <br />
    <input id="passwordInput" v-model="password" placeholder="password" type="password" />

    <button v-on:click="login()">Login</button>
    <br>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      error: 'initialError',
    };
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getRefresh',
    ]),
    ...mapActions([
      'SET_token',
      'SET_refresh',
    ]),
  },
  methods: {
    // here should be a rest call with the backend server for logging in
    login() {
      this.error = '';
      if (this.username != "" && this.password.length > 7) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        };

        fetch("http://127.0.0.1:8000/auth/token/", requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then(data => {
            this.$store.commit('SET_token', data.access);
            this.$store.commit('SET_refresh', data.refresh);
            console.log(`token after login: ${this.getToken}`);
            console.log(`refresh after login: ${this.getRefresh}`);
            this.$emit('success', true);
          })
          .catch((error) => {
            console.error('Error:', error);
            this.error = error;
            this.$emit('success', false);
          });
      } else {
        if (this.password.length < 8 || this.password.length <= 0) {
          this.error = 'Did you enter the right password?';
          alert(this.error);
        }
        if (this.username == ''){
          this.error = 'Did you enter the right username?';
          alert(this.error);
        }
        this.$emit('success', false);
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
