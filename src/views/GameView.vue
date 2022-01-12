<template>
  <div 
    id='gameContainer'
    v-if="getToken() !== null"
  >
    <button @click="logout()">Logout</button>
    <Join 
        v-if="this.connection == null"
        @update-connection="UpdateConnection()"
    />
    <Game 
        v-if="this.connection != null"
        @leave="Leave()"
    />
  </div>
</template>

<script>
import Join from '../components/Game/Join.vue';
import Game from '../components/Game/Game.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'GameView',
  components: {
    Join,
    Game,
  },
  computed: {
    ...mapGetters([
      'getAccessToken',
    ]),
    ...mapActions({
      refresh: 'refresh',
    }),
  },
  data() {
    return {
      connection: null,
    };
  },
  methods: {
    getToken(){
      return this.getAccessToken;
    },
    logout(){
      this.$store.dispatch('logout');
    },
    UpdateConnection(e) {
      this.connection = e;
    },
    Leave(){
      this.connection = null;
    },
  },
};
</script>

<style></style>
