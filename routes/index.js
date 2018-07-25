/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  //请求前缀 heyushuo
  prefix: '/heyushuo'
})


const controllers = require('../controllers')


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

/**
 *  专题接口
 */
//列表
router.get('/topic/listAction', controllers.topic.index.listAction)
// 详情加下方四个专题推荐
router.get('/topic/detailAction', controllers.topic.index.detailAction)
module.exports = router