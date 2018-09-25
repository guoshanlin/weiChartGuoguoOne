var request = require('request.js')
var Api = require('Api.js')
var WXBizDataCrypt = require('./WXBizDataCrypt')

var app = getApp()

module.exports = {
    getOpenId(code, that) {
        let _this = this
        request.post(Api.getOpenId, {'code': code}).then((res) => {
            if (res.success){
                that.globalData.session_key = res.data.session_key
                that.globalData.openId = res.data.openid

                wx.getUserInfo({
                    success: function (res) {
                        console.log("appJs getUserInfo ===" + JSON.stringify(res))
                        that.globalData.userInfo = res.userInfo
                        // 解析 unionId
                        _this.getUnionId(that, res.encryptedData, res.iv)
                    }
                })
            }
        }, (error) => {

        })
    },
    loginWechat: function (that, wechatUnionid, nickName){
        request.post(Api.loginWechat, { wxUnionid: wechatUnionid, nickName: nickName}).then((res) => {
            if (res.success){
                let member = res.data.member
                that.globalData.memberId = member.id
                that.globalData.userId = res.data.user.id
                that.globalData.userType = res.data.userType
                that.globalData.userData = {
                    phone: member.phone,
                    email: member.email,
                    nickName: member.nickName,
                    name: member.name
                }
                that.globalData.role = res.data.member.role
                wx.setStorageSync("memberId", member.id)
                wx.setStorageSync("userId", res.data.user.id)
                wx.setStorageSync("userType", res.data.userType)
                wx.setStorageSync("sessionId", "JSESSIONID=" + res.data.sessionId)
                if (that.globalData.userInfo)this.updateMembers(that.globalData.userInfo, that)
            }
        }, (error) => {
            
        })
    },
    updateMembers: function (userInfo, app){
        let parms = {
            id: app.globalData.userId,
            nickName: userInfo.nickName,
            sex: userInfo.gender == 1 ? "男" : userInfo.gender == 2 ? "女" : "未知",
            address: userInfo.country + "-" + userInfo.province + "-" + userInfo.city,
            img: userInfo.avatarUrl,
            wxUnionid: app.globalData.unionId,
            wxOpenid: app.globalData.openId
        }
        request.post(Api.members, parms)
            .then(res => {
                app.globalData.userData = {
                    name: res.data.name,
                    phone: res.data.phone,
                    email: res.data.email,
                    nickName: res.data.nickName
                }
                console.log("updateMembers=="+JSON.stringify(res))
            }, error => {

            })
    },
    // 访问记录提交
    accessLog: function (access, app){
        let pages = getCurrentPages(), url = pages[pages.length - 1].route
        let systemInfo = app.globalData.systemInfo, userInfo = app.globalData.userInfo
        let parms = {
            accessUrl: url,
            belongToMember: access.belongToMember,
            belongToObject: access.belongToObject,
            accessUrlDesc: access.accessUrlDesc,
            visitorId: app.globalData.userId
        }
        if (systemInfo){
            parms = Object.assign({}, parms, {
                visitorClientSys: systemInfo.system,
                visitorClientModel: systemInfo.model,
            })
        }
        if (userInfo){
            parms = Object.assign({}, parms, {
                visitorProvince: userInfo.province,
                visitorCity: userInfo.city,
                visitorSex: userInfo.gender
            })
        }
        request.post(Api.accessLog, parms)
            .then( res => {
            }, error => {

            })
    },
    getUnionId: function (app, encryptedData, iv){
        var pc = new WXBizDataCrypt(app.globalData.appId, app.globalData.session_key)
        var data = pc.decryptData(encryptedData, iv)
        app.globalData.userInfo = data
        app.globalData.unionId = data.unionId
        console.log("getUnionId===" + JSON.stringify(data))
        this.loginWechat(app, data.unionId, data.nickName)
    },
    sharingUrl: function () {
        request.get(Api.locationUrl2 + '/sharingUrl', {}).then((res) => {

            console.log("promotionUtils:::" + Api.locationUrl2 + '/sharingUrl')
        }, (error) => {
            console.log("promotionUtils::error::" + JSON.stringify(error))
        })
    }
}