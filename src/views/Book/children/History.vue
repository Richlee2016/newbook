<template>
    <div class="book-box">
        <v-reader></v-reader>
    </div>
</template>

<script>
import Reader from '../component/reader.vue'
export default {
    data() {
        return {
            
        }
    },
    components: {
        "v-reader": Reader,
    },
    methods: {
        
    },
    mounted() {
       this.$overLoad();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.chapter-box {
    width: 100%;
    li {
        line-height: 40px;
        padding: 0 20px;
        border-top: #efeff0 1px solid;
        .isfree {
            float: right;
            color: #6cb378;
        }
    }
}
</style>
