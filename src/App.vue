<template>
    <div id="app">
        <m-head :menu="true" :refesh="false" :back="false" title="Music Player"></m-head>

        <div class="main" :class="{'header-fixed' : headerFixed}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

        <player></player>

        <div class="side-menu">
            <div class="menu-list">
                <div class="menu-header">
                    <img :src="sideMenuImg">
                </div>
            </div>
        </div>
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
            sideMenuImg: ''
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
