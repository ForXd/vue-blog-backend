module.exports = async function (ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (ctx.request.method == "OPTIONS") {
        ctx.response.status = 200
    } 
    await next();
}