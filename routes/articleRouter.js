const Router = require('koa-router');


let router = Router();

router.get('/:id', async ctx => {
    // let data = await ctx.db.execute('select * from user_table');
    ctx.body = `article${ctx.params.id}`;
})


module.exports = router.routes();