<?php  



class Dashboard extends CI_Controller{

	public function index()

	{

		$data['artikels'] 		= $this->model_awal_artikel->artikel_home();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/index', $data);

		$this->load->view('awal/footer');
		

	}

	public function faq()

	{

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/faq');

		$this->load->view('awal/footer');
		

	}

	public function jaminanhalal()

	{

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/jaminan-halal');

		$this->load->view('awal/footer');
		

	}

}



?>