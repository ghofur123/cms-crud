<?phpdefined('BASEPATH') OR exit('No direct script access allowed');
class sdfsd_api extends CI_Controller {
    public function __construct(){parent::__construct();
        $this->output->set_header( 'Access-Control-Allow-Origin: *' );
        $this->output->set_header( 'Access-Control-Allow-Credentials: true' );
        $this->output->set_header( 'Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS' );
        $this->output->set_header( 'Access-Control-Max-Age: 604800' );
        $this->output->set_header( 'Access-Control-Request-Headers: x-requested-with' );
        $this->output->set_header( 'Access-Control-Allow-Headers: x-requested-with, x-requested-by' );
        $this->load->database();$this->load->model('crud_function_model');
    }
    public function index(){

    }public function load(){
        if(empty($_GET['act'])){

        } else {
            if($_GET['act'] == 'load'){
                if($_GET['where_parameter'] == null || $_GET['where_parameter'] == ''){
                    $whereParam = '';
                }else {
                    $whereParam = array(
                        'uniq_sdfsd' => $_GET["uniq_sdfsd"]
                );}$response = array();$queryDataRead = $this->crud_function_model->readData('sdfsd', '', $whereParam, 'id_sdfsd desc');foreach($queryDataRead as $item){$sdfsd = array('id_sdfsd' => $item['id_sdfsd'],'uniq_sdfsd' => $item['uniq_sdfsd'],'sdfsdf' => $item['sdfsdf'],'sdfsd' => $item['sdfsd'],);array_push($response, $sdfsd);}echo json_encode($response);}if($_GET['act'] == 'insert'){$response = array();$param = array('uniq_sdfsd' => $this->input->post('uniq_sdfsd'), 'sdfsdf' => $this->input->post('sdfsdf'),'sdfsd' => $this->input->post('sdfsd'),);$this->form_validation->set_rules('sdfsdf', 'sdfsdf', 'required');$this->form_validation->set_rules('sdfsd', 'sdfsd', 'required');if($this->form_validation->run() == true){$queryLogin = $this->crud_function_model->insertData('sdfsd', $param);$message =  array('status' => '1','message' => 'input berhasil');array_push($response, $message);} else {$message =  array('status' => '2','message' => validation_errors());array_push($response, $message);}echo json_encode($response);}}}}