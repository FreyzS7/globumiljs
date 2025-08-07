<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Search extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->model('Artikel_model');
        $this->load->model('Produk_model');
        $this->load->helper('url');
        
        // Enable CORS
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-Type: application/json');
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            exit(0);
        }
    }

    private function json_response($data, $status_code = 200) {
        $this->output
            ->set_status_header($status_code)
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }

    public function index() {
        try {
            $query = $this->input->get('q');
            $type = $this->input->get('type'); // 'products', 'articles', or 'all'
            $page = (int)$this->input->get('page') ?: 1;
            $limit = (int)$this->input->get('limit') ?: 12;
            $offset = ($page - 1) * $limit;

            if (empty($query)) {
                $this->json_response(['error' => 'Search query is required'], 400);
                return;
            }

            $results = array();
            $total_count = 0;

            switch($type) {
                case 'products':
                    $results = $this->search_products($query, $limit, $offset);
                    $total_count = $this->count_products($query);
                    break;
                    
                case 'articles':
                    $results = $this->search_articles($query, $limit, $offset);
                    $total_count = $this->count_articles($query);
                    break;
                    
                default: // 'all'
                    $products = $this->search_products($query, $limit, $offset);
                    $articles = $this->search_articles($query, $limit, $offset);
                    
                    $results = array(
                        'products' => $products,
                        'articles' => $articles
                    );
                    
                    $total_count = array(
                        'products' => $this->count_products($query),
                        'articles' => $this->count_articles($query)
                    );
                    break;
            }

            $response = array(
                'query' => $query,
                'type' => $type ?: 'all',
                'page' => $page,
                'limit' => $limit,
                'total_count' => $total_count,
                'results' => $results
            );

            $this->json_response($response);
            
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }

    private function search_products($query, $limit, $offset) {
        $this->db->select('id_produk, nama_produk, deskripsi, harga_produk, gambar, link_produk');
        $this->db->from('produk');
        $this->db->group_start();
        $this->db->like('nama_produk', $query);
        $this->db->or_like('deskripsi', $query);
        $this->db->group_end();
        // Remove status filter since it might not exist
        $this->db->order_by('nama_produk', 'ASC');
        $this->db->limit($limit, $offset);
        
        $query_result = $this->db->get();
        $products = $query_result->result();
        
        // Add type field for frontend
        foreach($products as $product) {
            $product->type = 'product';
            $product->url = '/produk_kami/tampil_produk/' . $product->id_produk;
        }
        
        return $products;
    }

    private function search_articles($query, $limit, $offset) {
        $this->db->select('a.id_artikel, a.judul, a.kata_awal, a.isi_artikel, a.gambar, a.tanggal_input, a.views, k.nama_kategori, a.admin');
        $this->db->from('artikel a');
        $this->db->join('kategori_artikel k', 'a.id_kategoriartikel = k.id_kategoriartikel', 'left');
        $this->db->group_start();
        $this->db->like('a.judul', $query);
        $this->db->or_like('a.kata_awal', $query);
        $this->db->or_like('a.isi_artikel', $query);
        $this->db->or_like('k.nama_kategori', $query);
        $this->db->group_end();
        // Remove status filter since it might not exist
        $this->db->order_by('a.tanggal_input', 'DESC');
        $this->db->limit($limit, $offset);
        
        $query_result = $this->db->get();
        $articles = $query_result->result();
        
        // Add type field and URL for frontend
        foreach($articles as $article) {
            $article->type = 'article';
            $article->url = '/artikel_kami/lihat_artikel/' . $article->id_artikel . '/' . url_title($article->judul, 'dash', TRUE);
            
            // Truncate content for search results
            if (strlen($article->kata_awal) > 150) {
                $article->excerpt = substr(strip_tags($article->kata_awal), 0, 150) . '...';
            } else {
                $article->excerpt = strip_tags($article->kata_awal);
            }
        }
        
        return $articles;
    }

    private function count_products($query) {
        $this->db->from('produk');
        $this->db->group_start();
        $this->db->like('nama_produk', $query);
        $this->db->or_like('deskripsi', $query);
        $this->db->group_end();
        // Remove status filter
        
        return $this->db->count_all_results();
    }

    private function count_articles($query) {
        $this->db->from('artikel a');
        $this->db->join('kategori_artikel k', 'a.id_kategoriartikel = k.id_kategoriartikel', 'left');
        $this->db->group_start();
        $this->db->like('a.judul', $query);
        $this->db->or_like('a.kata_awal', $query);
        $this->db->or_like('a.isi_artikel', $query);
        $this->db->or_like('k.nama_kategori', $query);
        $this->db->group_end();
        // Remove status filter
        
        return $this->db->count_all_results();
    }

    public function suggestions() {
        try {
            $query = $this->input->get('q');
            $limit = (int)$this->input->get('limit') ?: 5;

            if (empty($query) || strlen($query) < 2) {
                $this->json_response(['suggestions' => []]);
                return;
            }

            $suggestions = array();

            // Get product suggestions
            $this->db->select('nama_produk as title, "product" as type, id_produk as id');
            $this->db->from('produk');
            $this->db->like('nama_produk', $query);
            // Remove status filter
            $this->db->limit($limit);
            $product_suggestions = $this->db->get()->result();

            // Get article suggestions
            $this->db->select('judul as title, "article" as type, id_artikel as id');
            $this->db->from('artikel');
            $this->db->like('judul', $query);
            // Remove status filter
            $this->db->limit($limit);
            $article_suggestions = $this->db->get()->result();

            $suggestions = array_merge($product_suggestions, $article_suggestions);

            $this->json_response(['suggestions' => $suggestions]);
            
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }
}