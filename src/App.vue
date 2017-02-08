<template>
    <div id="app">
        <img src="./assets/logo.png">
        <h1>{{ msg }}</h1>
        <mt-button @click.native="handleClick">Let's do it</mt-button>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        handleClick: function() {
            this.$toast('Hello world!')
        }
    }
}
</script>
