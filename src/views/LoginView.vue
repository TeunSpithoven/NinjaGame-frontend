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
    };
  },
};
</script>

<style></style>
