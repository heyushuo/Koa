const {
  mysql
} = require('../../mysql');
async function indexAction() {
  // 默认关键词
  const defaultKeyword = await mysql('nideshop_keywords').where({
    is_default: 1
  }).limit(1).elect();
  // 取出热闹关键词
  const hotKeywordList = await mysql('nideshop_keywords').distinct('keyword').column('keyword', 'is_hot').limit(10).select();
  // const historyKeywordList = await mysql('nideshop_search_history').distinct('keyword').where({
  //   user_id: think.userId
  // }).limit(10).column('keyword');

  ctx.body = {
    "defaultKeyword": defaultKeyword[0],
    "hotKeywordList": hotKeywordList
  }
}
//搜索的时候匹配搜索相关的
async function helperAction(ctx) {
  const keyword = ctx.query.keyword;
  const keywords = await mysql("nideshop_goods").column("name").where("name", 'like', '%' + keyword + '%').limit(10).select();
  ctx.body = {
    keywords
  }
}
// async function () {

// }
module.exports = {
  indexAction,
  helperAction
}