<template>
    <div class="container-one">
        <v-head :title="label"></v-head>
        <section>
            <div class="container-inner" v-for="(item,index) in allbooks" :key="index">
                <v-blockone :prop="item"></v-blockone>
            </div>
        </section>
        <!--下拉加载  -->
        <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="circles"></infinite-loading>
    </div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
import boxBlockOne from '@/components/bookblock/boxBlockOne'
import InfiniteLoading from 'vue-infinite-loading';
import { morefiction } from '@/servers/server'
export default {
    components: {
        "v-head": bookHead,
        //书块one
        "v-blockone": boxBlockOne,
        InfiniteLoading
    },
    data() {
        return {
            label: "",
            allbooks: [],
        }
    },
    methods: {
        morecate() {
            this.$router.push({ path: '/containerthree', query: { start: 0, count: 10, type: 4 } })
        },
        onInfinite() {
            let count = 4;
            let start = this.allbooks.length;
            start = start === 0 ? 0 : start + count;
            morefiction(this.$route.params.id, start, count)
                .then(res => {
                    this.label = res.data.label;
                    this.allbooks = this.allbooks.concat(res.data.items);
                    if (res.data.count === 0) {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    } else {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    };
                });
        }
    }
}
</script>