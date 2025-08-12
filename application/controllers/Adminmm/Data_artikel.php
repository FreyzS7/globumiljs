<?php  



class Data_artikel extends CI_Controller{



	public function index()

	{

		$data['artikel'] = $this->model_artikel->tampil_data();

		$this->load->view('templates_admin/header');

		$this->load->view('templates_admin/sidebar');

		$this->load->view('adminmm/tampil_artikel', $data);

		$this->load->view('templates_admin/footer');

	}



	public function tambah_artikel()

	{

		$data['kategori'] 		= $this->model_artikel->get_nama();

		$this->load->view('templates_admin/header');

		$this->load->view('templates_admin/sidebar');

		$this->load->view('adminmm/data_artikel', $data);

		$this->load->view('templates_admin/footer');

	}



	public function tambah_aksi()

	{

		$id_kategoriartikel	= $this->input->post('id_kategoriartikel');

		$judul				= $this->input->post('judul');

		$tanggal_input		= $this->input->post('tanggal_input');

		$admin				= $this->input->post('admin');

		$read_more			= $this->input->post('read_more');

		$kata_awal			= $this->input->post('kata_awal');

		$isi_artikel		= $this->input->post('isi_artikel');

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

			'id_kategoriartikel'	=> $id_kategoriartikel,

			'judul'					=> $judul,

			'tanggal_input'			=> $tanggal_input,

			'admin'					=> $admin,

			'read_more'				=> $read_more,

			'kata_awal'				=> $kata_awal,

			'isi_artikel'			=> $isi_artikel,

			'gambar'				=> $gambar,

			);



		$this->model_artikel->tambah_artikel($data, 'artikel');

		redirect('Adminmm/Data_artikel/index');

	}



	public function lihat_artikel($id_artikel)

	{

		$where = array('id_artikel'  => $id_artikel);

		$data['artikel'] = $this->model_artikel->lihat_artikel($where, 'artikel')->result();

		$this->load->view('templates_admin/header');

		$this->load->view('templates_admin/sidebar');

		$this->load->view('adminmm/lihat_artikel', $data);

		$this->load->view('templates_admin/footer');

	}

	public function edit_artikel($id_artikel)

	{

		$where = array('id_artikel'  => $id_artikel);

		$data['kategori'] 		= $this->model_artikel->get_nama();

		$data['artikel'] 		= $this->model_artikel->edit_artikel($where, 'artikel')->result();

		$this->load->view('templates_admin/header');

		$this->load->view('templates_admin/sidebar');

		$this->load->view('adminmm/edit_artikel', $data);

		$this->load->view('templates_admin/footer');

	}

	public function update_artikel()

	{

		$id_artikel				= $this->input->post('id_artikel');

		$id_kategoriartikel 	= $this->input->post('id_kategoriartikel');

		$judul 					= $this->input->post('judul');

		$tanggal_input			= $this->input->post('tanggal_input');

		$admin					= $this->input->post('admin');

		$read_more 				= $this->input->post('read_more');

		$kata_awal 				= $this->input->post('kata_awal');

		$isi_artikel 			= $this->input->post('isi_artikel');



		$data = array(

				'id_artikel' 			=> $id_artikel,

				'id_kategoriartikel' 	=> $id_kategoriartikel,

				'judul' 				=> $judul,

				'tanggal_input'			=> $tanggal_input,

				'admin'					=> $admin,

				'read_more' 			=> $read_more,

				'kata_awal' 			=> $kata_awal,

				'isi_artikel' 			=> $isi_artikel
		);

		$where 	= array(

				'id_artikel' 			=> $id_artikel

		);


		$this->model_artikel->update_data($where, $data, 'artikel');
		redirect('Adminmm/Data_artikel/index');
		

	}

	public function hapus_artikel($id_artikel)

	{
		$where = array('id_artikel' => $id_artikel);
		$this->model_artikel->hapus_data($where, 'artikel');
		redirect('Adminmm/Data_artikel/index');
	}
}




?>