<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BatchDataExport extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('curl');
        $this->load->helper('file');
        $this->load->helper('url');
    }

    private function fetch_api_data($endpoint) {
        $base_url = site_url('api/');
        $url = $base_url . $endpoint;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code === 200) {
            return json_decode($response, true);
        } else {
            return null;
        }
    }

    public function export_all() {
        // Fetch all articles
        $articles_response = $this->fetch_api_data('articles?limit=all');
        if ($articles_response && isset($articles_response['data'])) {
            $articles = $articles_response['data'];
            write_file(FCPATH . 'fe/data/articles.json', json_encode($articles, JSON_PRETTY_PRINT));
        } else {
            echo "Failed to fetch articles\n";
        }

        // Fetch all products
        $products_response = $this->fetch_api_data('products?limit=all');
        if ($products_response && isset($products_response['data'])) {
            $products = $products_response['data'];
            write_file(FCPATH . 'fe/data/products.json', json_encode($products, JSON_PRETTY_PRINT));
        } else {
            echo "Failed to fetch products\n";
        }

        // Fetch all article categories
        $categories_response = $this->fetch_api_data('articles/categories');
        if ($categories_response) {
            write_file(FCPATH . 'fe/data/categories.json', json_encode($categories_response, JSON_PRETTY_PRINT));
        } else {
            echo "Failed to fetch categories\n";
        }

        echo "Batch data export completed.\n";
    }
}
