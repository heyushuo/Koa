/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  //请求前缀 app
  prefix: '/app'
})


const controllers = require('../controllers')


//请求的是这个接口 xxx.com/app/demo
router.get('/demo', controllers.demo)
//首页数据
router.get('/index/index', controllers.home.index)



/**
 *  分类
 */
//分类和子类
router.get('/category/indexaction', controllers.category.index.indexAction)
//通过分类的id来查询子类接口
router.get('/category/currentaction', controllers.category.index.currentAction)
/**
 *  商品相关接口
 */



module.exports = router