<template>
    <div class="free-container">
        <v-head :title="title"></v-head>
        <section>
            <v-title :title="free.one?free.one.ad_name : ''"></v-title>
            <div>
                <v-blockthree :prop="freeOne"></v-blockthree>
            </div>
            <div class="clear-line"></div>
        </section>
        <section v-for="(item,index) in free.two" :key="index">
            <v-title :title="item.ad_name"></v-title>
            <div class="container-inner" v-for="(book,l) in item.data.data" :key="l">
                <v-blockone :prop="book.data"></v-blockone>
            </div>
            <!--<v-more
            @onemore="onemore(item.reference_id)"
            ></v-more>-->
            <div class="clear-line"></div>
        </section>
    </div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
import bookTitle from '@/components/common/bookTitle'
import bookMore from '@/components/common/bookMore'
import boxBlockOne from '@/components/bookblock/boxBlockOne'
import boxBlockThree from '@/components/bookblock/boxBlockThree'
import { getfree } from '@/servers/server'
import { setGroup } from '@/assets/utils'

export default {
    components: {
        //标题
        "v-title": bookTitle,
        //更多
        "v-more": bookMore,
        //抬头
        "v-head": bookHead,
        //书块one
        "v-blockone": boxBlockOne,
        //书块three
        "v-blockthree": boxBlockThree,
    },
    data() {
        return {
            title: "",
            free: {},
            scrollStart: false
        }
    },
    computed: {
        freeOne() {
            let res = this.free.one || {};
            if (res.data) {
                return res.data.data.map(o => o.data)
            }
            return []
        }
    },
    methods: {
        onemore(id) {
            this.$router.push({ path: '/scrollmore/' + id })
        }
    },
    mounted() {
        getfree()
            .then(res => {
                this.title = JSON.parse(res.data.hidden_info).title;
                const arrlen = res.data.items.length;
                console.log(arrlen);
                let freeBook = setGroup(res.data.items, 1, arrlen-1);
                this.free = {
                    one: freeBook[0][0],
                    two: freeBook[1]
                }
            })
    }
}
</script>
<style lang="less">

</style>
