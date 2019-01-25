$('#body').html(`
<tr>
    <td colspan="4">Loading...</td>
</tr>
`)
$.ajax({
    type: 'GET',
    url: '/api/weights',
    success: function(res){
        $('#body').html('')
        console.log(res)
        for(let obj of res.weights){
            $('#body').append(`
            <tr>
                <td><a href="/weights/${obj._id}">${obj.date.toString().slice(0,10)}</a></td>
                <td>${obj.maxWeight}</td>
                <td>${obj.minWeight}</td>
                <td>${obj.maxWeight - obj.minWeight}</td>
            </tr>
            `)
        }
        $("#maxAverage").html(res.maxAverage)
        $("#minAverage").html(res.minAverage)
        $("#diffAverage").html(res.diffAverage)
        
    },
    error: function(){
        console.log('fetching error!')
    }
})