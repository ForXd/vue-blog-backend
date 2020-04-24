const Router = require('koa-router');
const fs = require('fs');
let router = Router();

const pageCount = 10;

// get post
router.get('/:id', async ctx => {
    // let data = await ctx.db.execute('select * from user_table');
    let data = await ctx.db.execute(`select * from post_table where id = '${ctx.params.id}'`);
    if (data.length == 0) {
        ctx.body = 'not found';
    } else {
        ctx.body = data[0];
    }
})
router.get('/', async ctx => {
    let page = ctx.query.page;
    let data;
    if (page) {
        data = await ctx.db.execute(`select * from post_table limit ${page*10}, ${(page + 1)*10}`);
    } else {
        data = await ctx.db.execute(`select * from post_table limit 0, 10`);
    }
    ctx.body = data;
})
// create post
router.post('/', async ctx => {
    //1.get upload post and save to www/blog/
    let file = ctx.request.fields['post'][0];
    console.log(file.path);
    console.log(file.name);
    fs.renameSync(file.path, '../www/blog/' + file.name);

    let content_url = 'blog/' + file.name;
    //2.store post meta data to post_table
    let post = JSON.parse(ctx.request.body);
    post['content_url'] = content_url;
    await ctx.db.execute(`insert into post_table
    (author_id, title, description, category, content_url)values('${post.author_id}', '${post.title}', '${post.description}', '${post.category}', '${post.content_url}')`);

    //3.return result
    let data = await ctx.db.execute(`select * from post_table where title='${post.title}'`);
    ctx.body = data[0];
})


module.exports = router.routes();