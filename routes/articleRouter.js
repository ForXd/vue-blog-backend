const Router = require('koa-router');
const fs = require('fs');
let router = Router();

const pageCount = 10;

// get post
router.get('/retrieve/:id', async ctx => {
    let data = await ctx.db.execute(`select * from post_table where id = '${ctx.params.id}'`);
    if (data.length == 0) {
        ctx.body = 'not found';
    } else {
        ctx.body = data[0];
    }
})
// get post list
router.get('/', async ctx => {
    let page = ctx.query.page;
    let data = {};
    data.post = await ctx.db.execute(`select * from post_table limit ${(page - 1)*pageCount},${pageCount}`);
    data.pageCount = page;
    let postCount = await ctx.db.execute(`select count(*) as count from post_table`);
    data.postCount = postCount[0].count;
    ctx.body = data;
})

// search post
router.get('/search', async ctx => {
    let searchVal = ctx.query.val;
    let data = {}
    data.post = await ctx.db.execute(`select * from post_table where title like '%${searchVal}%'`);
    // console.log(data);
    ctx.body = data;
})
// get post category
router.get('/category', async ctx => {
    let data = {};
    data.category = await ctx.db.execute(`select distinct category as name from post_table where category != '';`);
    ctx.body = data;
})
// get post by category
router.get('/byCategory', async ctx => {
    let page = ctx.query.page;
    let category = ctx.query.category;
    let data = {};
    data.post = await ctx.db.execute(`select * from post_table where category = '${category}' limit ${(page - 1)*pageCount},${pageCount}`);
    data.pageCount = page;
    let postCount = await ctx.db.execute(`select count(*) as count from post_table where category = '${category}'`);
    data.postCount = postCount[0].count;
    ctx.body = data;
})

// create post
router.post('/', async ctx => {
    let post = JSON.parse(ctx.request.body);
    let content_url = 'blog/' + post.title + '.md';
    fs.writeFileSync('./www/blog/' + post.title + '.md', post.content);
    // 写到静态文件夹的文件无法立即访问？将koa-static-cache设置为动态即可
    let res = await ctx.db.execute(`insert into post_table
        (author_id, title, description, category, content_url)values('${post.author_id}', '${post.title}', '${post.description}', '${post.category}', '${content_url}')`);
    ctx.body = {success: true, id: res.insertId};
})


module.exports = router.routes();