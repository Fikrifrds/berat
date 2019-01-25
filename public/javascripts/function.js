function hapusData(id){
    $.ajax({
        type: 'DELETE',
        url: `/api/weights/${id}`,
        success: function(res){
            console.log(res)
            window.location.href = "/";
        },
        error: function(){
            console.log('error fetching!')
        }
    })
}

function inputData(data){
    $.ajax({
        type: 'POST',
        url: '/api/weights',
        data: data,
        success: function(res){
        console.log(res)
        window.location.href = "/";
        },
        error: function(){
            console.log('fetching error!')
        }
    })
}

function editData(id, data){
    $.ajax({
        type: 'PUT',
        url: `/api/weights/${id}`,
        data: data,
        success: function(res){
        console.log(res)
        window.location.href = `/weights/${id}`;
        },
        error: function(){
            console.log('fetching error!')
        }
    })
}