<?php
class Robots extends CI_Controller {

    public function index() {
        // Output the robots.txt file content
        header('Content-Type: text/plain');
        echo "User-agent: *\n";
        echo "Disallow: /Adminmm/\n";
        echo "Allow: /public/\n";
        echo "Allow: /public_http/\n";
        echo "Sitemap: " . base_url('/sitemap') . "\n";
    }
}
