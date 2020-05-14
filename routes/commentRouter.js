const Router = require('koa-router');
let router = Router();

const pageCount = 10;

// get comment
router.get('/:id', async ctx => {
    let data = await ctx.db.execute(`select * from comment_table where id = '${ctx.params.id}'`);
    if (data.length == 0) {
        ctx.body = 'not found';
    } else {
        ctx.body = data[0];
    }
})
// get comment list by id
router.get('/', async ctx => {
    let postId = ctx.query.postId;
    let page = ctx.query.page;
    let data;
    if (page) {
        data = await ctx.db.execute(`select * from comment_table where to_post='${postId}' limit ${page*10}, ${(page + 1)*10}`);
    } else {
        data = await ctx.db.execute(`select * from comment_table where to_post='${postId}' limit 0, 10`);
    }
    ctx.body = data;
})
// create comment
router.post('/', async ctx => {
    let comment = JSON.parse(ctx.request.body);
    let res = await ctx.db.execute(`insert into comment_table
    (author_id, content, to_post, to_comment)values('${comment.author_id}', '${comment.content}', '${comment.post_id}', '${comment.to_comment}')`);
    
    ctx.body = {success: true, id: res.insertId};
})


module.exports = router.routes();