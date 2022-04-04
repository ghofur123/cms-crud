$(document).ready(function(){
    // menu
});
$(document).on("click", ".btn-table-jumlah-class", function() {
    console.log("ok");
    textAreaValueJs = "";
    let jumlahFild = $(".jumlah-db-class").val();
    localStorage.setItem("namaTable", $(".nama-table-class").val());
    localStorage.setItem("jumlah-fild", jumlahFild);
    let valueForm = "";
    for (let i = 0; i < jumlahFild; i++) {
        valueForm += "<input type='text' class='form-input-type-" + i + "' placeholder='nama fild'>";
        valueForm += "<select class='form-select-type-" + i + "'>";
        valueForm += "<option value='text'>text</option>";
        valueForm += "<option value='password'>password</option>";
        valueForm += "<option value='select'>select</option>";
        valueForm += "<option value='file'>file</option>";
        valueForm += "</select>";
        valueForm += "<hr />";
        $(".form-action-class").html(valueForm);
    }
});
$(document).on("click", ".btn-form-jumlah-action-class", function() {
    localStorage.setItem("typeForm", $(".type-form-class").val());
    let idRandom = new Date().getTime();
    let jumlahFildStorage = localStorage.getItem("jumlah-fild");
    let namaTableStorage = localStorage.getItem("namaTable");
    // db
    let textAreaValueDB = "";
        textAreaValueDB += "<textarea class='text-area-value-form-class'>";
        textAreaValueDB +="CREATE TABLE `"+ namaTableStorage +"` ("+
        "`id_"+ namaTableStorage +"` INT NULL AUTO_INCREMENT,"+
        "`uniq_"+ namaTableStorage +"` INT NULL DEFAULT '0',";
        for (let i = 0; i < jumlahFildStorage; i++) {
            let formInputType = $(".form-input-type-" + i).val();
            textAreaValueDB +="`"+ formInputType +"` VARCHAR(200) NULL DEFAULT '0',";
        }
        textAreaValueDB += "INDEX `Index 1` (`id_"+ namaTableStorage +"`, `uniq_"+ namaTableStorage +"`)"+
        ") COLLATE = 'latin1_swedish_ci' ENGINE = InnoDB;";
        textAreaValueDB += "</textarea>";
    $(".value-hasil-db-class").html(textAreaValueDB);


    // php ci
    let textAreaValuePHPCI = "";
    textAreaValuePHPCI += "<textarea class='text-area-value-form-class'>";
    textAreaValuePHPCI += "<?php"+
    "defined('BASEPATH') OR exit('No direct script access allowed');"+

    "class "+ namaTableStorage +"_api extends CI_Controller {"+
        "public function __construct(){"+
            "parent::__construct();"+
            "$this->output->set_header( 'Access-Control-Allow-Origin: *' );"+
            "$this->output->set_header( 'Access-Control-Allow-Credentials: true' );"+
            "$this->output->set_header( 'Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS' );"+
            "$this->output->set_header( 'Access-Control-Max-Age: 604800' );"+
            "$this->output->set_header( 'Access-Control-Request-Headers: x-requested-with' );"+
            "$this->output->set_header( 'Access-Control-Allow-Headers: x-requested-with, x-requested-by' );"+
            "$this->load->database();"+
            "$this->load->model('crud_function_model');"+
        "}"+
        "public function index(){"+
            "$this->load->view('coba/users');"+
        "}"+
        "public function load(){"+
            "if(!isset($_GET['act'])){"+
            "} else {"+
                "if($_GET['act'] == 'load'){"+
                    "if(!isset($_GET['where_parameter'])){"+
                        "$whereParam = '';"+
                    "}else {"+
                        "$whereParam = array("+
                            "'uniq_"+ namaTableStorage +"' =>$_GET[\"uniq_"+ namaTableStorage +"\"]"+
                        ");"+
                    "}"+
                    "$response = array();"+
                    "$queryDataRead = $this->crud_function_model->readData('"+ namaTableStorage +"', '', $whereParam, 'id_"+ namaTableStorage +" desc');"+
                    "foreach($queryDataRead as $item){"+
                    "$"+ namaTableStorage +" = array("+
                        "'id_"+ namaTableStorage +"' => $item['id_"+ namaTableStorage +"'],"+
                        "'uniq_"+ namaTableStorage +"' => $item['uniq_"+ namaTableStorage +"'],";
                        for (let i = 0; i < jumlahFildStorage; i++) {
                            let formInputType = $(".form-input-type-" + i).val();
                            let formSeleteType = $(".form-select-type-" + i + "").val();
                            textAreaValuePHPCI += "'"+ formInputType +"' => $item['"+ formInputType +"'],";
                        }

                        textAreaValuePHPCI += ");"+
                    "array_push($response, $"+ namaTableStorage +");"+
                    "}"+
                    "echo json_encode($response);"+
                "}"+
                "else if($_GET['act'] == 'insert'){"+
                    "$response = array();"+
                    "$param = array("+
                        "'uniq_"+ namaTableStorage +"' => $this->input->post('uniq_"+ namaTableStorage +"'), ";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        textAreaValuePHPCI += "'"+ formInputType +"' => $this->input->post('"+ formInputType +"'),";
                    }
                    textAreaValuePHPCI += ");";
                    // textAreaValuePHPCI += "$this->form_validation->set_rules('uniq_"+ namaTableStorage +"', 'uniq_"+ namaTableStorage +"', 'required');";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        textAreaValuePHPCI += "$this->form_validation->set_rules('"+ formInputType +"', '"+ formInputType +"', 'required');";
                    }
                    textAreaValuePHPCI += "if($this->form_validation->run() == true){"+
                        "$queryLogin = $this->crud_function_model->insertData('"+ namaTableStorage +"', $param);"+
                        "$message =  array("+
                            "'status' => '1',"+
                            "'message' => 'input berhasil'"+
                        ");"+
                        "array_push($response, $message);"+
                    "} else {"+
                        "$message =  array("+
                            "'status' => '2',"+
                            "'message' => validation_errors()"+
                        ");"+
                        "array_push($response, $message);"+
                    "}"+
                    "echo json_encode($response);"+
                "}"+

                "else if($_GET['act'] == 'update'){"+
                    "$response = array();"+
                    "$where = array("+
                        "'uniq_"+ namaTableStorage +"' => $this->input->post('uniq_"+ namaTableStorage +"')"+
                    ");"+
                    "$set = array(";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        textAreaValuePHPCI += "'"+ formInputType +"' => $this->input->post('"+ formInputType +"'),";
                    }
                    textAreaValuePHPCI += ");";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        textAreaValuePHPCI += "$this->form_validation->set_rules('"+ formInputType +"', '"+ formInputType +"', 'required');";
                    }
                    textAreaValuePHPCI += "if($this->form_validation->run() == true){"+
                        "$queryLogin = $this->crud_function_model->updateData('"+ namaTableStorage +"', $set, $where);"+
                        "$message =  array("+
                            "'status' => '1',"+
                            "'message' => 'input berhasil'"+
                        ");"+
                        "array_push($response, $message);"+
                    "} else {"+
                        "$message =  array("+
                            "'status' => '2',"+
                            "'message' => validation_errors()"+
                        ");"+
                        "array_push($response, $message);"+
                    "}"+
                    "echo json_encode($response);"+
                "}"+
                "else if($_GET['act'] == 'delete'){"+
                    "$response = array();"+
                    "$param = array("+
                        "'uniq_"+ namaTableStorage +"' => $_GET['uniq_"+ namaTableStorage +"'],"+
                    ");"+
                    "$this->crud_function_model->deleteData('"+ namaTableStorage +"', $param);"+
                        "$message =  array("+
                            "'status' => '1',"+
                            "'message' => 'delete berhasil'"+
                        ");"+
                        "array_push($response, $message);"+
                    "echo json_encode($response);"+
                "}"+
            "}"+
        "}"+
    "}";
    textAreaValuePHPCI += "</textarea>";
    $(".value-hasil-php-ci-class").html(textAreaValuePHPCI);



    // form
    let textAreaValue = "";
    textAreaValue += "<textarea class='text-area-value-form-class'>";
    textAreaValue += "<form action='#' class='form-" + namaTableStorage + "-" + idRandom + "' >";
    textAreaValue += "<input type='text' name='uniq_" + namaTableStorage + "' class='uniq_" + namaTableStorage + "' placeholder='" + namaTableStorage + "' hidden /> ";
    for (let i = 0; i < jumlahFildStorage; i++) {
        let formInputType = $(".form-input-type-" + i).val();
        let formSeleteType = $(".form-select-type-" + i + "").val();
        if (formSeleteType == "text") {
            textAreaValue += "<input type='text' name='" + formInputType + "' class='" + formInputType + "' placeholder='" + formInputType + "' /> ";
        } else if (formSeleteType == "password") {
            textAreaValue += "<input type='password' name='" + formInputType + "' class='" + formInputType + "' placeholder='" + formInputType + "' /> ";
        } else if (formSeleteType == "select") {
            textAreaValue += "<select name='" + formInputType + "' class='" + formInputType + "'>";
            textAreaValue += "<option value='#'>select</option>";
            textAreaValue += "<option value='1'>1</option>";
            textAreaValue += "<option value='2'>2</option>";
            textAreaValue += "<option value='3'>3</option>";
            textAreaValue += "</select> ";
        } else if (formSeleteType == "file") {
            textAreaValue += "<input type='file' name='" + formInputType + "' class='" + formInputType + "' placeholder='" + formInputType + "' /> ";
        }
    }
    textAreaValue += "<button type='submit' class='btn-" + namaTableStorage + "-insert-class'>Save</button>";
    textAreaValue += "</form>";
    textAreaValue += "<div class='class-"+namaTableStorage + "-view-edit-data'></div>";
    textAreaValue += "<div class='class-" + namaTableStorage + "-view-data'></div>";
    textAreaValue += "</textarea>";
    $(".value-hasil-form-class").html(textAreaValue);




    // js
    textAreaValueJs = "";
    textAreaValueJs += "<textarea class='text-area-value-form-class'>";
    textAreaValueJs += "$(document).ready(function(){"+
            "$('.uniq_" + namaTableStorage + "').val(new Date().getTime());"+
            "usersLoadDataAll();"+
        "});"+
    "function " + namaTableStorage + "LoadDataAll(){"+
            "let " + namaTableStorage + "DataResult = '';"+
            "$.ajax({"+
                "type : 'POST',"+
                "url : 'http://localhost:8080/cobaframework/users_api/load?act=load',"+
                "contentType: 'application/x-www-form-urlencoded; charset=utf-8',"+
                "dataType    : 'json',"+
                "data : '',"+
            "beforeSend: function() {"+
            "},"+
            "success : function(data){"+
                "for(var i=0; i < data.length; i++){";
                for (let i = 0; i < jumlahFildStorage; i++) {
                    let formInputType = $(".form-input-type-" + i).val();
                    textAreaValueJs += namaTableStorage + "DataResult += data[i]['"+ formInputType +"'];";
                }
                textAreaValueJs += namaTableStorage + "DataResult +=\"<button type='button' data='\"+data[i]['uniq_"+ namaTableStorage +"']+\"' class='btn-"+ namaTableStorage +"-form-edit'>Edit</button>\"";
                textAreaValueJs += namaTableStorage + "DataResult +=\"<button type='button' data='\"+data[i]['uniq_"+ namaTableStorage +"']+\"' class='btn-"+ namaTableStorage +"-form-delete'>Delete</button> <br />\"";
                textAreaValueJs += "}"+
                "$('.class-" + namaTableStorage + "-view-data').html(" + namaTableStorage + "DataResult);"+
                "}"+
            "}).done(function(){"+
            "});"+
        "}";
    textAreaValueJs += "$(document).on('click', '.btn-"+ namaTableStorage +"-form-edit', function(){"+
        "let dataId = $(this).attr('data');"+
        "let "+ namaTableStorage +"EditDataResult = '';"+
        "$.ajax({"+
            "type: 'POST',"+
            "url: 'http://localhost:8080/cobaframework/users_api/load?act=load&where_parameter=1&uniq_"+ namaTableStorage +"=' + dataId,"+
            "contentType: 'application/x-www-form-urlencoded; charset=utf-8',"+
            "dataType: 'json',"+
            "data: '',"+
            "beforeSend: function() {},"+
            "success: function(data) {"+
                ""+ namaTableStorage +"EditDataResult += \"<form action='#' class='form-edit-"+ namaTableStorage +"-"+ idRandom +"' >\"+"+
                "\"<input type='text' name='uniq_"+ namaTableStorage +"' class='uniq_"+ namaTableStorage +"' value='\"+data[0]['uniq_"+ namaTableStorage +"']+\"' />\"+";
                for (let i = 0; i < jumlahFildStorage; i++) {
                    let formInputType = $(".form-input-type-" + i).val();
                    textAreaValueJs += "\"<input type='text' name='"+ formInputType +"' class='"+ formInputType +"' placeholder='"+ formInputType +"' value='\"+ data[0]['"+ formInputType +"']+\"' />\"+";
                }
                textAreaValueJs += "\"<button type='submit' class='btn-"+ namaTableStorage +"-edit-class'>Simpan</button>\"+"+
                "\"</form>\";"+
                "$('.class-"+ namaTableStorage +"-view-edit-data').html("+ namaTableStorage +"EditDataResult);"+
            "}"+
        "}).done(function() {});"+
        "});";
    textAreaValueJs += "$(document).on('click', '.btn-"+ namaTableStorage +"-form-delete', function(){"+
        "let dataId = $(this).attr('data');"+
        "let "+ namaTableStorage +"DeleteDataResult = '';"+
        "$.ajax({"+
            "type: 'POST',"+
            "url: 'http://localhost:8080/cobaframework/users_api/load?act=delete&uniq_"+ namaTableStorage +"=' + dataId,"+
            "contentType: 'application/x-www-form-urlencoded; charset=utf-8',"+
            "dataType: 'json',"+
            "data: '',"+
            "beforeSend: function() {},"+
            "success: function(data) {"+
                "if(data[0]['status'] == 1){"+
                "console.log(data[0]['message']);"+
                namaTableStorage + "LoadDataAll();"+
                "} else if(data[0]['status'] == 2){"+
                "console.log(data[0]['message']);"+
                "}"+
            "}"+
        "}).done(function() {});"+
        "});";
    textAreaValueJs += "$(document).on('submit', '.form-edit-" + namaTableStorage + "-" + idRandom + "', function(){"+
        "$.ajax({"+
            "type : 'POST',"+
            "url : 'http://localhost:8080/cobaframework/users_api/load?act=update',"+
            "contentType: 'application/x-www-form-urlencoded; charset=utf-8',"+
            "dataType : 'json',"+
            "data : $(this).serialize(),"+
            "beforeSend: function() {"+
            "},"+
            "success : function(data){"+
                "if(data[0]['status'] == 1){"+
                "console.log(data[0]['message']);"+
                namaTableStorage + "LoadDataAll();"+
                "} else if(data[0]['status'] == 2){"+
                "console.log(data[0]['message']);"+
                "}"+
            "}"+
        "}).done(function(){"+
        "});"+
        "return false;"+
    "});";
    textAreaValueJs += "$('.form-" + namaTableStorage + "-" + idRandom + "').submit(function(){"+
        "$.ajax({"+
            "type : 'POST',"+
            "url : 'http://localhost:8080/cobaframework/users_api/load?act=insert',"+
            "contentType: 'application/x-www-form-urlencoded; charset=utf-8',"+
            "dataType : 'json',"+
            "data : $(this).serialize(),"+
            "beforeSend: function() {"+
            "},"+
            "success : function(data){"+
                "if(data[0]['status'] == 1){"+
                "console.log(data[0]['message']);"+
                namaTableStorage + "LoadDataAll();"+
                "} else if(data[0]['status'] == 2){"+
                "console.log(data[0]['message']);"+
                "}"+
            "}"+
        "}).done(function(){"+
        "});"+
        "return false;"+
    "});";
    textAreaValueJs += "</textarea>";
    $(".value-hasil-js-class").html(textAreaValueJs);
});