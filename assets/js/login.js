$(function() {
    //点击去注册按钮隐藏登录界面 显示注册页面
    $("#link_reg").on("click", () => {
      $(".reg-box").show()
      $(".login-box").hide()
    })
    //点击去登录按钮显示登录界面 隐藏注册页面
    $("#link_login").on("click", () => {
      $(".reg-box").hide()
      $(".login-box").show()
    })
    //调用layui的form对象实现自定义表单验证规则
    const form = layui.form
    //调用layui的form对象verify方法
    form.verify({
      pwd: [/^[\S]{6,12}$/, "密码需要6-12位，并且空格除外"],
      repwd: val => {
        // val是再次确认密码的输入值
        // 获取用户第一次输入的密码值
        // 判断两次密码是否输入一致，不一致就return出去
        let pwd = $("#form_reg [name=password]").val()
        if (pwd !== val) {
          return ("两次密码输入不一致，请重新输入")
        }
      }
    })
    //调用layui的layer对象调用提示框方法
    const layer = layui.layer
    //自定义baseUrl
    const baseUrl = "http://www.liulongbin.top:3007"
    //监听注册表单的submit并发起ajax请求
    $("#form_reg").on("submit", (e) => {
      //阻止表单的默认提交行为
      e.preventDefault()
      //发起ajax的post请求提交用户输入的值
      $.ajax({
        type: "POST",
        url: "/api/reguser",
        data: {
          username: $("#form_reg [name=username]").val(),
          password: $("#form_reg [name=password]").val()
        },
        success: res => {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg("注册成功")
          // 注册成功后跳转到登录界面
          $("#link_login").click();
        }
      })
    })
    // 监听登录表单的submit事件并发起ajax请求登录后台
    $("#form_login").on("submit", (e) => {
      e.preventDefault()
      $.ajax({
        type: "POST",
        url: "/api/login",
        data: $("#form_login").serialize(), // 快速获取表单值
        success: res => {
          if (res.status !== 0) return layer.msg(reg.message)
          layer.msg("登录成功");
          //把token值保存在本地
          localStorage.setItem("token", res.token);
          // 跳转到index界面
          location.href = "/index.html";
        }
      })
    })
  })