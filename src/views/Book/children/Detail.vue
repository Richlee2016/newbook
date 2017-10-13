<template>
    <div class="detail-container">
        <transition name="detail">
            <div>
                <v-head :title="container.item.title"></v-head>
                <div class="detail-descr">
                    <div class="left">
                        <img :src="container.item.cover" alt="">
                    </div>
                    <div class="right">
                        <h3>{{container.item.title}}</h3>
                        <label>{{container.item.authors}}</label>
                        <span>价格:{{container.item.price}}书币/千字</span>
                        <span>字数:{{Math.ceil(container.item.word_count/10000)}}万字</span>
                    </div>
                </div>
                <div class="detail-btn">
                    <div class="start-read">
                        <a @click="startRead">{{isRead === 0?`开始阅读`:`继续阅读第${isRead}章`}}</a>
                    </div>
                    <div class="download">
                        <span @click="bookFree({name:container.item.title,author:container.item.authors})">历史记录</span>
                    </div>
                </div>
                <p class="detail-box">{{container.item.content}}</p>
                <p class="detail-book-title">
                    <router-link :to="{path:`/detail/${$route.params.id}/chapter/`}">最新:{{container.item.latest}}</router-link>
                </p>
                <v-detailtitle :title="'类别标签'" :fontSize=16>
                    <slot>
                        <span class="detail-label" v-for="(item,index) in container.item.categories" :style="{background:labelBd[index]}" :key="index">
                            <a @click="categoryLink(item)">
                                {{item.label}}
                            </a>
                        </span>
                    </slot>
                </v-detailtitle>

                <v-detailtitle :title="'作者其他书'" :fontSize=16 v-if="detail.author_books?detail.author_books.length>0:false">
                    <slot>
                        <v-blockthree :prop="detail.author_books"></v-blockthree>
                    </slot>
                </v-detailtitle>

                <v-detailtitle :title="'图书信息'" :fontSize=16>
                    <slot>
                        <p class="info">{{container.item.rights}}</p>
                    </slot>
                </v-detailtitle>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import bookHead from '@/components/common/bookHead'
import detailTitle from '@/components/common/detailTitle'
import boxBlockThree from '@/components/bookblock/boxBlockThree'
import { detail } from '@/servers/server'
export default {
    data() {
        return {
            labelBd: ['#fbebe8', '#fcedda', '#e8f9db'],
            idchange: "",
            detailFade: false
        }
    },
    components: {
        //抬头
        "v-head": bookHead,
        //书块 three
        "v-blockthree": boxBlockThree,
        //标题模块
        "v-detailtitle": detailTitle
    },
    computed: {
        // state分发
        ...mapState({
            detail: 'book',
            historyRead: 'historyRead'
        }),
        // 是否历史阅读
        isRead() {
            const read = this.historyRead.find(o => o.id === this.$route.params.id);
            return read ? read.chapter : 0;
        },
        // 详情数据
        container() {
            var res = this.detail;
            if (res.item) {
                return {
                    comment: res.comment,
                    item: res.item
                };
            };
            return {
                comment: {},
                item: {}
            };
        }
    },
    methods: {
        // actions 分发
        ...mapActions({
            // 获取数据
            getData: 'bookDetail',
            // 文章加载
            bookRead: 'bookRead',
            // 免费阅读加载
            bookFree:'bookFree'
        }),
        // 类别跳转
        categoryLink(data) {
            const reg = /\d00000/;
            if (data.category_id >= 1000000 && reg.test(data.category_id)) {
                this.$router.push({ path: '/categoryfiction/' + data.category_id });
            } else {
                this.$router.push({ path: '/categoryfiction/' + encodeURI(data.label) });
            };
        },
        // 开始阅读
        startRead() {
            console.log(this.isRead);
            this.$store.commit('BOOK_START', {
                id: this.$route.params.id,
                chapter: this.isRead,
                fn: () => {
                    this.$router.push({ path: `/detail/${this.$route.params.id}/book` });
                }
            })
        }
    },
    // 监听路由变化
    watch: {
        "$route"(to, from) {
            const id = this.$route.params.id;
            if (id && id.length < 7 && id.length >= 5) {
                this.getData({
                    id: this.$route.params.id, fn: () => {
                        this.$overLoad();
                    }
                });
            };
        }
    },
    // 初始化数据
    mounted() {
        this.getData({
            id: this.$route.params.id, fn: () => {
                this.$overLoad();
            }
        });
    }
}
</script>
<style lang="less">
.detail-enter-active,
.detail-leave-active {
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
}

.detail-enter,
.detail-leave-active {
    opacity: 0;
}

.detail-descr {
    display: -webkit-flex;
    display: flex;
    margin-top: 30px;
    >div {
        flex: 1;
        text-align: center;
        img {
            width: 95px;
            height: 125px;
        }
    }
    .right {
        text-align: left;
        h3 {
            line-height: 30px;
            font-size: 16px;
        }
        label {
            line-height: 24px;
            font-size: 12px;
            color: #4b99a7;
        }
        span {
            display: block;
            line-height: 24px;
            font-size: 14px;
            color: #727272;
        }
    }
}

.detail-btn {
    display: -webkit-flex;
    display: flex;
    margin-top: 20px;
    >div {
        flex: 1;
        text-align: center;
        span,
        a {
            display: inline-block;
            width: 90%;
            height: 36px;
            line-height: 36px;
        }
    }
    .start-read {
        a {
            background: #f35d02;
            color: white;
            border-radius: 6px;
            border: #f35d02 1px solid;
        }
    }
    .download {
        span {
            border-radius: 6px;
            border: #ddd 1px solid;
        }
    }
}

.detail-box {
    margin: 10px 20px;
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.detail-book-title {
    border-top: #DDDDDD 1px solid;
    text-align: center;
    line-height: 40px;
    color: #666666;
}

.detail-label {
    display: inline-block;
    padding: 5px 10px;
    border: #ddd 1px solid;
    border-radius: 4px;
    margin-left: 10px;
    margin-bottom: 10px;
}

.more-like {
    h3 {
        line-height: 30px;
        color: #999;
        font-size: 14px;
        padding: 0 20px;
    }
}

.info {
    line-height: 20px;
    padding: 0 20px;
    color: #999999;
    font-size: 14px;
}
</style>
