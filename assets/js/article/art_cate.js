$(function() {
  // 初始化发起ajax请求获取文章列表数据的函数
  const layer = layui.layer
  const initArtcateData = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: res => {
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败")
        }
        // layer.msg("获取文章列表成功")
        // 调用 template
        const htmlStr = template("tpl-table", res)
        $("tbody").empty().html(htmlStr)
      }
    })
  }
  initArtcateData()
  let indexAdd = null;
  $("#btnAddCate").on("click", () => {
    //调用layer的open方法实现弹出层
    // layer.open({
    //   type: 1,
    //   area: ["500px", "250px"],
    //   title: "添加文章分类",
    //   content: "ABC",
    // });
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })


  //发起Ajax请求，注意，我们这个按钮不是写死的，是弹框出来的时候动态生成的，所以我们通过事件委派方式给表单绑定 submit 事件 实现添加文章的功能
  $("body").on("submit", "#form-add", (e) => {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $("#form-add").serialize(),
      success: res => {
        if (res.status !== 0) {
          return layer.msg("添加分类失败")
        }
        layer.msg("添加分类成功")
        initArtcateData()
        layer.close(indexAdd)
      }
    })
  })
  // 通过代理方式，为 btn-edit 按钮绑定点击事件 实现编辑功能
  let indexEdit = null;
  const form = layui.form
  $("tbody").on("click", ".btn-edit", function() {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })
    // 在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中
    const id = $(this).attr("data-id")
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + id,
      success: res => {
        // 给表单域填充获取到的数据
        form.val("form-edit", res.data)
      }
    })
  })
  //更新文章分类
  $("body").on("submit", "#form-edit", e => {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $("#form-edit").serialize(),
      success: res => {
        if (res.status !== 0) {
          return layer.msg("更新文章分类失败")
        }
        layer.msg("更新文章分类成功")
        layer.close(indexEdit)
        initArtcateData()
      }
    })
  })
  // 通过代理方式，为 btn-delete 按钮绑定点击事件 实现删除功能
  $("tbody").on("click", ".btn-delete", function() {
    const id = $(this).attr("data-id")
    // 提示用户是否删除
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function(index) {
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: res => {
          if (res.status !== 0) {
            return layer.msg("删除失败")
          }
          layer.msg("删除成功")
          layer.close(index)
          initArtcateData()
        }
      })
    })
  })
})