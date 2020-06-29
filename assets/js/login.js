$(() => {


    //点击" 去注册账号"的链接
    $("#link_reg").on("click", () => {
        $(".login-box").hide()
        $(".reg-box").show()
        layer.msg("已经跳转到注册页面，请注册", { icon: 1, time: 1000 })
    })


    //点击"去登陆"的链接
    $("#link_login").on("click", () => {
        $(".login-box").show()
        $(".reg-box").hide()
        layer.msg("已经跳转到登录页面，请登录", { icon: 1, time: 1000 })
    })


    //从layui上获取form对象
    const form = layui.form
    const layer = layui.layer
        //通过from.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一样的规则
        repwd: (value) => {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次相等的判断
            //如果判断失败，return一个提示消息即可
            const pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) return "两次密码不一致"
        }
    })


    //监听注册表单的提交事件
    $("#form-reg").on("submit", (e) => {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        console.log(data);

        $.post("/api/reguser", data, (res) => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg("注册成功", { icon: 1, time: 1000 })
                //模拟人的点击
            $('#link_login').click()
        })
    })


    //监听登录表单的提交事件
    $("#form-login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: "POST",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('登录失败', { icon: 2 })
                }
                layer.msg('登录成功', { icon: 1 })
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = './index.html'
            }
        })
    })


    layer.msg("请先登录")
})