<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
    
    protected $response = [
        'status' => false,
        'message' => '',
        'data' => null
    ];

    public function __construct() {
        parent::__construct();
        
        // Start output buffering to prevent "headers already sent" errors
        if (!ob_get_level()) {
            ob_start();
        }
        
        // Enable CORS - check if headers haven't been sent already
        if (!headers_sent()) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }
        
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            exit(0);
        }
    }

    protected function json_response($data = null, $status = true, $message = '') {
        $this->response['status'] = $status;
        $this->response['message'] = $message;
        $this->response['data'] = $data;
        
        return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($this->response));
    }
} 