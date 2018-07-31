const {
  mysql
} = require('../../mysql');

async function indexAction(ctx) {
  //ctx.query 获取get请求的参数对象的形式
  const {
    id: categoryId
  } = ctx.query;
  //获取所有的分类
  const data = await mysql("nideshop_category").where({
    "parent_id": 0
  }).select();
  const currentCategory = [];
  if (categoryId) {
    //获取分类里的子类
    currentCategory = await mysql("nideshop_category").where({
      "parent_id": categoryId
    }).select();
  }


  ctx.body = {
    "categoryList": data,
  }
}
//点击右侧分类时获取左侧对应的分类
async function currentAction(ctx) {
  const {
    id: categoryId
  } = ctx.query;
  const data = {};
  //获取分类里的子类
  const currentOne = await mysql("nideshop_category").where({
    "id": categoryId
  }).select();
  const subList = await mysql("nideshop_category").where({
    "parent_id": currentOne[0].id
  }).select();
  data.currentOne = currentOne[0];
  data.currentOne.subList = subList;
  ctx.body = {
    "data": data
  }
}

module.exports = {
  indexAction,
  currentAction
}