<template>
    <div id="statsContainer">
        <button @click="getGames()">Update</button>
        <ul>
            <li v-for="item in this.games" :key="item.score">
                {{ item.score }}, {{ item.user }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Stats',
    data() {
        return {
            games: [
                { score: 10, user: 'huts' },
                { score: 1044, user: 'huvsvsts' },
            ],
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

                fetch("http://127.0.0.1:8000/games/", requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        this.refresh();
                        throw response;
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
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

                fetch("http://127.0.0.1:8000/auth/token/refresh/", requestOptions)
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
#button {
    width: 20vw;
}
</style>
