<template>
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <br />
    <input id="usernameInput" v-model="username" placeholder="username" type="text" />
    <br />
    <label for="psw"><b>Password</b></label>
    <br />
    <input id="passwordInput" v-model="password" placeholder="password" type="password" />

    <button v-on:click="register()">Register<p v-if="this.loading"> Loading...</p></button>
    <br />
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: '',
      password: '',
      message: '',
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
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

        fetch("https://ninjagamebackend.azurewebsites.net/auth/register/", requestOptions)
          .then((response) => {
            this.loading = false;
            if (!response.ok) {
              if(response.status === 400) {
                this.message = 'The given username is already in use';
              }
              throw response;
            }
            if (response.status === 201) {
              this.message = `Account created!, redirecting to login...`;
              setTimeout(() => this.$router.push('/Login'), 2000);
            }
            console.log(response);
            return response.json();
          })
          .catch(function() {
            // console.log("error");
          });
      } else {
        if (this.password.length < 8) {
          alert("your password should be at least 8 characters in length");
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style></style>
