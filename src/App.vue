<template>
    <div id="app">
        <m-head :refesh-icon="false" :return-icon="false" title="Music Player"></m-head>
        <div class="main" :class="{'header-fixed' : headerFixed}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <player></player>
    </div>
</template>

<script>
import mHead from './components/header/head.vue'
import player from './components/player.vue'

export default {
    name: 'app',
    data () {
        return {
            headerFixed: true,
        }
    },
    components: {
        mHead,
        player,
    }
}
</script>

<style lang="scss">
    @import "./assets/style";
</style>
