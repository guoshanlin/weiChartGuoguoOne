Page({
    data: {
      list:[
        { page: 'line', name: '直线图'},
        { page: 'scrollline', name: '可拖动的直线图'},
        { page: 'column', name: '柱状图'},
        { page: 'pie', name: '饼图'},
        { page: 'ring', name: '环形图'},
        { page: 'area', name: '区域图'},
        { page: 'radar', name: '雷达图'},
      ]
    },
    gotoPage: function(e) {
        var page = e.currentTarget.dataset.page;
        wx.navigateTo({
            url: '../charts/' + page + '/' + page
        });
    },
    onLoad: function() {

    }
})