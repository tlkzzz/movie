$(function(){
    $('.del').click(function(event) {
        var target = $(event.target)
        // 获取点击当前按钮的id
        var id = target.data('id')
        //获取tr class的id
        var tr = $('.item-id-' + id)

        $.ajax({
            url: '/admin/del?id=' + id,
            type: 'DELETE'
        })
        .done(function(result) {
            if(result.success === 1){
                if(tr.length > 0){
                    tr.remove()
                }
            }
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        }) 
    })
})
