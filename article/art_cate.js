$(function () {
    initArtCateList();
    const layer = layui.layer

    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                const str = template("tpl-table", res);
                $("tbody").html(str)
            }
        })
    }
    let indexAdd = null;
    $("#btnAddCate").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('body').on("submit", '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    let indexEdit = null;
    $("body").on("click", ".btn-edit", function (e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        let id = $(this).attr('data-id');
        $.ajax({
            type: "GET",
            url: '/my/article/cates/' + id,
            success(res) {
                layui.form.val('form-edit', res.data)
            }
        })
    })
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtCateList();
                layer.close(indexEdit)
            }
        })
    })
    $("body").on("click", ".btn-delete", function () {
        let id = $(this).attr("data-id");
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }

                    layui.layer.msg(res.message)
                    initArtCateList();
                    layer.close(index)
                }
            })
        })
    })
})