const koa = require('koa');
const app = new koa();


// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    // 设置response的Content-Type:
    ctx.response.type = 'text/html'
    ctx.body = "<h1>hell world23m</h1>"
})

app.listen(9991)