$(function () {
    //获取layui的弹出层组件方法
    const layer =layui.layer
    //退出登录的功能
    $("#btnLogout").on("click",() => {
        layer.confirm(
            "确定退出登录",
            {icon: 3, title: ""},
            function(index) {
                //清空本地存储中的token
                localStorage.removeItem("token")
                //跳转到登录页面
                location.href = "/login.html"
            }
        )
    })
   
    getUserInfo()
})
const layer = layui.layer
//发起ajax请求获取用户信息
const getUserInfo = () => {
$.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败");
        layer.msg("获取用户信息成功")
        randerAvatar(res.data)
    }
})
}
//渲染用户头像
const randerAvatar = (user) => {
const name = user.nickname || user.username
//设置欢迎文本
$("#welcome").html(`欢迎 ${name}`)
//按需渲染头像
if (user.user_pic !== null) {
    //自定义设置请求到的src属性值
    $(".layui-nav-img").attr("src",user.user_pic).show()
    $(".text-avatar").hide()
} else {
    $(".layui-nav-img").hide()
    const firstname = name[0].toUpperCase()
    $(".text-avatar").html(firstname).show()
}
}