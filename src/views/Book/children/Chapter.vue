<template>
    <div class="chapter-container">
        <v-head :title="label"></v-head>
        <ul class="chapter-box">
            <li v-for="(item,index) in chapter" @click="read(item)" :key="index">
                <label>{{item.title}}</label>
                <span class="isfree" v-show="Number(item.price) === 0">免费</span>
            </li>
        </ul>
    </div>
</template>

<script>
import bookHead from '@/components/common/bookHead'
import { freeChapter, chapterCatalogue } from '@/servers/server'
export default {
    data() {
        return {
            label: "",
            chapter: []
        }
    },
    components: {
        "v-head": bookHead,
    },
    watch :{
		'$route' (to, from){
            console.log(0);
            this.$overOut();
            this._getChapterCatalogue();
		}
	},
    methods: {
        _getChapterCatalogue() {
            chapterCatalogue(this.$route.params.id)
                .then(res => {
                    this.label = res.data.item.title;
                    this.chapter = res.data.item.toc;
                    let freeChapter = this.chapter.filter(o => {
                        return o.free;
                    }).map(o => {
                        return o.chapter_id;
                    })
                    this.$overLoad();
                })
        },
        read(item) {
            if(item.price === 0){
                this.$store.commit('BOOK_START',{
                    id: this.$route.params.id, 
                    chapter: item.chapter_id, 
                    fn: () => {
                        this.$router.push({ path: `/detail/${this.$route.params.id}/book` });
                    }
                })
            }else{
                this.$router.push({ path: `/detail/${this.$route.params.id}/history` });
            };
        }
    },
    created(){
        this.$overOut();
        this._getChapterCatalogue();
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
