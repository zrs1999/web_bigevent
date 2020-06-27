//注意：每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，我们可以拿到Ajax给我们提供的配置对象
$.ajaxPrefilter((options) => {
    options.url = "127.0.0.1:8080" + options.url
})