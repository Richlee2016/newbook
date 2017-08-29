<template>
    <div class="container-three">
        <v-head :title="'精选书单'"></v-head>
        <section v-for="(item,index) in list" :key="index">
            <v-blockfive :prop="item"></v-blockfive>
        </section>
        <!--下拉加载  -->
        <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="circles"></infinite-loading>
    </div>
</template>

<script>
import { chineseReg } from '@/assets/utils'
import bookHead from '@/components/common/bookHead'
import bookMore from '@/components/common/bookMore'
import boxBlockFive from '@/components/bookblock/boxBlockFive'
import InfiniteLoading from 'vue-infinite-loading';
import { persistent } from '@/servers/server'
export default {
    components: {
        //抬头
        "v-head": bookHead,
        //书块one
        "v-blockfive": boxBlockFive,
        InfiniteLoading,
    },
    data() {
        return {
            container: {},
            list:[]
        }
    },
    computed: {

    },
    methods: {
        onInfinite() {
            let count = 4;
            let start = this.list.length;
            start = start === 0 ? 0 : start + count;
            persistent(start, count, 4)
                .then(res => {
                    this.list = this.list.concat(res.data.items);
                    if (res.data.items<=0) {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    } else {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    };
                });
        }
    },
    activated() {
        this.$overLoad(200);
    }
}
</script>