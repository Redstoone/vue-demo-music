<template>
    <header class="bar bar-nav">
        <a class="icon fa fa-chevron-left pull-left" v-if="returnIcon" @click="goBack"></a>
        <h1 class="title">{{ title }}</h1>
        <a class="icon fa fa-refresh pull-right" v-if="refeshIcon" @click="refresh"></a>
    </header>
</template>

<script>
export default{
    props: ['refeshIcon', 'returnIcon', 'title'],
    methods: {
        refresh: function () {
            // this.$store.dispatch('getData', {
            //     progress: this,
            //     refresh: true
            // });
        },
        goBack: function () {
            this.$router.back();
        }
    }
}   
</script>