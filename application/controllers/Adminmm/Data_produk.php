<?php  



class Data_produk extends CI_Controller{



	public function index()

	{

		$data['produk'] = $this->model_produk->tampil_data()->result();;

		$this->load->view('templates_admin/header');

		$this->load->view('templates_admin/sidebar');

		$this->load->view('adminmm/list_produk', $data);

		$this->load->view('templates_admin/footer');

	}

	public function tambah_produk()

	{

		$this->load->view('templates_admin/header');

		$this->load->view('templates_admin/sidebar');

		$this->load->view('adminmm/tambah_produk');

		$this->load->view('templates_admin/footer');

	}

	public function tambah_aksi()

	{

		$nama_produk		= $this->input->post('nama_produk');

		$deskripsi			= $this->input->post('deskripsi');

		$harga_produk		= $this->input->post('harga_produk');

		$link_produk		= $this->input->post('link_produk');

		$gambar				= $_FILES['gambar']['name'];

		if($gambar = ''){}else{

			$config['upload_path'] 		= './uploads';

			$config['allowed_types']	= 'jpg|jpeg|png|gif';

			$this->load->library('upload', $config);

			if(!$this->upload->do_upload('gambar')){

			}else{

				$gambar = $this->upload->data('file_name');

			}

		}



		$data = array(

			'nama_produk'			=> $nama_produk,

			'deskripsi'				=> $deskripsi,

			'harga_produk'			=> $harga_produk,

			'link_produk'			=> $link_produk,

			'gambar'				=> $gambar,

			);



		$this->model_produk->tambah_produk($data, 'produk');

		redirect('Adminmm/Data_produk/tambah_produk');

	}

}