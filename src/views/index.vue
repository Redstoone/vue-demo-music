<template>
    <div>
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item v-for="item in navList" :id="item.id">{{ item.nav }}</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" fixed>
            <mt-tab-container-item v-for="item in navList" :id="item.id">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    name: 'page-index',
    data() {
        return {
            navList: [
                { id: 1, nav: '歌手'},
                { id: 2, nav: '歌单' },
                { id: 3, nav: '电台' },
                { id: 4, nav: 'MV' },
                { id: 5, nav: '排行' },
            ],
            selected: '1',
        }
    },
    created() {
        this.init()
    },
    methods: {
        init: function(params = {}) {
            let _this = this

            _this.$api.getList()
        },

        handleClick: function() {
            this.$toast('Hello world!')
        }
    }
}
</script>