$(function() {
        getUserInfo()
        var layer = layui.layer
            //点击退出，实现退出功能
        $("#btnLogout").on("click", function() {
            layer.confirm("确认退出吗", { icon: 3, title: "提示" }, function(index) {
                //清除本地储存中的token
                localStorage.removeItem("token")
                    //重新跳转到登录页面
                location.href = "./login.html"
                    //关闭  confirm 询问框
                layer.close(index)
            })
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg("获取用户信息失败")
            renderAvater(res.data)
        },
        // complete: function(res) {
        //     //在complete回调函数中 可以用res.responseJSON拿到服务器响应回来的数据
        //     console.log(res);
        //     if (res.responseJSON.status !== 0 && res.responseJSON.message === "身份验证失败") {
        //         localStorage.removeItem("token")
        //         location.href = "/login.html"
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvater(user) {
    //获取用户的名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $("#welcome").html(`欢迎&nbsp;&nbsp;${name}`)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}