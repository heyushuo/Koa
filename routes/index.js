/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    //请求前缀 app
    prefix: '/app'
})


const controllers = require('../controllers')


//请求的是这个接口 xxx.com/app/demo
router.get('/demo',controllers.demo)



module.exports = router