"$rand = rand(0000000000,9999999999).rand(0000000000,9999999999);"+
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
                                                            "'message' => 'upload gagal'"+
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
                                                                    let formInputType82 = $(".form-input-type-" + i).val();
                                                                    let formSeleteType82 = $(".form-select-type-" + i + "").val();
                                                                    if (formSeleteType82 == "text") {
                                                                        textAreaValuePHPCI += "'"+ formInputType82 +"' => $this->input->post('"+ formInputType82 +"'),";
                                                                    } else if (formSeleteType82 == "file") {
                                                                        textAreaValuePHPCI += "'"+ formInputType82 +"' => $this->upload->data('file_name'),";
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