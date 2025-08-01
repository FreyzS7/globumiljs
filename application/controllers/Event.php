<?php  



class Event extends CI_Controller{


	public function index()

	{

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/event');

		$this->load->view('awal/footer');
		
	}

	public function lihat_event()

	{

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/lihat_event');

		$this->load->view('awal/footer');
		
	}

	public function lihat_event2()

	{

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/lihat_event2');

		$this->load->view('awal/footer');
		
	}
}