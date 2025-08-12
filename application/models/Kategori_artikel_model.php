<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kategori_artikel_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }
    
    public function get_all_categories() {
        $query = $this->db->get('kategori_artikel');
        return $query->result();
    }
    
    public function get_category_by_id($id) {
        $this->db->where('id_kategoriartikel', $id);
        $query = $this->db->get('kategori_artikel');
        return $query->row();
    }
} 