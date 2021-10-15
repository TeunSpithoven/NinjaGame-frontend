<template>
  <Login @success="onSuccesLogin" />
</template>

<script>
import Login from "../components/Login.vue";
export default {
  components: {
    Login,
  },
  methods: {
    onSuccesLogin(value) {
      if(value){
        console.log('login.vue - login succesful');
      }else{
        console.log('login.vue - login failed');
      }
    },
  },
};
</script>

<style></style>
