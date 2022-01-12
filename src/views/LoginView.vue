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
  data() {
    return {
      token: null,
    };
  },
  methods: {
    Login_Success(value) {
      if(value){
        value = '';
        // eslint-disable-next-line
        // console.log('login.vue - login succesful');
      }else{
        value = '';
        // eslint-disable-next-line
        // console.log('login.vue - login failed');
      }
    },
  },
};
</script>

<style></style>
