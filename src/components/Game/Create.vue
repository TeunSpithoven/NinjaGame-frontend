<template>
    <div id="CreateGameContainer">
        <label for="username"><b>username</b></label>
        <br>
        <input id="usernameInput" v-model="username" placeholder="username" type="text" />
        <br>
        <label for="score">Score</label>
        <br>
        <input id="scoreInput" v-model="score" placeholder="128" type="number">
        <br>
        <button id="submitCreate" @click="Submit()">Create<p v-if="this.loading"> Loading...</p></button>
        <h3>{{ message }}</h3>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CreateGame',
    data() {
        return{
            username: null,
            score: null,
            start_datetime: '2019-12-10 14:43:35.542195',
            end_datetime: '2019-12-10 14:43:35.542195',
            message: '',
            error: '',
            loading: '',
        };
    },
    computed: {
        ...mapGetters([
            'getToken',
            'getRefresh',
        ]),
    },
    methods: {
        Submit() {
            console.log('this.getToken before creating game:');
            console.log(this.getToken);
            this.loading = true;
            this.error = '';
            const requestOptions = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${this.getToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.username,
                score: this.score,
                start_datetime: this.start_datetime,
                end_datetime: this.end_datetime,
            }),
            };

            fetch("https://ninjagamebackend.azurewebsites.net/games/", requestOptions)
            .then((response) => {
                this.loading = false;
                if(response.status === 401) {
                    this.message = 'unauthorized'
                    //HIER DE TOKEN REFRESHEN
                } else if(response.status === 201) {
                    this.message = 'game created successfully'
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
        },
    },
}
</script>

<style scoped>
button {
    width: 20vw;
}
input {
    width: 20vw;
}
</style>
