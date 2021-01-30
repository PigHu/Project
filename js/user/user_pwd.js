$(function() {
    var form = layui.form;
    //设置密码的校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],
        newpwd: function(value) {
            var pwd = $('.layui-form [name=oldPwd]').val();
            if (pwd == value) {
                return '新输入的密码不能相同';
            }
        },
        repwd: function(value) {
            var pwd = $('.layui-form [name=newPwd]').val();
            if (pwd !== value) {
                return '两次输入的密码不相同';
            }
        },
    });
    //修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！');
                }
                layui.layer.msg('更新密码成功');
                //重置表单里的内容
                $('.layui-form')[0].reset();
            },
        });
    });
});