<template>
    <div>
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item id="1">歌手</mt-tab-item>
            <mt-tab-item id="2">歌单</mt-tab-item>
            <mt-tab-item id="3">电台</mt-tab-item>
            <mt-tab-item id="4">MV</mt-tab-item>
            <mt-tab-item id="5">排行</mt-tab-item>
        </mt-navbar>


        <mt-tab-container v-model="selected" fixed>
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :title="'内容 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'电台 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <mt-cell v-for="n in 6" :title="'排行 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <mt-cell v-for="n in 6" :title="'排行 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    name: 'page-index',
    data () {
        return {
            selected: '1'
        }
    },
    methods: {
        handleClick: function() {
            this.$toast('Hello world!')
        }
    }
}
</script>