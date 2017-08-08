import rxios from './rxios'

const index = () => rxios('GET', '/hs/v3/channel/418');
const pull = (start, count) => rxios('POST', '/rock/book/recommend', { start, count });
const searchpage = () => rxios('GET', '/api/searchpage');
const search = (start, count, s) => rxios('GET', 'store/v0/lib/query/onebox', { start, count, s, source: '2,5' });
const banner = (id) => rxios('GET', '/store/v0/fiction/list/' + id);
const getfree = (id) => rxios('GET', '/api/free');
const getmore = (id) => rxios('GET', '/hs/v3/channel/' + id);
const category = () => rxios('GET', '/hs/v0/android/store/category');
const categoryFiction = (id, start, count, type = 'click') => rxios('GET', `/store/v0/fiction/category/${id}?start=${start}&count=${count}&${type}=1`);
const categoryTitle = (id) => rxios('GET', '/hs/v0/android/fiction/category/' + id);
const categoryTag = (name, start, count, type = 'click') => rxios('GET', `/store/v0/fiction/tag?start=${start}&tag_name=${name}&count=${count}&${type}=1`)
const ranks = () => rxios('GET', '/store/v0/ad/ranks');
const ranksFiction = (start, count, r) => rxios('GET', '/store/v0/fiction/rank', { start, count, r });
const morefiction = (id, start, count) => rxios('GET', '/store/v0/fiction/list/' + id, { start, count });
const persistent = (start, count, type) => rxios('GET', '/store/v0/ad/persistent', { start, count, type });
const detail = (id) => rxios('GET', '/hs/v0/android/fiction/book/' + id);
const read = (id, chapter) => rxios('POST', '/book/read', { id, chapter });
const freeChapter = (id) => rxios('GET', '/api/chapter/' + id);
const freeRead = (id) => rxios('GET', '/api/read/' + id);
const freeSearch = (name) => rxios('POST', '/api/freeSearch', { name })
const chapterCatalogue = (id) => rxios('GET', `/store/v0/fiction/detail/${id}?chapter_id=0`);
export {
    index, // 首页
    pull, //首页瀑布流请求
    searchpage, //搜索推荐
    search, //搜索
    banner, //banner图界面
    getfree, //免费页面
    getmore, //男女最爱
    category, //分类页面
    categoryFiction, //分类详情页
    categoryTitle,
    categoryTag,
    ranks, //排行
    ranksFiction, //排行内页
    morefiction, //频道内页更多信息（containerOne）
    persistent, //精选（containerThree）
    detail, //详情
    read, //看书
    freeChapter, //免费章节获取
    freeRead, //免费阅读
    freeSearch, //免费搜索
    chapterCatalogue, //收费章节
}