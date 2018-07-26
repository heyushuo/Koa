const {
  mysql
} = require('../../mysql');

async function detailAction(ctx) {
  //ctx.query 获取get请求的参数对象的形式
  const goodsId = ctx.query.id;
  //商品信息
  const info = await mysql('nideshop_goods').where({
    'id': goodsId
  }).select();
  //商品相关图片
  const gallery = await mysql('nideshop_goods_gallery').where({
    goods_id: goodsId
  }).limit(4).select();
  //相关属性
  //关联查询两个表  leftJoin
  const attribute = await mysql('nideshop_goods_attribute').column("nideshop_goods_attribute.value", "nideshop_attribute.name").leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id', 'nideshop_attribute.id').where({
    'nideshop_goods_attribute.goods_id': goodsId
  }).select();
  //常见问题
  const issue = await mysql('nideshop_goods_issue').select();
  //品牌
  const brand = await mysql('nideshop_brand').where({
    id: info[0].brand_id
  }).select();
  //评论条数
  const commentCount = await mysql('nideshop_comment').where({
    value_id: goodsId,
    type_id: 0
  }).count('id  as number ');
  //热门评论
  const hotComment = await mysql('nideshop_comment').where({
    value_id: goodsId,
    type_id: 0
  }).select();
  let commentInfo = {};
  if (hotComment.length != 0) {
    const commentUser = await mysql('nideshop_user').column('nickname', 'username', 'avatar').where({
      id: hotComment[0].user_id
    }).select();
    commentInfo = {
      content: Buffer.from(hotComment[0].content, 'base64').toString(),
      add_time: hotComment.add_time,
      nickname: commentUser[0].nickname,
      avatar: commentUser[0].avatar,
      pic_list: await mysql('nideshop_comment_picture').where({
        comment_id: hotComment[0].id
      }).select()
    };
  }

  const comment = {
    count: commentCount[0].number,
    data: commentInfo
  };

  ctx.body = {
    "info": info[0] || [],
    "gallery": gallery,
    "attribute": attribute,
    "issue": issue,
    "comment": comment,
    "brand": brand[0] || []
  }
}
/**
 * 商品详情页数据
 * @returns {Promise.<Promise|PreventPromise|void>}
 */
// async detailAction() {
//   const goodsId = this.get('id');
//   const model = this.model('goods');

//   const info = await model.where({'id': goodsId}).find();
//   const gallery = await this.model('goods_gallery').where({goods_id: goodsId}).limit(4).select();
//   const attribute = await this.model('goods_attribute').field('nideshop_goods_attribute.value, nideshop_attribute.name').join('nideshop_attribute ON nideshop_goods_attribute.attribute_id=nideshop_attribute.id').order({'nideshop_goods_attribute.id': 'asc'}).where({'nideshop_goods_attribute.goods_id': goodsId}).select();
//   const issue = await this.model('goods_issue').select();
//   const brand = await this.model('brand').where({id: info.brand_id}).find();
//   const commentCount = await this.model('comment').where({value_id: goodsId, type_id: 0}).count();
//   const hotComment = await this.model('comment').where({value_id: goodsId, type_id: 0}).find();
//   let commentInfo = {};
//   if (!think.isEmpty(hotComment)) {
//     const commentUser = await this.model('user').field(['nickname', 'username', 'avatar']).where({id: hotComment.user_id}).find();
//     commentInfo = {
//       content: Buffer.from(hotComment.content, 'base64').toString(),
//       add_time: think.datetime(new Date(hotComment.add_time * 1000)),
//       nickname: commentUser.nickname,
//       avatar: commentUser.avatar,
//       pic_list: await this.model('comment_picture').where({comment_id: hotComment.id}).select()
//     };
//   }

//   const comment = {
//     count: commentCount,
//     data: commentInfo
//   };

//   // 当前用户是否收藏
//   const userHasCollect = await this.model('collect').isUserHasCollect(think.userId, 0, goodsId);

//   // 记录用户的足迹 TODO
//   await await this.model('footprint').addFootprint(think.userId, goodsId);

//   // return this.json(jsonData);
//   return this.success({
//     info: info,
//     gallery: gallery,
//     attribute: attribute,
//     userHasCollect: userHasCollect,
//     issue: issue,
//     comment: comment,
//     brand: brand,
//     specificationList: await model.getSpecificationList(goodsId),
//     productList: await model.getProductList(goodsId)
//   });
// }

module.exports = {
  detailAction,
}