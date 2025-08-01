<?php  

class Artikel_kami extends CI_Controller{


	function __construct(){
        parent::__construct();
        //load libary pagination
        $this->load->library('pagination');
 
        //load the department_model
        $this->load->model('Model_artikel');
    }



	public function index()

	{


        //konfigurasi pagination
        $config['base_url'] 		= site_url('Artikel_kami/index'); //site url
        $config['total_rows'] 		= $this->db->count_all('artikel'); //total row
        $config['per_page'] 		= 20;  //show record per halaman
        $config["uri_segment"] 		= 3;  // uri parameter
        $choice 					= $config["total_rows"] / $config["per_page"];
        $config["num_links"] 		= floor($choice);
 
        // Membuat Style pagination untuk BootStrap v4
          $config['first_link']       = 'First';
        $config['last_link']        = 'Last';
        $config['next_link']        = 'Next';
        $config['prev_link']        = 'Prev';
        $config['full_tag_open']    = '<div class="pagging text-center"><nav><ul class="pagination justify-content-center">';
        $config['full_tag_close']   = '</ul></nav></div>';
        $config['num_tag_open']     = '<li class="page-item"><span class="page-link">';
        $config['num_tag_close']    = '</span></li>';
        $config['cur_tag_open']     = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close']    = '<span class="sr-only">(current)</span></span></li>';
        $config['next_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['next_tagl_close']  = '<span aria-hidden="true">&raquo;</span></span></li>';
        $config['prev_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['prev_tagl_close']  = '</span>Next</li>';
        $config['first_tag_open']   = '<li class="page-item"><span class="page-link">';
        $config['first_tagl_close'] = '</span></li>';
        $config['last_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['last_tagl_close']  = '</span></li>';
 
        $this->pagination->initialize($config);
        $data['page'] = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
 
        //panggil function get_mahasiswa_list yang ada pada mmodel mahasiswa_model. 
        $data['data'] = $this->model_artikel->get_artikel_list($config["per_page"], $data['page']);           
 
        $data['pagination'] = $this->pagination->create_links();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/artikel_kami', $data);

		$this->load->view('awal/footer');
		
	}

	public function lihat_artikel($id_artikel)

	{
		$where = array('id_artikel'  => $id_artikel);

		$data['kategori'] 		= $this->model_artikel->get_nama();

		$data['artikel'] 		= $this->model_artikel->edit_artikel($where, 'artikel')->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/lihat_artikel', $data);
		
		

		$this->load->view('awal/footer');

	}

	public function kehamilan()
	{
		$data['kategori'] 	= $this->model_awal_artikel->get_nama();

		$data['kehamilan'] 	= $this->model_awal_artikel->data_kehamilan()->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/kehamilan', $data);

		$this->load->view('awal/footer');

	}

	public function menyusui()
	{
		$data['kategori'] 	= $this->model_awal_artikel->get_nama();

		$data['menyusui'] 	= $this->model_awal_artikel->data_menyusui()->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/menyusui', $data);

		$this->load->view('awal/footer');

	}

	public function parenting()
	{
		$data['kategori'] 	= $this->model_awal_artikel->get_nama();

		$data['parenting'] 	= $this->model_awal_artikel->data_parenting()->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/parenting', $data);

		$this->load->view('awal/footer');

	}

	public function momslife()
	{
		$data['kategori'] 	= $this->model_awal_artikel->get_nama();

		$data['momslifes'] 	= $this->model_awal_artikel->data_momslife()->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/momslife', $data);

		$this->load->view('awal/footer');

	}



}
