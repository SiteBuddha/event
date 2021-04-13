$(function () {
    const $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $("#file").on('change', function (e) {
        const files = e.target.files
        if (files.length === 0) {
            return layui.layer.msg("请选择图片上传！")
        }
        const file = files[0];
        const imgUrl = URL.createObjectURL(file)
        $image
            .cropper("destroy")
            .attr("src", imgUrl)
            .cropper(options)
    })
    $("#btnUpload").on('click', function () {
        const dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})