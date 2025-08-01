<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Produk_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }
    
    public function get_all_products($limit = null, $offset = null) {
        $this->db->order_by('id_produk', 'DESC');
        
        if ($limit !== null) {
            $this->db->limit($limit, $offset);
        }
        
        $query = $this->db->get('produk');
        return $query->result();
    }
    
    public function count_all_products() {
        return $this->db->count_all('produk');
    }
    
    public function get_product_by_id($id) {
        $this->db->where('id_produk', $id);
        $query = $this->db->get('produk');
        return $query->row();
    }
} 