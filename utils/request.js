
var commonParams = {}
module.exports = {
    ajax(url, parma, type) {
        let data = Object.assign({}, commonParams, parma),
            sessionId = wx.getStorageSync("sessionId"),
            memberId = wx.getStorageSync("memberId"),
            userId = wx.getStorageSync("userId"),
            userType = wx.getStorageSync("userType"),
            extendId = wx.getStorageSync("extendId")
        console.log(url + "-------------------" + JSON.stringify(parma))
        return new Promise((resolve, reject) => {
            wx.request({
                method: type ? type : "POST",
                url: url,
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                // header: { 'content-type': 'application/json'},
                // Access-Control-Allow-Credentials: true
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cookie": sessionId ? sessionId : "",
                    "memberId": memberId ? memberId: "",
                    "userId": userId ? userId : "",
                    "userType": userType ? userType : "",
                    "extendId": extendId ? extendId : ""
                },
                success: function (res) {
                    resolve(res.data)
                },
                fail: function (error) {
                    console.log(url+"====error ============" + JSON.stringify(error))
                    reject(error)
                }
            })
        })
    },
    post(url, parma) {
        return this.ajax(url, parma, "POST")
    },
    get(url, parma) {
        return this.ajax(url, parma, "GET")
    },
    delete(url, parma) {
        return this.ajax(url, parma, "DELETE")
    }
}