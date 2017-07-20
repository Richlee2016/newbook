<template>
    <div class="container-three">
        <v-head :title="'精选书单'"></v-head>
        <section v-for="(item,index) in container.items" :key="index">
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
    },
    data() {
        return {
            container: {},
        }
    },
    computed: {

    },
    methods: {
        async inLoading() {
            // if (this.isLoad) {
            //     this.isLoad = false;
            //     let res;
            //     try {
            //         res = await persistent(this.start, this.count, 4);
            //     } catch (error) {
            //         console.log(error);
            //     }
            //     if (Object.keys(this.container).length === 0) {
            //         this.container = res.data;
            //     } else {
            //         this.container.items = this.container.items.concat(res.data.items);
            //     };
            //     this.start += this.count;
            //     if (res.data.items.length === this.count) {
            //         this.isLoad = true;
            //     } else {
            //         this.overLoad = false;
            //         this.isLoad = false;
            //     };
            //     this.$overLoad();
            // };
        },
        onInfinite() {
            let count = 4;
            let start = this.container.items.length;
            start = start === 0 ? 0 : start + count;
            persistent(start, count, 4)
                .then(res => {
                    this.container.items = this.container.items.concat(res.data.items);
                    if (res.data.count === 0) {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    } else {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    };
                });
        }
    },
    mounted() {
        // persistent(this.$route.query.start,this.$route.query.count,this.$route.query.type)
        // .then( res => {
        // 	this.container = res.data;
        // 	return Promise.resolve();
        // })
        // .then(() => {
        // 	this.$overLoad();
        // })
        // .catch( err => {
        // 	console.log(err)
        // })		
    }
}
</script>