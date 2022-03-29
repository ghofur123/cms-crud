$(document).ready(function(){
    $('.checkbox-order-by-child').on('checked', function(){
        console.log("on");
    });
});
$(document).on('click', '.btn-proses-select-class', function(){
    let nameTable = $('.name-table-class').val();
    let checkboxOrderByChild = $('.checkbox-order-by-child').val();

    console.log(nameTable + "iiii" + checkboxOrderByChild);
});
