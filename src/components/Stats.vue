<template>
    <div id="statsContainer">
        <button @click="this.showCreate = !this.showCreate">Create Game</button>
        <Create v-if="this.showCreate"/>
        <button @click="getGames()">Update</button>
        <h3 v-if="this.games.count > 1"> There aren't any games in the database. </h3>
        <ul>
            <li v-for="item in this.games" :key="item.score">
                {{ item.score }}, {{ item.user }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Create from './Game/Create.vue'

export default {
    name: 'Stats',
    components: {
        Create,
    },
    data() {
        return {
            games: [],
            showCreate: false,
        };
    },
    computed: {
        ...mapGetters([
            'getToken',
            'getRefresh'
        ]),
    },
    mounted() {
        console.log(`this.getToken: ${this.getToken}`);
        if(this.getToken === null || this.getToken === 'testtoken') {
            console.log('no token found, redirecting to login');
        }
    },
    methods: {
        getGames() {
            if(this.getToken !== null){
                const requestOptions = {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${this.getToken}`,
                        "Content-Type": "application/json"
                    },
                };

                fetch("https://ninjagamebackend.azurewebsites.net/games/", requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        this.refresh();
                        throw response;
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.results);
                    this.games = data.results;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.error = error;
                });
            }
        },
        refresh() {
            if (this.getRefresh !== '') {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        refresh: this.getRefresh,
                    }),
                };

                fetch("https://ninjagamebackend.azurewebsites.net/auth/token/refresh/", requestOptions)
                .then((response) => {
                    if (!response.ok) {
                    throw response;
                    }
                    return response.json();
                })
                .then(data => {
                    this.$store.commit('SET_token', data.access);
                    console.log(`token after login: ${this.getToken}`)
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.error = error;
                });
            }
        },
    },
}
</script>

<style scoped>
#statsContainer {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30vh;
  width: 40em;
  padding: 15px;
}

#button {
    width: 20vw;
}
</style>
