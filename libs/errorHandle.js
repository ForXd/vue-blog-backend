async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (e) {
        // 开发过程中遇到的不同错误类型依次添加判断
        console.log(e)
        console.log('error');
    }
}


module.exports = errorHandler;