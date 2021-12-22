<template>
  <div id='gameContainer'>
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

export default {
  name: 'GameView',
  components: {
    Join,
    Game,
  },
  data() {
    return {
      connection: null,
    };
  },
  methods: {
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
