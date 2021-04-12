$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    // 自定义效验规则
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须为6-12位，且中间不能有空格"],
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次输入密码不一致";
            }
        }
    });

    const layer = layui.layer;
    //监听注册表单的提交事件
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        const data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);;
            }
            layer.msg(res.message);
            $('#link_login').click();
        });
    });

    //监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})