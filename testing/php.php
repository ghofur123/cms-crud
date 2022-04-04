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
    "'status' => '1',"+
    "'message2' => $this->image_lib->display_errors()"+
    ");"+
    "array_push($response, $message);"+
"} else {"+
"}";