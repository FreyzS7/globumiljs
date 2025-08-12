<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Articles extends MY_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->model('artikel_model');
        $this->load->model('kategori_artikel_model');
    }
    
    public function index() {
        $page = $this->input->get('page') ? (int)$this->input->get('page') : 1;
        $limit = $this->input->get('limit');

        if ($limit === 'all') {
            // When limit is 'all', fetch all articles without pagination for build processes.
            $articles = $this->artikel_model->get_all_articles(null, 0); // Assuming null limit in model fetches all.
            $total = count($articles);
        } else {
            // Otherwise, use standard pagination.
            $limit = $limit ? (int)$limit : 9;
            $offset = ($page - 1) * $limit;
            $total = $this->db->count_all('artikel');
            $articles = $this->artikel_model->get_all_articles($limit, $offset);
        }

        return $this->json_response([
            'data' => $articles,
            'total' => $total
        ], true, 'Articles retrieved successfully');
    }


    
    public function get($id) {
        $article = $this->artikel_model->get_article_by_id($id);
        if ($article) {
            return $this->json_response($article, true, 'Article retrieved successfully');
        }
        return $this->json_response(null, false, 'Article not found');
    }
    
    public function categories() {
        $categories = $this->kategori_artikel_model->get_all_categories();
        return $this->json_response($categories, true, 'Categories retrieved successfully');
    }
    
    public function by_category($category_id) {
        $articles = $this->artikel_model->get_articles_by_category($category_id);
        return $this->json_response($articles, true, 'Articles retrieved successfully');
    }

    public function increment_views($id) {
        $this->artikel_model->increment_views($id);
        return $this->json_response(null, true, 'View count incremented successfully');
    }

    public function most_viewed() {
        $limit = $this->input->get('limit') ? (int)$this->input->get('limit') : 5;
        $articles = $this->artikel_model->get_most_viewed($limit);
        return $this->json_response($articles, true, 'Most viewed articles retrieved successfully');
    }

    public function create() {
        // Only allow POST requests
        if ($this->input->server('REQUEST_METHOD') !== 'POST') {
            return $this->json_response(null, false, 'Only POST method allowed', 405);
        }

        // Validate password
        $password = $this->input->post('password');
        if ($password !== '12345678MM') {
            return $this->json_response(null, false, 'Invalid password', 401);
        }

        // Validate required fields
        $required_fields = ['id_kategoriartikel', 'judul', 'admin', 'kata_awal', 'isi_artikel'];
        foreach ($required_fields as $field) {
            if (!$this->input->post($field)) {
                return $this->json_response(null, false, "Field '{$field}' is required", 400);
            }
        }

        // Get form data
        $id_kategoriartikel = $this->input->post('id_kategoriartikel');
        $judul = $this->input->post('judul');
        $admin = $this->input->post('admin');
        $read_more = $this->input->post('read_more') ?: '';
        $kata_awal = $this->input->post('kata_awal');
        $isi_artikel = $this->input->post('isi_artikel');
        $tanggal_input = $this->input->post('tanggal_input') ?: date('Y-m-d H:i:s');

        // Handle file upload
        $gambar = '';
        if (!empty($_FILES['gambar']['name'])) {
            $config['upload_path'] = './uploads';
            $config['allowed_types'] = 'jpg|jpeg|png|gif|webp';
            $config['max_size'] = 2048; // 2MB
            $config['encrypt_name'] = TRUE; // Generate random filename
            
            $this->load->library('upload', $config);
            
            if (!$this->upload->do_upload('gambar')) {
                $error = $this->upload->display_errors('', '');
                return $this->json_response(null, false, 'Image upload failed: ' . $error, 400);
            } else {
                $upload_data = $this->upload->data();
                $gambar = $upload_data['file_name'];
            }
        }

        // Prepare data for insertion
        $data = array(
            'id_kategoriartikel' => $id_kategoriartikel,
            'judul' => $judul,
            'tanggal_input' => $tanggal_input,
            'admin' => $admin,
            'read_more' => $read_more,
            'kata_awal' => $kata_awal,
            'isi_artikel' => $isi_artikel,
            'gambar' => $gambar,
            'views' => 0
        );

        // Insert article
        $result = $this->artikel_model->create_article($data);
        
        if ($result) {
            return $this->json_response(
                array('id' => $result, 'message' => 'Article created successfully'), 
                true, 
                'Article created successfully', 
                201
            );
        } else {
            return $this->json_response(null, false, 'Failed to create article', 500);
        }
    }

    public function update($id) {
        // Only allow PUT/POST requests
        if (!in_array($this->input->server('REQUEST_METHOD'), ['PUT', 'POST'])) {
            return $this->json_response(null, false, 'Only PUT/POST method allowed', 405);
        }

        // Validate password
        $password = $this->input->post('password');
        if ($password !== '12345678MM') {
            return $this->json_response(null, false, 'Invalid password', 401);
        }

        // Check if article exists
        $existing_article = $this->artikel_model->get_article_by_id($id);
        if (!$existing_article) {
            return $this->json_response(null, false, 'Article not found', 404);
        }

        // Validate required fields
        $required_fields = ['id_kategoriartikel', 'judul', 'admin', 'kata_awal', 'isi_artikel'];
        foreach ($required_fields as $field) {
            if (!$this->input->post($field)) {
                return $this->json_response(null, false, "Field '{$field}' is required", 400);
            }
        }

        // Get form data
        $id_kategoriartikel = $this->input->post('id_kategoriartikel');
        $judul = $this->input->post('judul');
        $admin = $this->input->post('admin');
        $read_more = $this->input->post('read_more') ?: '';
        $kata_awal = $this->input->post('kata_awal');
        $isi_artikel = $this->input->post('isi_artikel');

        // Handle file upload
        $gambar = $existing_article->gambar; // Keep existing image by default
        if (!empty($_FILES['gambar']['name'])) {
            $config['upload_path'] = './uploads';
            $config['allowed_types'] = 'jpg|jpeg|png|gif|webp';
            $config['max_size'] = 2048; // 2MB
            $config['encrypt_name'] = TRUE; // Generate random filename
            
            $this->load->library('upload', $config);
            
            if (!$this->upload->do_upload('gambar')) {
                $error = $this->upload->display_errors('', '');
                return $this->json_response(null, false, 'Image upload failed: ' . $error, 400);
            } else {
                // Delete old image if it exists
                if ($existing_article->gambar && file_exists('./uploads/' . $existing_article->gambar)) {
                    unlink('./uploads/' . $existing_article->gambar);
                }
                $upload_data = $this->upload->data();
                $gambar = $upload_data['file_name'];
            }
        }

        // Prepare data for update
        $data = array(
            'id_kategoriartikel' => $id_kategoriartikel,
            'judul' => $judul,
            'admin' => $admin,
            'read_more' => $read_more,
            'kata_awal' => $kata_awal,
            'isi_artikel' => $isi_artikel,
            'gambar' => $gambar
        );

        // Update article
        $result = $this->artikel_model->update_article($id, $data);
        
        if ($result) {
            return $this->json_response(
                array('id' => $id, 'message' => 'Article updated successfully'), 
                true, 
                'Article updated successfully'
            );
        } else {
            return $this->json_response(null, false, 'Failed to update article', 500);
        }
    }

    public function delete($id) {
        // Only allow DELETE/POST requests
        if (!in_array($this->input->server('REQUEST_METHOD'), ['DELETE', 'POST'])) {
            return $this->json_response(null, false, 'Only DELETE/POST method allowed', 405);
        }

        // Validate password
        $password = $this->input->post('password');
        if ($password !== '12345678MM') {
            return $this->json_response(null, false, 'Invalid password', 401);
        }

        // Check if article exists
        $existing_article = $this->artikel_model->get_article_by_id($id);
        if (!$existing_article) {
            return $this->json_response(null, false, 'Article not found', 404);
        }

        // Delete associated image if it exists
        if ($existing_article->gambar && file_exists('./uploads/' . $existing_article->gambar)) {
            unlink('./uploads/' . $existing_article->gambar);
        }

        // Delete article
        $result = $this->artikel_model->delete_article($id);
        
        if ($result) {
            return $this->json_response(
                array('id' => $id, 'message' => 'Article deleted successfully'), 
                true, 
                'Article deleted successfully'
            );
        } else {
            return $this->json_response(null, false, 'Failed to delete article', 500);
        }
    }
}
