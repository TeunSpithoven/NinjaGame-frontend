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
    register(username, password) {
      if (username != "" && password.length > 7) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
            password2: password,
            email: `${username}@${username}.com`,
            first_name: "",
            last_name: "",
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
        if (password.length < 8) {
          alert("your password should be at least 8 characters in length");
        }
      }
    },
  },
};
</script>

<style></style>
