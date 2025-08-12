<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Artikel_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }
    
    public function get_all_articles($limit = null, $offset = null) {
        // First, ensure views column exists
        $this->ensure_views_column();
        
        $this->db->select('artikel.*, kategori_artikel.nama_kategori');
        $this->db->from('artikel');
        $this->db->join('kategori_artikel', 'kategori_artikel.id_kategoriartikel = artikel.id_kategoriartikel');
        $this->db->order_by('artikel.tanggal_input', 'DESC');
        if ($limit !== null) {
            $this->db->limit($limit, $offset);
        }
        $query = $this->db->get();
        return $query->result();
    }
    
    private function ensure_views_column() {
        // Check if views column exists, if not add it
        $fields = $this->db->field_data('artikel');
        $has_views = false;
        foreach ($fields as $field) {
            if ($field->name === 'views') {
                $has_views = true;
                break;
            }
        }
        
        if (!$has_views) {
            $this->db->query('ALTER TABLE artikel ADD COLUMN views INT DEFAULT 0');
        }
    }
    
    public function get_article_by_id($id) {
        $this->db->select('artikel.*, kategori_artikel.nama_kategori');
        $this->db->from('artikel');
        $this->db->join('kategori_artikel', 'kategori_artikel.id_kategoriartikel = artikel.id_kategoriartikel');
        $this->db->where('artikel.id_artikel', $id);
        $query = $this->db->get();
        return $query->row();
    }
    
    public function get_articles_by_category($category_id) {
        $this->db->select('artikel.*, kategori_artikel.nama_kategori');
        $this->db->from('artikel');
        $this->db->join('kategori_artikel', 'kategori_artikel.id_kategoriartikel = artikel.id_kategoriartikel');
        $this->db->where('artikel.id_kategoriartikel', $category_id);
        $this->db->order_by('artikel.tanggal_input', 'DESC');
        $query = $this->db->get();
        return $query->result();
    }
    
    public function increment_views($id) {
        $this->db->set('views', 'views + 1', FALSE);
        $this->db->where('id_artikel', $id);
        $this->db->update('artikel');
        return $this->db->affected_rows() > 0;
    }
    
    public function get_most_viewed($limit = 5) {
        $this->db->select('artikel.*, kategori_artikel.nama_kategori');
        $this->db->from('artikel');
        $this->db->join('kategori_artikel', 'kategori_artikel.id_kategoriartikel = artikel.id_kategoriartikel', 'left');
        $this->db->order_by('views', 'DESC');
        $this->db->limit($limit);
        $query = $this->db->get();
        return $query->result();
    }
    
    public function create_article($data) {
        $this->db->insert('artikel', $data);
        if ($this->db->affected_rows() > 0) {
            return $this->db->insert_id();
        }
        return false;
    }
    
    public function update_article($id, $data) {
        $this->db->where('id_artikel', $id);
        $this->db->update('artikel', $data);
        return $this->db->affected_rows() > 0;
    }
    
    public function delete_article($id) {
        $this->db->where('id_artikel', $id);
        $this->db->delete('artikel');
        return $this->db->affected_rows() > 0;
    }
}
