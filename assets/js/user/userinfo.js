$(function() {
  //自定义一个nickname的检验规则1-6个字符
  const form = layui.form
  //调用layui里的form方法自定义检验规则
  form.verify({
    nickname: val => {
      if (val.length > 6) {
        return "请输入1-6个字符"
      }
    }
  })
  // 调用layui的layer方法提示框
  const layer = layui.layer;
  // 在  initUserInfo  函数中 调用 $.ajax() 获取用户基本信息
  const initUserInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败！");
        console.log(res);
        //   调用 form.val() 方法为表单赋值
        form.val("formUserInfo", res.data)
      },
    });
  };
  initUserInfo()
  // 重置表单数据
  $("#btnReset").click(e => {
    e.preventDefault()
    initUserInfo()
  })
  // 发起ajax请求更新用户个人信息数据
  $(".layui-form").on("submit", (e) => {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: res => {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败")
        }
        layer.msg("更新用户信息成功")
        // 调用父页面渲染函数
        window.parent.initUserInfo();
      }
    })
  })
})