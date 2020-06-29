//注意：每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，我们可以拿到Ajax给我们提供的配置对象
$.ajaxPrefilter((options) => {
    options.url = `http://127.0.0.1:8080${options.url}`
        //统一为有权限的借口，设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        // if (options.url.includes("/my/")){
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // options.complete = function(res) {
    //     //在complete回调函数中 可以用res.responseJSON拿到服务器响应回来的数据
    //     const { status, message } = res.responseJSON
    //     if (status === 1 || message === "身份认证失败！") {
    //         localStorage.removeItem("token")
    //         location.href = "/login.html"
    //     }
    // }
})