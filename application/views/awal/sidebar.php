<body>



  <!-- ======= Top Bar ======= -->

<!--   <div id="topbar" class="d-flex align-items-center ">

    <div class="container d-flex justify-content-between">

      <div class="contact-info d-flex align-items-center">

        <i class="bi bi-envelope"></i> <a href="mailto:contact@example.com">contact@example.com</a>

        <i class="bi bi-phone"></i> +1 5589 55488 55

      </div>

      <div class="d-none d-lg-flex social-links align-items-center">

        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>

        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>

        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>

        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></i></a>

      </div>

    </div>
 -->




  <!-- ======= Header ======= -->

  <header class="bg-[#FFFDF6] py-1">
 <div class="flex items-center justify-between h-25">  
    <!-- Brand Name -->  
    <a href="<?php echo base_url('/'); ?>">  
        <div class="flex justify-center ml-[35%] md:ml-[25%]">  
            <img src="<?php echo get_sites_assets('logo.png'); ?>" alt="Medikacare" class="object-fill w-[22vw] max-w-[300px] min-w-[100px]  h-[80%]" />  
        </div>  
    </a>  
    
    <!-- Icons (Search + Menu) -->  
    <div class="flex items-center gap-5 md:gap-14 mr-[10%]">  
        
        <!-- Search Toggle -->  
        <div class="relative">  
            <a href="#" class="text-sm md:text-lg text-black search-toggle">  
                <i class="fas fa-search"></i>  
            </a>  
            <!-- Search Input -->  
            <input   
                type="text"   
                placeholder="Cari"   
                class="hidden absolute left-[-1300%] md:left-[200%] top-[-50%] w-40 mt-2 border border-gray-300 rounded-lg shadow-md p-2 bg-white z-20"  
                id="search-input">  
        </div>  
        
        <!-- Menu Toggle -->  
        <div class="relative">  
            <a href="#" class="text-sm md:text-lg text-black menu-toggle">  
                <i class="fas fa-bars"></i>  
            </a>  
            <!-- Menu List Popup -->  
            <div id="menu-list" class="hidden absolute left-[-1000%] w-40 mt-2 bg-white shadow-md rounded-lg z-10">  
                <a href="<?php echo site_url('pages/produk'); ?>" class="Navclick block px-4 py-2 text-black hover:bg-gray-200">Produk</a>  
                <a href="<?php echo site_url('pages/artikel'); ?>" class="Navclick block px-4 py-2 text-black hover:bg-gray-200">Artikel</a>  
                <a href="<?php echo site_url('pages/testimoni'); ?>" class="Navclick block px-4 py-2 text-black hover:bg-gray-200">Testimoni</a>  
                <a href="<?php echo site_url('pages/contact'); ?>" class="Navclick block px-4 py-2 text-black hover:bg-gray-200">Gabung Reseller</a>  
                <a href="<?php echo site_url('pages/about'); ?>" class="Navclick block px-4 py-2 text-black hover:bg-gray-200">Tentang Kami</a>  
            </div>  
        </div>  
    </div>  
</div>  
<!-- Modal -->
<div id="imageModal" class="fixed inset-0 z-50 hidden flex items-center justify-center" style="background-color:rgba(0, 0, 0, 0.8);">
  <div class="relative w-[90%] h-[90%] flex items-center justify-center">
    <img id="modalImage" src="" alt="Modal Preview" class="max-w-full max-h-full object-contain">
    <button onclick="closeModal()" class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors">&times;</button>
  </div>
</div>

<script type="text/javascript">  
    const menuToggle = document.querySelector('.menu-toggle'); // Selector for the toggle button  
    const menuList = document.getElementById('menu-list'); // Selector for the menu list  
    const searchToggle = document.querySelector('.search-toggle'); // Selector for the search icon  
    const searchInput = document.getElementById('search-input'); // Selector for the search input  

    // Toggle menu list  
    menuToggle.addEventListener('click', function(event) {  
        event.preventDefault(); // Prevent default action of the link  
        
        // Hide search input if it's visible  
        if (!searchInput.classList.contains('hidden')) {  
            searchInput.classList.add('hidden');  
        }  
        
        menuList.classList.toggle('hidden'); // Toggle the hidden class  
    });  

    // Toggle search input  
    searchToggle.addEventListener('click', function(event) {  
        event.preventDefault(); // Prevent default action of the link  
        
        // Hide menu list if it's visible  
        if (!menuList.classList.contains('hidden')) {  
            menuList.classList.add('hidden');  
        }  
        
        searchInput.classList.toggle('hidden'); // Toggle visibility of the search input  
        searchInput.focus(); // Focus on the search input when it appears  
    });  
</script>

			

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
<script>
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.classList.remove('hidden');
  modalImg.src = imageSrc;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
</script>

  </header>

  
