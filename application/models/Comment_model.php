<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comment_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_comments($type, $item_id) {
        $this->db->where('type', $type);
        $this->db->where('item_id', $item_id);
        $this->db->where('status', 'approved');
        $this->db->order_by('created_at', 'DESC');
        return $this->db->get('comments')->result();
    }

    public function add_comment($data) {
        $comment_data = array(
            'name' => $data['name'],
            'email' => $data['email'],
            'message' => $data['message'],
            'type' => $data['type'], // 'product' or 'article'
            'item_id' => $data['item_id'],
            'status' => 'pending', // Default status is pending
            'created_at' => date('Y-m-d H:i:s'),
            'image' => isset($data['image']) ? $data['image'] : null, // Save the filename or null
            'attachment' => isset($data['attachment']) ? $data['attachment'] : null // Save the attachment filename or null
        );
    
        return $this->db->insert('comments', $comment_data);
    }

    public function get_pending_comments() {
        $this->db->where('status', 'pending');
        $this->db->order_by('created_at', 'DESC');
        return $this->db->get('comments')->result();
    }

    public function approve_comment($comment_id) {
        $this->db->where('id', $comment_id);
        return $this->db->update('comments', ['status' => 'approved']);
    }

    public function reject_comment($comment_id) {
        $this->db->where('id', $comment_id);
        return $this->db->delete('comments');
    }
} 