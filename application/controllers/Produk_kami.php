<?php  

class Produk_kami extends CI_Controller{



	public function index()

	{

		$data['produk'] = $this->model_produk_awal->tampil_data()->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/produk', $data);
		
		$this->load->view('awal/testi_produk');

		$this->load->view('awal/footer');

	}

	public function tampil_produk($id_produk)

	{

		$where = array('id_produk'  => $id_produk);

		$data['produk'] 		= $this->model_produk_awal->detail_produk($where, 'produk')->result();

		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/produk_kami', $data);

		$this->load->view('awal/footer');

	}

	public function produk_kami2()

	{
		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/produk_kami2');

		$this->load->view('awal/footer');

	}

	public function testi_produk()

	{
		
		
		$this->load->view('awal/header');

		$this->load->view('awal/sidebar');

		$this->load->view('awal/testi_produk');

		$this->load->view('awal/footer');

	}
}
