$(".btn-table-jumlah-class").click(function() {
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
$(".btn-form-jumlah-action-class").click(function() {
    let idRandom = new Date().getTime();
    let jumlahFildStorage = localStorage.getItem("jumlah-fild");
    let namaTableStorage = localStorage.getItem("namaTable");

    let textAreaValue = "";
    textAreaValue += "<textarea class='text-area-value-form-class'>";
    textAreaValue += "<form action='#' class='form-" + namaTableStorage + "-" + idRandom + "' >";
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
    textAreaValue += "<button type='button' class='btn-" + namaTableStorage + "insert-class'>Save</button>";
    textAreaValue += "</form>";
    textAreaValue += "<div class='"+namaTableStorage + "-view-edit-class'></div>";
    textAreaValue += "<div class='"+namaTableStorage + "-view-class'></div>";
    textAreaValue += "</textarea>";
    $(".value-hasil-form-class").html(textAreaValue);

    // javascript
    let textAreaValueJs = "";
    textAreaValueJs += "<textarea class='text-area-value-form-class'>";


    textAreaValueJs += "$(document).ready(function(){";
    textAreaValueJs += namaTableStorage + "LoadFunction();";
    textAreaValueJs += "});";

    // start insert 
    textAreaValueJs += "$(document).on('click', '.btn-" + namaTableStorage + "insert-class', function(){";
    textAreaValueJs += "let id" + namaTableStorage + "Random = new Date().getTime();";
            // getset form insert
    let statusFileOrNot = "";
    for (let i = 0; i < jumlahFildStorage; i++) {
        let formInputType = $(".form-input-type-" + i).val();
        let formSeleteType = $(".form-select-type-" + i + "").val();
        if (formSeleteType == "file") {
            statusFileOrNot = 1;
            textAreaValueJs += "let " + formInputType + " = $('." + formInputType + "').get(0).files[0];";
            textAreaValueJs += "let img" + namaTableStorage + "gambar = storageRef.child('" + namaTableStorage + "/' + id" + namaTableStorage + "Random + '-' + " + formInputType + ".name).put(" + formInputType + ");";
        } else {
            textAreaValueJs += "let " + formInputType + " = $('." + formInputType + "').val();";
        }
    }
            // value db insert
    if(statusFileOrNot == 1){
        textAreaValueJs += "img" + namaTableStorage + "gambar.on('state_changed', function (snapshot) {"+
        "let progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;"+
        "console.log(progress);"+
        "}, function (error) {"+
            "console.log(error);"+
        "}, function () {"+
            "img" + namaTableStorage + "gambar.snapshot.ref.getDownloadURL().then(function (urlGetDownload) {"+
                "console.log(urlGetDownload);"+
                "let dbInsert" + namaTableStorage + " = rootRef.ref('" + namaTableStorage + "/' + id" + namaTableStorage +"Random);"+
                "dbInsert" + namaTableStorage + ".set({"+
                    "id_uploads: id" + namaTableStorage +"Random,";
                    for (let ii = 0; ii < jumlahFildStorage; ii++) {
                        let kommaEnd = "";
                        if (ii == (jumlahFildStorage - 1)) {
                            kommaEnd = "";
                        } else {
                            kommaEnd = ",";
                        }
                        let formInputType2 = $(".form-input-type-" + ii).val();
                        let formSeleteType2 = $(".form-select-type-" + ii + "").val();
                        if (formSeleteType2 == "file") {
                            textAreaValueJs += formInputType2 + "_link : urlGetDownload, "+ 
                            formInputType2 + " : id" + namaTableStorage +"Random +\"-\"+" + formInputType2 + ".name" + kommaEnd + " ";
                        } else {
                            textAreaValueJs += formInputType2 + " : " + formInputType2 + kommaEnd;
                        }
                    }
                textAreaValueJs += "});"+
            "});"+
            
        "});"+
        "});";
    } else {
        console.log("tidak ada file");
        textAreaValueJs += "let dbInsert" + namaTableStorage + " = rootRef.ref('" + namaTableStorage + "/' + id" + namaTableStorage + "Random);";
        textAreaValueJs += "dbInsert" + namaTableStorage + ".set({";
        textAreaValueJs += "id_" + namaTableStorage + ": id" + namaTableStorage + "Random, ";
        for (let ii = 0; ii < jumlahFildStorage; ii++) {
            let kommaEnd = "";
            if (ii == (jumlahFildStorage - 1)) {
                kommaEnd = "";
            } else {
                kommaEnd = ",";
            }
            let formInputType2 = $(".form-input-type-" + ii).val();
            let formSeleteType2 = $(".form-select-type-" + ii + "").val();
            if (formSeleteType2 == "file") {
                textAreaValueJs += formInputType2 + " : " + formInputType2 + ".name" + kommaEnd + " ";
            } else {
                textAreaValueJs += formInputType2 + " : " + formInputType2 + kommaEnd;
            }
        }
        textAreaValueJs += "});";
        textAreaValueJs += "});";
    }
    // end btn insert




    // load data start
    textAreaValueJs += "function " + namaTableStorage + "LoadFunction(){" +
        "let " + namaTableStorage + "Array = '';" +
        "let " + namaTableStorage + "Ref = rootRef.ref('" + namaTableStorage + "/');" +
        namaTableStorage + "Ref.on('child_added', function(data) {" +
        "let dataValue" + namaTableStorage + " = data.val();" +
        namaTableStorage + "Array += dataValue" + namaTableStorage + ".id_" + namaTableStorage + ";";
    for (let i = 0; i < jumlahFildStorage; i++) {
        let formInputType3 = $(".form-input-type-" + i).val();
        textAreaValueJs += namaTableStorage + "Array += dataValue" + namaTableStorage + "." + formInputType3 + ";";
    }
    textAreaValueJs += namaTableStorage + "Array += \"<button class='" + namaTableStorage + "-edit-class' data='\"+dataValue" + namaTableStorage + ".id_" + namaTableStorage + "+\"'>Edit</button>\";";
    let statusFileImage = "";
    for (let im = 0; im < jumlahFildStorage; im++) {
        let formInputTypeVerif = $(".form-input-type-" + im).val();
        let formSeleteTypeVerif = $(".form-select-type-" + im + "").val();
        if (formSeleteTypeVerif == "file") {
            statusFileImage = "\"+dataValue"+namaTableStorage+"."+formInputTypeVerif+"+\"";
        }
    }
    textAreaValueJs += namaTableStorage + "Array += \"<button class='" + namaTableStorage + "-delete-class' data='\"+dataValue" + namaTableStorage + ".id_" + namaTableStorage + "+\"' data2='"+statusFileImage+"'>Delete</button>\";";
    
    
    textAreaValueJs += "" +
        "$('." + namaTableStorage + "-view-class').html(" + namaTableStorage + "Array)" +
        "});" +
        "}";
    // load data end




    // edit form
    textAreaValueJs += "$(document).on('click', '." + namaTableStorage + "-edit-class', function(){";
    textAreaValueJs += "let " + namaTableStorage + "Id = $(this).attr('data');";
    textAreaValueJs += "let " + namaTableStorage + "Ref = rootRef.ref('" + namaTableStorage + "/' + " + namaTableStorage + "Id);";
    textAreaValueJs += namaTableStorage + "Ref.on('value', function(data){";
    textAreaValueJs += "let " + namaTableStorage + "ValueData = data.val();";
    textAreaValueJs += "let " + namaTableStorage + "ValueArray = '';";
    textAreaValueJs += namaTableStorage + "ValueArray +=\"<input type='text' class='" + namaTableStorage + "Id-edit' value='\"+" + namaTableStorage + "Id+\"' >\";";
    for (let i = 0; i < jumlahFildStorage; i++) {
        let formInputType3 = $(".form-input-type-" + i).val();
        let formSeleteType3 = $(".form-select-type-" + i + "").val();
        console.log("pllpppp:" + formSeleteType3);
        if (formSeleteType3 == "text") {
            textAreaValueJs += namaTableStorage + "ValueArray +=\"<input type='text' class='" + formInputType3 + "-edit' value='\"+" + namaTableStorage + "ValueData." + formInputType3 + "+\"' >\";";
        } else if(formSeleteType3 == "file"){
            textAreaValueJs += namaTableStorage + "ValueArray +=\"<img src='\" + "+namaTableStorage + "ValueData."+formInputType3+"_link + \"' style='width:50px; height:50px;' >\";";
            textAreaValueJs += namaTableStorage + "ValueArray +=\"<input type='file' class='" + formInputType3 + "-edit' value='\"+" + namaTableStorage + "ValueData." + formInputType3 + "+\"' >\";";
            textAreaValueJs += namaTableStorage + "ValueArray +=\"<input type='text' class='" + formInputType3 + "-edit-file-lama' value='\"+" + namaTableStorage + "ValueData." + formInputType3 + "+\"' hidden >\";";
        }
    }
    textAreaValueJs += namaTableStorage + "ValueArray +='<button class=\"btn-" + namaTableStorage + "-edit-class\">Edit</button>';";
    textAreaValueJs += "$('." + namaTableStorage + "-view-edit-class').html(" + namaTableStorage + "ValueArray);";
    textAreaValueJs += "});";
    textAreaValueJs += "});";
    // end edit form



// start edit 
textAreaValueJs += "$(document).on('click', '.btn-" + namaTableStorage + "-edit-class', function(){";
textAreaValueJs += "let id" + namaTableStorage + " = $('."+namaTableStorage+"Id-edit').val();";
        // getset form edit
let statusFileOrNotEdit = "";
for (let i = 0; i < jumlahFildStorage; i++) {
    let formInputTypeEdit = $(".form-input-type-" + i).val();
    let formSeleteTypeEdit = $(".form-select-type-" + i + "").val();
    if (formSeleteTypeEdit == "file") {
        statusFileOrNotEdit = 1;
        textAreaValueJs += "let " + formInputTypeEdit + " = $('." + formInputTypeEdit + "-edit').get(0).files[0];";
        textAreaValueJs += "let "+namaTableStorage + "GambarEdit = storageRef.child('" + namaTableStorage + "/' + id" + namaTableStorage + " + '-' + " + formInputTypeEdit + ".name).put(" + formInputTypeEdit + ");";

        textAreaValueJs += "let " + formInputTypeEdit + "FileLama = $('." + formInputTypeEdit + "-edit-file-lama').val();";
        // delet file lama
        textAreaValueJs += "let "+ namaTableStorage +"RefDelete = storageRef.child('"+namaTableStorage+"/' + "+formInputTypeEdit+"FileLama);";
        textAreaValueJs += namaTableStorage +"RefDelete.delete().then(function() {}).catch(function(error) {});";
    } else {
        textAreaValueJs += "let " + formInputTypeEdit + " = $('." + formInputTypeEdit + "-edit').val();";
    }
}
        // value db edit
if(statusFileOrNotEdit == 1){
    textAreaValueJs += namaTableStorage + "GambarEdit.on('state_changed', function (snapshot) {"+
    "}, function (error) {"+
        "console.log(error);"+
    "}, function () {"+
        namaTableStorage + "GambarEdit.snapshot.ref.getDownloadURL().then(function (urlGetDownload) {"+
            "console.log(urlGetDownload);"+
            "let " + namaTableStorage + "EditDB = rootRef.ref('" + namaTableStorage + "/' + id" + namaTableStorage +");"+
            namaTableStorage + "EditDB.set({"+
                "id_uploads: id" + namaTableStorage +",";
                for (let ii = 0; ii < jumlahFildStorage; ii++) {
                    let kommaEnd = "";
                    if (ii == (jumlahFildStorage - 1)) {
                        kommaEnd = "";
                    } else {
                        kommaEnd = ",";
                    }
                    let formInputType2 = $(".form-input-type-" + ii).val();
                    let formSeleteType2 = $(".form-select-type-" + ii + "").val();
                    if (formSeleteType2 == "file") {
                        textAreaValueJs += formInputType2 + "_link : urlGetDownload, "+ 
                        formInputType2 + " : id" + namaTableStorage +"+\"-\"+" + formInputType2 + ".name" + kommaEnd + " ";
                    } else {
                        textAreaValueJs += formInputType2 + " : " + formInputType2 + kommaEnd;
                    }
                }
            textAreaValueJs += "});"+
        "});"+
    "});"+
    "});";
} else {
    console.log("tidak ada file");
    textAreaValueJs += "let " + namaTableStorage + "EditDB = rootRef.ref('" + namaTableStorage + "/' + id" + namaTableStorage + ");";
    textAreaValueJs += "" + namaTableStorage + "EditDB.set({";
    textAreaValueJs += "id_" + namaTableStorage + ": id" + namaTableStorage + ", ";
    for (let ii = 0; ii < jumlahFildStorage; ii++) {
        let kommaEnd = "";
        if (ii == (jumlahFildStorage - 1)) {
            kommaEnd = "";
        } else {
            kommaEnd = ",";
        }
        let formInputType2 = $(".form-input-type-" + ii).val();
        let formSeleteType2 = $(".form-select-type-" + ii + "").val();
        if (formSeleteType2 == "file") {
            textAreaValueJs += formInputType2 + " : id" + namaTableStorage +"-" + formInputType2 + ".name" + kommaEnd + " ";
        } else {
            textAreaValueJs += formInputType2 + " : " + formInputType2 + kommaEnd;
        }
    }
    textAreaValueJs += "});";
    textAreaValueJs += "});";
}
// end edit

    



    // star delete
    textAreaValueJs += "$(document).on('click', '."+ namaTableStorage + "-delete-class', function(){";
    textAreaValueJs += "let "+namaTableStorage+"Id = $(this).attr('data');";
    textAreaValueJs += "let "+namaTableStorage+"RefDelete = rootRef.ref('"+namaTableStorage+"/' + "+namaTableStorage+"Id);";
    textAreaValueJs += ""+namaTableStorage+"RefDelete.remove();";

    for (let i = 0; i < jumlahFildStorage; i++) {
        let formInputTypeDelete = $(".form-input-type-" + i).val();
        let formSeleteTypeDelete = $(".form-select-type-" + i + "").val();
        if (formSeleteTypeDelete == "file") {
            textAreaValueJs += "let "+formInputTypeDelete+"ImageFile = $(this).attr('data2');";
            textAreaValueJs += "let "+formInputTypeDelete+"RefDelete = storageRef.child('"+namaTableStorage+"/' + "+formInputTypeDelete+"ImageFile);";
            textAreaValueJs += formInputTypeDelete+"RefDelete.delete().then(function() {}).catch(function(error) {});";
        }
    }
    textAreaValueJs += namaTableStorage + "LoadFunction();"+
    "});";
    // end delete
    textAreaValueJs += "</textarea>";
    $(".value-hasil-js-class").html(textAreaValueJs);
});