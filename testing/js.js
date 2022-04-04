// $(".btn-submit-class").click(function() {
    $(".form-1").submit(function(){
    // untuk menyimpan data
    var formData = new FormData();

    // ini untuk mengambil value dari input=file
    // code seperti ini sudah bisa upload foto
    var judul = $("input[name=judul]");
    formData.append("judul", judul);
    var inputFile1 = $("input[name=file_name]");
    var fileToUpload = inputFile1[0].files[0];
    formData.append("file_name", fileToUpload);
    console.log(fileToUpload);
    console.log(formData +"&"+ $(this).serialize());
    // $.ajax({
    //     url: "gambar/load?act=insert",
    //     type: "post",
    //     data: formData,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     success: function(data) {
    //         $(".message-errors").html(data);
    //         $("#judul").val("");
    //         $("#file_name").val("");
    //         ajaxload();
    //     }
    // });
    return false;
    });