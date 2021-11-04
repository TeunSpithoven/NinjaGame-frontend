<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-6 is-offset-3 mb-6">
        <section class="hero is-primary">
          <div class="hero-body">
            <p class="title">
              Chatty
            </p>
            <p class="subtitle">
              A simple chat built with Django, Channels and Redis
            </p>
          </div>
        </section>
      </div>

      <div class="column is-6 is-offset-3">
        <div class="box">
          <div
            id="chat-messages"
            style="max-height: 300px; overflow-y: scroll;"
          >
            {% for m in messages %}<b>{{ m.username }}</b
            >: {{ m.content }}<br />{% endfor %}
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Message"
              id="chat-message-input"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <a class="button is-info" id="chat-message-submit">Submit</a>
          </div>
        </div>

        <small class="has-text-grey-light">Your username: {{ username }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chatroom",
  props: {
    username: String,
    roomname: String,
  },
  data() {
    return {
        messages: [],
    };
  },
  methods: {},
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
