$(function() {
        getUserInfo()
        var layer = layui.layer
            //点击退出，实现退出功能
        $("#btnLogout").on("click", function() {
            layer.confirm("您确认退出吗", { icon: 3, title: "尊敬的VIP" }, function(index) {
                //清除本地储存中的token
                localStorage.removeItem("token")
                    //重新跳转到登录页面
                location.href = "./login.html"
                    //关闭  confirm 询问框
                layer.close(index)
            }, function() {
                return layer.msg("欢迎回来")
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
        complete: function(res) {
            const { status, message } = res.responseJSON
            if (status === 1 && message === "身份认证失败！") {
                localStorage.removeItem("token")
                location.href = "/login.html"
            }
        }
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