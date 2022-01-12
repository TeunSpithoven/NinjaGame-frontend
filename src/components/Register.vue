<template>
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <br />
    <input id="usernameInput" v-model="username" placeholder="username" type="text" />
    <br />
    <label for="psw"><b>Password</b></label>
    <br />
    <input id="passwordInput" v-model="password" placeholder="password" type="password" />

    <button v-on:click="register()">Register</button>
    <br />
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
    register() {
      if (this.username != "" && this.password.length > 7) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            password2: this.password,
          }),
        };

        fetch("http://127.0.0.1:8000/auth/register/", requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .catch(function() {
            // console.log("error");
          });
      } else {
        if (this.password.length < 8) {
          alert("your password should be at least 8 characters in length");
        }
      }
    },
  },
};
</script>

<style></style>
