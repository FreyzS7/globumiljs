<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comments extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->model('Comment_model');
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

    public function get_comments() {
        try {
            $type = $this->input->get('type');
            $item_id = $this->input->get('item_id');

            if (!$type || !$item_id) {
                $this->json_response(['error' => 'Type and item_id are required'], 400);
                return;
            }

            $comments = $this->Comment_model->get_comments($type, $item_id);
            $this->json_response($comments);
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }

    public function add_comment() {
        try {
            // Validate required fields
            $name = $this->input->post('name');
            $message = $this->input->post('message');
            $type = $this->input->post('type');
            $item_id = $this->input->post('item_id');

            if (!$name || !$message || !$type || !$item_id) {
                $this->json_response(['error' => 'Name, message, type, and item_id are required'], 400);
                return;
            }

            $data = array(
                'name' => $name,
                'email' => $this->input->post('email'),
                'message' => $message,
                'type' => $type,
                'item_id' => $item_id
            );

            // Handle image upload
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $image_config = array(
                    'upload_path' => './uploads/comments/',
                    'allowed_types' => 'jpg|jpeg|png|gif',
                    'max_size' => 2048, // 2MB
                    'encrypt_name' => TRUE, // Randomize filename
                    'remove_spaces' => TRUE
                );

                $this->load->library('upload', $image_config);

                if ($this->upload->do_upload('image')) {
                    $upload_data = $this->upload->data();
                    $data['image'] = $upload_data['file_name'];
                } else {
                    $data['image'] = null;
                }
            } else {
                $data['image'] = null;
            }

            // Handle attachment upload (only for products)
            if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
                // Create attachments directory if it doesn't exist
                if (!is_dir('./uploads/comments/attachments/')) {
                    mkdir('./uploads/comments/attachments/', 0755, true);
                }

                // Create a new upload instance for attachment
                $attachment_config = array(
                    'upload_path' => './uploads/comments/attachments/',
                    'allowed_types' => 'jpg|jpeg|png|gif|webp|pdf|doc|docx|txt',
                    'max_size' => 5120, // 5MB
                    'encrypt_name' => TRUE, // Randomize filename
                    'remove_spaces' => TRUE,
                    'overwrite' => FALSE
                );

                // Clear any previous upload errors and reinitialize
                $this->upload->initialize($attachment_config);

                if ($this->upload->do_upload('attachment')) {
                    $upload_data = $this->upload->data();
                    $data['attachment'] = $upload_data['file_name'];
                } else {
                    // Handle upload error
                    $data['attachment'] = null;
                }
            } else {
                $data['attachment'] = null;
            }

            $result = $this->Comment_model->add_comment($data);

            if ($result) {
                $this->json_response(['message' => 'Comment submitted successfully and pending approval']);
            } else {
                $this->json_response(['error' => 'Failed to submit comment'], 500);
            }
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }

    // Admin endpoints for managing comments
    public function get_pending_comments() {
        try {
            // Add authentication check here
            $comments = $this->Comment_model->get_pending_comments();
            $this->json_response($comments);
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }

    public function approve_comment($comment_id) {
        try {
            // Add authentication check here
            $result = $this->Comment_model->approve_comment($comment_id);
            $this->json_response(['success' => $result]);
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }

    public function reject_comment($comment_id) {
        try {
            // Add authentication check here
            $result = $this->Comment_model->reject_comment($comment_id);
            $this->json_response(['success' => $result]);
        } catch (Exception $e) {
            $this->json_response(['error' => $e->getMessage()], 500);
        }
    }
} 