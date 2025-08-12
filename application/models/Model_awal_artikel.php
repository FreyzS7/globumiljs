<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_awal_artikel extends CI_Model {

	public function get_nama()
	{
		$query = $this->db->get('kategori_artikel');
		return $query->result_array();
	}

	public function tampil_data()
	{
		$this->db->select('*');
		$this->db->from('kategori_artikel');
		$this->db->join('artikel', 'artikel.id_kategoriartikel=kategori_artikel.id_kategoriartikel');
		$query = $this->db->get();
		return $query->result();
	}

	public function data_kehamilan()
	{
		return $this->db->get_where("artikel", array('id_kategoriartikel' => '1'));
	}

	public function data_menyusui()
	{
		return $this->db->get_where("artikel", array('id_kategoriartikel' => '2'));
	}

	public function data_parenting()
	{
		return $this->db->get_where("artikel", array('id_kategoriartikel' => '3'));
	}

	public function data_momslife()
	{
		return $this->db->get_where("artikel", array('id_kategoriartikel' => '5'));
	}

	public function artikel_home()
	{
		$this->db->order_by('id_artikel', 'DESC')->limit(3);
		$query = $this->db->get('artikel');
		return $query->result();
	}

	public function jumlah_data()
	{
		return $this->db->get('artikel')->num_rows();
	}
}
