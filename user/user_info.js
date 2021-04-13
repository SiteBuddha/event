$(function () {
    const form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });

    $("#btnReset").click(function (e) {
        e.preventDefault();
        initUserInfo();
    })

    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo();
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })


});