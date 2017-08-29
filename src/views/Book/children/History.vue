<template>
    <div class="history-container">
        
    </div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
export default {
    data() {
        return {
            
        }
    },
    components: {
        "v-head": bookHead,
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
