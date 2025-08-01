<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends MY_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->model('produk_model');
    }
    
    public function index() {
        $page = $this->input->get('page', TRUE);
        $limit = $this->input->get('limit', TRUE);
        
        // If limit is 'all', return all products for build process
        if ($limit === 'all') {
            // Get all products without pagination
            $products = $this->produk_model->get_all_products();
            $total = count($products);
            
            $data = [
                'data' => $products,
                'total' => $total,
                'page' => 1,
                'limit' => $total,
                'total_pages' => 1
            ];
        } else {
            // Set default values for pagination
            $page = (int)$page > 0 ? (int)$page : 1;
            $limit = (int)$limit > 0 ? (int)$limit : 12;
            
            // Calculate offset
            $offset = ($page - 1) * $limit;
            
            // Get products with pagination
            $products = $this->produk_model->get_all_products($limit, $offset);
            $total = $this->produk_model->count_all_products();
            
            $data = [
                'data' => $products,
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'total_pages' => ceil($total / $limit)
            ];
        }
        
        return $this->json_response($data, true, 'Products retrieved successfully');
    }
    
    public function get($id) {
        $product = $this->produk_model->get_product_by_id($id);
        if ($product) {
            return $this->json_response($product, true, 'Product retrieved successfully');
        }
        return $this->json_response(null, false, 'Product not found');
    }
} 