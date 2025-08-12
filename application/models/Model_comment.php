<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_comment extends CI_Model {

	public function tampil_data()
	{
		$this->db->select('*');
		$this->db->from('kategori_artikel');
		$this->db->join('artikel', 'artikel.id_kategoriartikel=kategori_artikel.id_kategoriartikel');
		$query = $this->db->get();
		return $query->result();
	}

	public function get_artikel_list($limit, $start)
	{
		$this->db->order_by('id_artikel', 'DESC');
		$query = $this->db->get('artikel', $limit, $start);
		return $query;
	}

	public function get_nama()
	{
		$query = $this->db->get('kategori_artikel');
		return $query->result_array();
	}

	public function tambah_comment($data, $table)
	{
		$this->db->insert($table, $data);
	}

	public function get_comment_list()
	{
		$this->db->order_by('comment_id', 'DESC');
		$query = $this->db->get('comments')->result_array();
		return $query;
	}

	public function get_comment($id)
	{
		$this->db->where('comment_id', $id);
		$query = $this->db->get('comments')->row_array();
		return $query;
	}

	public function update_comment($id, $array)
	{
		$this->db->where('comment_id', $id);
		$this->db->update('comments', $array);
	}

	public function lihat_artikel($where, $table)
	{
		return $this->db->get_where($table, $where);
	}

	public function edit_artikel($where, $table)
	{
		return $this->db->get_where($table, $where);
	}

	public function update_data($where, $data, $table)
	{
		$this->db->where($where);
		$this->db->update($table, $data);
	}

	public function hapus_data($where, $table)
	{
		$this->db->where($where);
		$this->db->delete($table);
	}
}
