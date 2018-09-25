
// var locationUrl = "https://pmp.coreware.cn:8443/gather"
// var locationUrl = "https://www.juniwota.com/gather"
let baseUrl = "https://www.juniwota.com/qj/",
    locationUrl = "https://www.juniwota.com/qj/mice",
    locationUrl2 = "https://www.juniwota.com/mp"

module.exports = {
    baseUrl: locationUrl,
    locationUrl2: locationUrl2,
    locationUrl: baseUrl,   // 图片拼接路径
    queryActivity(id){                                      // 查询活动
        return locationUrl + "/act_activitys/info/" + id
    },
    loginWechat: locationUrl + '/base_users/loginWxUnionid',      // 登录
    decodeInfo: locationUrl + "/act_weixin/decodeInfo",         // 解析UnionId
    getOpenId: locationUrl + "/act_weixin/getOpenId",           // openID

}