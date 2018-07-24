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
    "currentCategory": currentCategory
  }
}

async function currentAction(ctx) {
  const {
    id: categoryId
  } = ctx.query;
  //获取分类里的子类
  const currentCategory = await mysql("nideshop_category").where({
    "parent_id": categoryId
  }).select();

  ctx.body = {
    "currentCategory": currentCategory
  }
}

module.exports = {
  indexAction,
  currentAction
}