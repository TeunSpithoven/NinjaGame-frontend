<template>
  <Login @success="Login_Success" />
</template>

<script>
import Login from "../components/Login.vue";

export default {
  name: 'LoginView',
  components: {
    Login,
  },
  methods: {
    Login_Success(value) {
      if(value){
        // eslint-disable-next-line
        // console.log('login.vue - login succesful');
      }else{
        // eslint-disable-next-line
        // console.log('login.vue - login failed');
      }
    },
  },
};
</script>

<style></style>
