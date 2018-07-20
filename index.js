const koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new koa();
// add router middleware:
app.use(router.routes());
app.use(bodyParser());



const {mysql} = require('./mysql');


// 参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是koa传入的将要处理的下一个异步函数。

// 上面的异步函数中，我们首先用await next();处理下一个异步函数，然后，设置response的Content-Type和内容。

// 由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入。

// 对于任何请求，app将调用该异步函数处理请求：

// 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。

// 我们可以对ctx操作，并设置返回内容。但是为什么要调用await next()？

// 原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
// 最后注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。
// app.use(async (ctx, next) => {
//     await next();
//     // 设置response的Content-Type:
//     ctx.response.type = 'text/html'
//     ctx.body = "<h1>hell world23m</h1>"
// })

// mysql.select('*').from("nideshop_goods").then(function(data){
//     console.log(data)
// })




app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}1`); // 打印URL
    await next(); // 调用下一个middleware
});

// app.use(async (ctx, next) => {
//     const start = new Date().getTime(); // 当前时间
//     await next(); // 调用下一个middleware
//     const ms = new Date().getTime() - start; // 耗费时间
//     console.log(`Time: ${ms}ms`); // 打印耗费时间
// });

// app.use(async (ctx, next) => {
//     await next(); //先执行这个
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

router.get("/hello/:id", async (ctx, next) => {
    var id = ctx.params.id;
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>这个id是 ${id}</h1>`;
})
router.get("/", async (ctx, next) => {
    ctx.response.type = 'text/html';
    // ctx.response.body = `<h1>我是首页</h1>`;
    const bookData= await mysql.select('*').from("nideshop_product");
    console.log(bookData);
    ctx.state.data = {
        bookData,
        msg:'success'
      }
    // ctx.response.body = JSON.stringify(bookData);
})

app.listen(9991)