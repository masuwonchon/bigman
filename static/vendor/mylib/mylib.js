$(".delete").on('click', function() {
    $('.case:checkbox:checked').parents("tr").remove();
    $('.check_all').prop("checked", false); 
    check();

});
var i=2;
$(".addmore").on('click',function(){
    count=$('table tr').length;
    var data="<tr><td><input type='checkbox' class='case'/></td>";
    data +="<td contenteditable='true' id='rulename' name='rulename[]'/># alert tcp any any -> any 80 (msg: 'Make your rules')</td></tr>";
//    var data="<tr><td><input type='checkbox' class='case'/></td><td><span id='snum"+i+"'>"+count+".</span></td>";
//    data +="<td><input type='text' id='first_name"+i+"' name='first_name[]'/></td> <td><input type='text' id='last_name"+i+"' name='last_name[]'/></td><td><input type='text' id='tamil"+i+"' name='tamil[]'/></td><td><input type='text' i
d='english"+i+"' name='english[]'/></td><td><input type='text' id='computer"+i+"' name='computer[]'/></td><td><input type='text' id='total"+i+"' name='total[]'/></td></tr>";
    $('table').append(data);
    i++;
});

function select_all() {
    $('input[class=case]:checkbox').each(function(){ 
    if($('input[class=check_all]:checkbox:checked').length == 0){ 
        $(this).prop("checked", false); 
    } else {
        $(this).prop("checked", true); 
    } 
    });
}

function check(){
    obj=$('table tr').find('span');
    $.each( obj, function( key, value ) {
    id=value.id;
    $('#'+id).html(key+1);
    });
}
