$(function() {
    // JQuery实现注册登录页面跳转
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=userpwd]').val();
            if (pwd !== value) {
                return '两次输入的密码不相同';
            }
        },
    });

    //监听注册表单提交事件

    $('#form-reg').on('submit', function(e) {
        var username = $('.reg-box [name=username]').val();
        var password = $('.reg-box [name=userpwd]').val();
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: username,
                password: password,
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                //注册成功后自动跳转到登录页面
                $('#link-login').click();
            },
        });
    });

    //监听登录表单提交事件

    $('#form-login').on('submit', function(e) {
        var username = $('.login-box [name=username]').val();
        var password = $('.login-box [name=userpwd]').val();
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: username,
                password: password,
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //将登录成功后得到的token存入locationStorage中
                localStorage.setItem('token', res.token);

                //登录成功后跳转到首页
                location.href = 'index.html';
            },
        });
    });
});