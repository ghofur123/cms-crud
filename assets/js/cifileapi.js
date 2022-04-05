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
        "`uniq_"+ namaTableStorage +"` VARCHAR(200) NOT NULL,";
        for (let i = 0; i < jumlahFildStorage; i++) {
            let formInputType = $(".form-input-type-" + i).val();
            textAreaValueDB +="`"+ formInputType +"` VARCHAR(200) NULL DEFAULT '0',";
        }
        textAreaValueDB += "UNIQUE INDEX `uniq` (`uniq_"+ namaTableStorage +"`),"+
        "INDEX `key` (`id_"+ namaTableStorage +"`)"+
        ") COLLATE = 'latin1_swedish_ci' ENGINE = InnoDB;";
        textAreaValueDB += "</textarea>";
    $(".value-hasil-db-class").html(textAreaValueDB);


    // php ci
    let textAreaValuePHPCI = "";
    textAreaValuePHPCI += "<textarea class='text-area-value-form-class'>";
    textAreaValuePHPCI += "<?php"+
    "defined('BASEPATH') OR exit('No direct script access allowed');"+

    "class "+ namaTableStorage.charAt(0).toUpperCase() + namaTableStorage.slice(1) +"_api extends CI_Controller {"+
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
            "$this->load->view('coba/"+ namaTableStorage +"');"+
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
                    "$this->form_validation->set_rules('uniq_"+ namaTableStorage +"', 'uniq_"+ namaTableStorage +"', 'required');";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType3 = $(".form-input-type-" + i).val();
                        let formSeleteType3 = $(".form-select-type-" + i + "").val();
                        if (formSeleteType3 == "text") {
                            textAreaValuePHPCI += "$this->form_validation->set_rules('"+ formInputType3 +"', '"+ formInputType3 +"', 'required');";
                        }
                    }
                    textAreaValuePHPCI += "if($this->form_validation->run() == true){"+
                    "$rand = rand(00000000000000000000,99999999999999999999);"+
                    "$config_upload = array("+
                        "'file_name' => 'beritajatim_com'.$rand.'.jpg',"+
                        "'upload_path' => './uploads/',"+
                        "'allowed_types' => 'gif|jpg|png|jpeg|gif'"+

                    ");"+
                    "$this->load->library('upload', $config_upload);";
                    
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        let formSeleteType = $(".form-select-type-" + i + "").val();
                        if (formSeleteType == "file") {
                            textAreaValuePHPCI += "if ( ! $this->upload->do_upload('"+ formInputType +"')){"+
                                "$message =  array("+
                                    "'status' => '2',"+
                                    "'message' => $this->upload->display_errors()"+
                                ");"+
                                "array_push($response, $message);"+
                            "}else {"+
                                "$config_risize = array("+
                                    "'image_library' => 'gd2',"+
                                    "'source_image' => './uploads/'.$this->upload->data('file_name'),"+
                                    "'new_image' => './uploads/up/',"+
                                    "'create_thumb' => FALSE,"+
                                    "'maintain_ratio' => TRUE,"+
                                    "'width' => 500,"+
                                    "'height' => 500"+
                                ");"+
                                "$this->load->library('image_lib', $config_risize);"+
                                "$this->image_lib->resize();"+
                                "if ( ! $this->image_lib->resize())"+
                                "{"+
                                    "$message    = array("+
                                    "'status' => '2',"+
                                    "'message' => $this->image_lib->display_errors()"+
                                    ");"+
                                    "array_push($response, $message);"+
                                "} else {"+
                                    "unlink('./uploads/'.$this->upload->data('file_name'));"+
                                    "$message    = array("+
                                    "'status_risize' => '1',"+
                                    "'message_risize' => 'risize berhasil'"+
                                    ");"+
                                    "array_push($response, $message);"+

                                    "$config_wm = array("+
                                        "'source_image' => './uploads/up/'.$this->upload->data('file_name'),"+
                                        "'wm_text' => 'beritajatim.com',"+
                                        "'wm_type' => 'text',"+
                                        "'wm_font_path' => './system/fonts/texb.ttf',"+
                                        "'wm_font_size' => '11',"+
                                        "'wm_opacity' => '0,5',"+
                                        "'wm_font_color' => 'ffffff',"+
                                        "'wm_vrt_alignment' => 'middle',"+
                                        "'wm_hor_alignment' => 'center',"+
                                        "'wm_padding' => '20'"+
                                    ");"+
                                    "$this->image_lib->initialize($config_wm);"+
                                    "if(!$this->image_lib->watermark())"+
                                    "{"+
                                        "$message    = array("+
                                            "'status_watermark' => '2',"+
                                            "'message2' => $this->image_lib->display_errors()"+
                                        ");"+
                                        "array_push($response, $message);"+
                                    "} else {"+
                                        "$param = array("+
                                        "'uniq_"+ namaTableStorage +"' => $this->input->post('uniq_"+ namaTableStorage +"'), ";
                                        for (let i = 0; i < jumlahFildStorage; i++) {
                                            let formInputType2 = $(".form-input-type-" + i).val();
                                            let formSeleteType2 = $(".form-select-type-" + i + "").val();
                                            if (formSeleteType2 == "text") {
                                                textAreaValuePHPCI += "'"+ formInputType2 +"' => $this->input->post('"+ formInputType2 +"'),";
                                            } else if (formSeleteType2 == "file") {
                                                textAreaValuePHPCI += "'"+ formInputType2 +"' => $this->upload->data('file_name'),";
                                            }
                                        }
                                        textAreaValuePHPCI +=");"+
                                            "$queryLogin = $this->crud_function_model->insertData('"+ namaTableStorage +"', $param);"+
                                            "$message =  array("+
                                                "'status_watermark' => '1',"+
                                                "'message_watermark' => 'watermark berhasil',"+
                                                "'status' => '1',"+
                                                "'message' => 'input berhasil'"+
                                            ");"+
                                            "array_push($response, $message);"+
                                    "}"+
                                "}"+
                                
                            "}";
                        }
                    }
                    textAreaValuePHPCI +="} else {"+
                        "$message =  array("+
                            "'status' => '2',"+
                            "'message' => validation_errors()"+
                        ");"+
                        "array_push($response, $message);"+
                    "}"+
                    "echo json_encode($response);";
                textAreaValuePHPCI += "}"+

                "else if($_GET['act'] == 'update'){"+
                    "$response = array();";
                    textAreaValuePHPCI += "$this->form_validation->set_rules('uniq_"+ namaTableStorage +"', 'uniq_"+ namaTableStorage +"', 'required');";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        let formSeleteType2 = $(".form-select-type-" + i + "").val();
                        if (formSeleteType2 == "text") {
                        textAreaValuePHPCI += "$this->form_validation->set_rules('"+ formInputType +"', '"+ formInputType +"', 'required');";
                        textAreaValuePHPCI += "if($this->form_validation->run() == true){";
                                for (let i = 0; i < jumlahFildStorage; i++) {
                                    let formInputType6 = $(".form-input-type-" + i).val();
                                    let formSeleteType6 = $(".form-select-type-" + i + "").val();
                                    if (formSeleteType6 == "file") {
                                        textAreaValuePHPCI += "if($_FILES['"+formInputType6+"']['name'] == null || $_FILES['"+formInputType6+"']['name'] == ''){"+
                                            "$where = array("+
                                                "'uniq_"+ namaTableStorage +"' => $this->input->post('uniq_"+ namaTableStorage +"')"+
                                            ");"+
                                            "$set = array(";
                                            for (let i = 0; i < jumlahFildStorage; i++) {
                                                let formInputType7 = $(".form-input-type-" + i).val();
                                                let formSeleteType7 = $(".form-select-type-" + i + "").val();
                                                if (formSeleteType7 == "text") {
                                                            textAreaValuePHPCI += "'"+ formInputType7 +"' => $this->input->post('"+ formInputType7 +"'),";
                                                }
                                            }
                                            textAreaValuePHPCI += ");"+
                                            "$queryLogin = $this->crud_function_model->updateData('"+ namaTableStorage +"', $set, $where);"+
                                            "$message =  array("+
                                                "'status' => '1',"+
                                                "'message' => 'input berhasil'"+
                                            ");"+
                                            "array_push($response, $message);"+
                                        "}else {"+
                                        


                                            "$rand = rand(00000000000000000000,99999999999999999999);"+
                                            "$config_upload = array("+
                                                "'file_name' => 'beritajatim_com'.$rand.'.jpg',"+
                                                "'upload_path' => './uploads/',"+
                                                "'allowed_types' => 'gif|jpg|png|jpeg|gif'"+
                        
                                            ");"+
                                            "$this->load->library('upload', $config_upload);";
                                            
                                            for (let i = 0; i < jumlahFildStorage; i++) {
                                                let formInputType8 = $(".form-input-type-" + i).val();
                                                let formSeleteType8 = $(".form-select-type-" + i + "").val();
                                                if (formSeleteType8 == "file") {
                                                    textAreaValuePHPCI += "if ( ! $this->upload->do_upload('"+ formInputType8 +"')){"+
                                                        "$message =  array("+
                                                            "'status' => '2',"+
                                                            "'message' => $this->upload->display_errors()"+
                                                        ");"+
                                                        "array_push($response, $message);"+
                                                    "}else {"+
                                                    "$whereParamDelete    = array("+
                                                        "'uniq_"+ namaTableStorage +"' => $this->input->post('uniq_"+ namaTableStorage +"')"+
                                                    ");"+
                                                        "$queryDataReadDelete = $this->crud_function_model->readData('"+ namaTableStorage +"', '', $whereParamDelete, '');"+
                                                        "foreach ($queryDataReadDelete as $item) {"+
                                                            "unlink('./uploads/up/' . $item['"+ formInputType8 +"']);"+
                                                        "}"+
                                                        "$config_risize = array("+
                                                            "'image_library' => 'gd2',"+
                                                            "'source_image' => './uploads/'.$this->upload->data('file_name'),"+
                                                            "'new_image' => './uploads/up/',"+
                                                            "'create_thumb' => FALSE,"+
                                                            "'maintain_ratio' => TRUE,"+
                                                            "'width' => 500,"+
                                                            "'height' => 500"+
                                                        ");"+
                                                        "$this->load->library('image_lib', $config_risize);"+
                                                        "$this->image_lib->resize();"+
                                                        "if ( ! $this->image_lib->resize())"+
                                                        "{"+
                                                            "$message    = array("+
                                                            "'status' => '2',"+
                                                            "'message' => $this->image_lib->display_errors()"+
                                                            ");"+
                                                            "array_push($response, $message);"+
                                                        "} else {"+
                                                            "unlink('./uploads/'.$this->upload->data('file_name'));"+
                                                            "$message    = array("+
                                                            "'status_risize' => '1',"+
                                                            "'message_risize' => 'risize berhasil'"+
                                                            ");"+
                                                            "array_push($response, $message);"+
                        
                                                            "$config_wm = array("+
                                                                "'source_image' => './uploads/up/'.$this->upload->data('file_name'),"+
                                                                "'wm_text' => 'beritajatim.com',"+
                                                                "'wm_type' => 'text',"+
                                                                "'wm_font_path' => './system/fonts/texb.ttf',"+
                                                                "'wm_font_size' => '11',"+
                                                                "'wm_opacity' => '0,5',"+
                                                                "'wm_font_color' => 'ffffff',"+
                                                                "'wm_vrt_alignment' => 'middle',"+
                                                                "'wm_hor_alignment' => 'center',"+
                                                                "'wm_padding' => '20'"+
                                                            ");"+
                                                            "$this->image_lib->initialize($config_wm);"+
                                                            "if(!$this->image_lib->watermark())"+
                                                            "{"+
                                                                "$message    = array("+
                                                                    "'status_watermark' => '2',"+
                                                                    "'message2' => $this->image_lib->display_errors()"+
                                                                ");"+
                                                                "array_push($response, $message);"+
                                                            "} else {"+
                                                                "$set = array(";
                                                                for (let i = 0; i < jumlahFildStorage; i++) {
                                                                    let formInputType82 = $(".form-input-type-" + i).val();
                                                                    let formSeleteType82 = $(".form-select-type-" + i + "").val();
                                                                    if (formSeleteType82 == "text") {
                                                                        textAreaValuePHPCI += "'"+ formInputType82 +"' => $this->input->post('"+ formInputType82 +"'),";
                                                                    } else if (formSeleteType82 == "file") {
                                                                        textAreaValuePHPCI += "'"+ formInputType82 +"' => $this->upload->data('file_name'),";
                                                                    }
                                                                }
                                                                textAreaValuePHPCI +=");"+

                                                                    "$where = array("+
                                                                        "'uniq_"+ namaTableStorage +"' => $this->input->post('uniq_"+ namaTableStorage +"')"+
                                                                    ");"+
                                                                    "$queryLogin = $this->crud_function_model->updateData('"+ namaTableStorage +"', $set, $where);"+
                                            
                                                                    "array_push($response, $message);"+
                                                            "}"+
                                                        "}"+
                                                        
                                                    "}";
                                                }
                                            }



                                        textAreaValuePHPCI +="}";
                                    }
                                }
                            textAreaValuePHPCI +="} else {"+
                                "$message =  array("+
                                    "'status' => '2',"+
                                    "'message' => validation_errors()"+
                                ");"+
                                "array_push($response, $message);"+
                            "}";
                        }
                    }
                    
                    textAreaValuePHPCI += "echo json_encode($response);"+
                "}"+
                "else if($_GET['act'] == 'delete'){"+
                    "$response = array();"+
                    "$whereParam = array("+
                        "'uniq_"+ namaTableStorage +"' => $_GET['uniq_"+ namaTableStorage +"'],"+
                    ");"+

                    "$queryDataRead = $this->crud_function_model->readData('"+ namaTableStorage +"', '', $whereParam, '');"+
                    "foreach($queryDataRead as $item){";
                    for (let i = 0; i < jumlahFildStorage; i++) {
                        let formInputType = $(".form-input-type-" + i).val();
                        let formSeleteType = $(".form-select-type-" + i + "").val();
                        if (formSeleteType == "file") {
                            textAreaValuePHPCI += "unlink('./uploads/up/'.$item['"+formInputType+"']);";
                        }
                    }
                    textAreaValuePHPCI += "}"+
                    "$this->crud_function_model->deleteData('"+ namaTableStorage +"', $whereParam);"+
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
    textAreaValue += "<textarea class='text-area-value-form-class'>"+
            "<form action='#' method='post' class='form-" + namaTableStorage + "-" + idRandom + "' enctype='multipart/form-data'>";
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
            namaTableStorage + "LoadDataAll();"+
        "});"+
    "function " + namaTableStorage + "LoadDataAll(){"+
            "let " + namaTableStorage + "DataResult = '';"+
            "$.ajax({"+
                "type : 'POST',"+
                "url : '" + namaTableStorage + "_api/load?act=load',"+
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
        textAreaValueJs += "$('.form-" + namaTableStorage + "-" + idRandom + "').submit(function(){"+
        
        "var formData = new FormData();"+
        "let uniq_"+ namaTableStorage +"Text = $('input[name=uniq_"+ namaTableStorage +"]').val();"+
        "formData.append('uniq_"+ namaTableStorage +"', uniq_"+ namaTableStorage +"Text);";

        for (let i = 0; i < jumlahFildStorage; i++) {
            let formInputType = $(".form-input-type-" + i).val();
            let formSeleteType = $(".form-select-type-" + i + "").val();
            if (formSeleteType == "text") {
                textAreaValueJs += "let "+ formInputType +"Text = $('input[name="+ formInputType +"]').val();"+
                "formData.append('"+ formInputType +"', "+ formInputType +"Text);";
            } else if (formSeleteType == "file") {
                textAreaValueJs +="let "+ formInputType +"File = $('input[name="+ formInputType +"]');"+
                "let "+ formInputType +"FileToUpload = "+ formInputType +"File[0].files[0];"+
                "formData.append('"+ formInputType +"', "+ formInputType +"FileToUpload);";
            }
        }

        textAreaValueJs +="$.ajax({"+
            "type : 'POST',"+
            "url : '" + namaTableStorage + "_api/load?act=insert',"+
            "data : formData,"+
            "processData:false,"+
            "contentType:false,"+
            "cache:false,"+
            "dataType: 'json',"+
            "beforeSend: function() {"+
            "},"+
            "success : function(data){"+
                "if(data[1]['status'] == 1){"+
                    "console.log(data[1]['message']);"+
                    namaTableStorage + "LoadDataAll();"+
                "} else{"+
                    "console.log(data[1]['message']);"+
                "}"+
            "}"+
        "}).done(function(){"+
        "});"+
        "return false;"+
    "});";
    textAreaValueJs += "$(document).on('click', '.btn-"+ namaTableStorage +"-form-edit', function(){"+
        "let dataId = $(this).attr('data');"+
        "let "+ namaTableStorage +"EditDataResult = '';"+
        "$.ajax({"+
            "type: 'POST',"+
            "url: '" + namaTableStorage + "_api/load?act=load&where_parameter=1&uniq_"+ namaTableStorage +"=' + dataId,"+
            "contentType: 'application/x-www-form-urlencoded; charset=utf-8',"+
            "dataType: 'json',"+
            "data: '',"+
            "beforeSend: function() {},"+
            "success: function(data) {"+
                ""+ namaTableStorage +"EditDataResult += \"<form action='#' class='form-edit-"+ namaTableStorage +"-"+ idRandom +"' enctype='multipart/form-data'>\"+"+
                "\"<input type='text' name='uniq_"+ namaTableStorage +"_edit' class='uniq_"+ namaTableStorage +"' value='\"+data[0]['uniq_"+ namaTableStorage +"']+\"' />\"+";
                for (let i = 0; i < jumlahFildStorage; i++) {
                    let formInputType = $(".form-input-type-" + i).val();
                    let formSeleteType = $(".form-select-type-" + i + "").val();
                    if (formSeleteType == "text") {
                        textAreaValueJs += "\"<input type='text' name='"+ formInputType +"_edit' class='"+ formInputType +"' placeholder='"+ formInputType +"' value='\"+ data[0]['"+ formInputType +"']+\"' />\"+";
                    } else if (formSeleteType == "file") {
                        textAreaValueJs += "\"<image src='../uploads/up/\"+ data[0]['"+ formInputType +"']+\"'/>\"+"+
                        "\"<input type='file' name='"+ formInputType +"_edit' class='"+ formInputType +"' placeholder='"+ formInputType +"' value='\"+ data[0]['"+ formInputType +"']+\"' />\"+";
                    }
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
            "url: '" + namaTableStorage + "_api/load?act=delete&uniq_"+ namaTableStorage +"=' + dataId,"+
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
        "var formData = new FormData();"+
            "let uniq_"+ namaTableStorage +"Text = $('input[name=uniq_"+ namaTableStorage +"_edit]').val();"+
            "formData.append('uniq_"+ namaTableStorage +"', uniq_"+ namaTableStorage +"Text);";

            for (let i = 0; i < jumlahFildStorage; i++) {
                let formInputType = $(".form-input-type-" + i).val();
                let formSeleteType = $(".form-select-type-" + i + "").val();
                if (formSeleteType == "text") {
                    textAreaValueJs += "let "+ formInputType +"Text = $('input[name="+ formInputType +"_edit]').val();"+
                    "formData.append('"+ formInputType +"', "+ formInputType +"Text);";
                } else if (formSeleteType == "file") {
                    textAreaValueJs +="let "+ formInputType +"File = $('input[name="+ formInputType +"_edit]');"+
                    "let "+ formInputType +"FileToUpload = "+ formInputType +"File[0].files[0];"+
                    "formData.append('"+ formInputType +"', "+ formInputType +"FileToUpload);";
                }
            }
            textAreaValueJs +="$.ajax({"+
            "type : 'POST',"+
            "url : '" + namaTableStorage + "_api/load?act=update',"+
            "data : formData,"+
            "processData:false,"+
            "contentType:false,"+
            "cache:false,"+
            "dataType: 'json',"+
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