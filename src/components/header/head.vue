<template>
    <header class="bar bar-nav">
        <a class="icon fa fa-bars pull-left" v-if="menu" aria-hidden="true" @click="showSideMenu"></a>
        <a class="icon fa fa-chevron-left pull-left" v-if="back" @click="goBack"></a>
        <h1 class="title">{{ title }}</h1>
        <a class="icon fa fa-refresh pull-right" v-if="refesh" @click="refresh"></a>
        <router-link class="icon fa fa-search pull-right" v-if="search" to="search"></router-link>
    </header>
</template>

<script>
export default{
    props: ['refesh', 'back', 'menu', 'search', 'title'],
    methods: {
        refresh: function () {
            // this.$store.dispatch('getData', {
            //     progress: this,
            //     refresh: true
            // });
        },
        goBack: function () {
            this.$router.back();
        },
        showSideMenu: function() {
            
        }
    }
}   
</script>