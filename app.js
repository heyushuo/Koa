const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const cors = require('koa-cors');
app.use(cors());


app.use(bodyParser());
// 引入路由分发
const router = require('./routes')
app.use(router.routes())

app.listen (9996);