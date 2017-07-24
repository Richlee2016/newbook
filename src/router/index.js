import Vue from 'vue'
import Router from 'vue-router'
//前进 返回 判断 设置
Router.prototype.isBack = false;
Router.prototype.goback = function() {
    this.isBack = true;
    this.go(-1);
};
Vue.use(Router)

const Index = r => require.ensure([], () => r(require('@/views/Index/Index')), 'index');
const Search = r => require.ensure([], () => r(require('@/views/Search/Search')), 'search');
const Banner = r => require.ensure([], () => r(require('@/views/Banner/Banner')), 'banner');
const Free = r => require.ensure([], () => r(require('@/views/Free/Free')), 'free');
const Channel = r => require.ensure([], () => r(require('@/views/Channel/Channel')), 'channel');
const Category = r => require.ensure([], () => r(require('@/views/Category/Category')), 'category');
const CategoryFiction = r => require.ensure([], () => r(require('@/views/Category/children/Fiction')), 'categoryFiction');
const Ranks = r => require.ensure([], () => r(require('@/views/Ranks/Ranks')), 'ranks');
const RanksFiction = r => require.ensure([], () => r(require('@/views/Ranks/children/Fiction')), 'ranksFiction');
const ContainerOne = r => require.ensure([], () => r(require('@/views/Container/One')), 'containerOne');
const ContainerThree = r => require.ensure([], () => r(require('@/views/Container/Three')), 'containerThree');
const ContainerFour = r => require.ensure([], () => r(require('@/views/Container/Four')), 'containerFour');
const BookIndex = r => require.ensure([], () => r(require('@/views/Book/Index')), 'bookIndex');
const Detail = r => require.ensure([], () => r(require('@/views/Book/children/Detail')), 'detail');
const Book = r => require.ensure([], () => r(require('@/views/Book/children/Book')), 'book');
const Chapter = r => require.ensure([], () => r(require('@/views/Book/children/Chapter')), 'chapter');
export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        }, //首页
        {
            path: '/search',
            name: 'Search',
            component: Search
        }, //搜索页面 
        {
            path: '/banner/:id',
            name: 'Banner',
            component: Banner
        }, //Banner图进入页面
        {
            path: '/free',
            name: 'Free',
            component: Free
        }, //免费 
        {
            path: '/channel/:id',
            name: 'Channel',
            component: Channel
        }, //男女最爱
        {
            path: '/category',
            name: 'Category',
            component: Category,
        }, //分类
        {
            path: '/categoryfiction/:id',
            name: 'CategoryFiction',
            component: CategoryFiction
        }, //分类详情页
        {
            path: '/ranks',
            name: 'Ranks',
            component: Ranks
        }, //排行
        {
            path: '/ranksfiction/:id',
            name: 'RanksFiction',
            component: RanksFiction
        }, //排行详情页
        {
            path: '/containerone/:id',
            name: 'ContainerOne',
            component: ContainerOne
        }, //'更多' 页面1
        {
            path: '/containerthree',
            name: 'ContainerThree',
            component: ContainerThree
        }, //'更多' 页面3
        {
            path: '/containerfour',
            name: 'ContainerFour',
            component: ContainerFour
        }, //'更多' 页面4
        {
            path: '/detail/:id',
            name: 'BookIndex',
            component: BookIndex,
            children: [{
                path: '',
                name: 'Detail',
                component: Detail,
            }, {
                path: 'book',
                name: 'Book',
                component: Book,
            }, {
                path: 'chapter',
                name: 'Chapter',
                component: Chapter,
            }, ]
        }, //阅读器
    ]
})