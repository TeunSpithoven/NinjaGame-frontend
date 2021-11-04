<template>
  <div class="container">
    <label for="username"><b>Username</b></label>
    <br />
    <input v-model="username" placeholder="username" type="text" />
    <br />
    <label for="roomname"><b>RoomName</b></label>
    <br />
    <input v-model="roomname" placeholder="roomname" type="text" />
    <br />
    <router-link to="./Chatroom.vue">
        <button v-on:click="join(username, roomname)">Connect</button>
    </router-link>
    <br>
  </div>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      username: "",
      roomname: "",
    };
  },
  methods: {
    join(username, roomname) {
      if (username != "" && roomname!= "") {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            roomname: roomname,
          }),
        };

        fetch(`http://127.0.0.1:8000/${roomname}/?username=${username}`, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        alert("did you fill in a username and roomname?");
      }
    },
    connect(roomname) {
      if (roomname!= "") {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomname: roomname,
          }),
        };

        fetch(`ws://127.0.0.1:8000/ws/${roomname}/`, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        alert("error: no room name entered");
      }
    },
  },
};
</script>

<style>
.container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30vh;
    width: 17em;
    padding: 15px;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #b95216;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}
</style>
