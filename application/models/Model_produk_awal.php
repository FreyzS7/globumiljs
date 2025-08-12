<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_produk_awal extends CI_Model {

	public function tampil_data()
	{
		return $this->db->get('produk');
	}

	public function detail_produk($where, $table)
	{
		return $this->db->get_where($table, $where);
	}
}
