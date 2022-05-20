// - 导入 form 模块
// - 利用 form.verify()  来定义规则
//   - 长度必须是6到12位
//   - 不能与旧密码一致
//   - 两次密码是否相同
// - 在对应的表单元素中，利用 lay-verify 来设置自定义校验规则
$(function () {
    // 调用layui的form方法自定义检验规则
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/,"密码设置6-12位，不能含有空格"],
        repwd: val => {
            // val是再次确认输入的密码
            // 获取用户第一次输入的密码
            // 判断两次密码是否一样，不一样就return退出并提示用户
            const repwd = $(".layui-input[name=newPwd]").val()
            if (repwd !== val) {
                return "两次密码输入不一致，请重新输入"
            }
        },
        dtpwd: val => {
            const dtpwd = $(".layui-input[name=oldPwd]").val()
            if (dtpwd === val) {
                return "新旧密码不能相同，请重新输入"
            }
        }
    })
    const layer = layui.layer
    //监听表单的submit事件发起ajax请求重置密码
    $(".layui-form").on("submit",(e) => {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(".layui-form").serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg("重置密码失败")
                }
                layer.msg("重置密码成功")
                //清空表单内容
                $(".layui-form")[0].reset()
            }
        })
    })
})
