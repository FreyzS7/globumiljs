<header class="bg-[#FFF6F6] w-full shadow-md">
  <nav class="w-full mx-auto flex items-center justify-between px-6 py-4" role="navigation" aria-label="Main navigation">
    <!-- Logo and Brand -->
    <div class="w-1/2 flex items-center gap-3 ml-5">
      <a href="<?= site_url('/') ?>" aria-label="Kembali ke beranda">
        <img 
          src="<?= base_url('fe/public/images/LogoGlobumil.png') ?>"
          alt="Globumil Logo"
          class="h-[80%] w-[50%] object-contain"
        />
      </a>
    </div>

    <!-- Right Side Icons -->
    <div class="flex items-center gap-1 md:gap-12">
      <div class="hover:text-pink-500 transition-colors w-10 h-10 flex items-center justify-center">
        <button onclick="document.getElementById('searchModal').classList.remove('hidden')" aria-label="Cari artikel dan produk">
          <!-- Magnifying Glass Icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        </button>
      </div>
      <div class="hover:text-pink-500 transition-colors w-10 h-10 flex items-center justify-center">
        <a href="<?= site_url('cart') ?>" aria-label="Keranjang belanja">
          <!-- Shopping Bag Icon SVG -->           
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-6 w-6" style="color:black"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg>
        </a>
      </div>

      <div class="hover:text-pink-500 transition-colors w-10 h-10 flex items-center justify-center relative">
        <button onclick="document.getElementById('dropdownMenu').classList.toggle('hidden')" aria-label="Menu navigasi" aria-expanded="false" aria-controls="dropdownMenu">
          <!-- Bars3 Icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Dropdown Menu -->
        <ul id="dropdownMenu" class="hidden absolute right-0 top-10 mt-2 w-36 bg-white shadow-lg rounded-md z-50" role="menu">
          <li role="none"><a href="<?= site_url('produk_kami') ?>" class="block px-4 py-2 text-black hover:bg-gray-100" role="menuitem">Produk</a></li>
          <li role="none"><a href="<?= site_url('artikel') ?>" class="block px-4 py-2 text-black hover:bg-gray-100" role="menuitem">Artikel</a></li>
          <li role="none"><a href="<?= site_url('tentang_kami') ?>" class="block px-4 py-2 text-black hover:bg-gray-100" role="menuitem">Tentang Kami</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Search Modal -->
  <div id="searchModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-labelledby="searchModalTitle" aria-modal="true">
    <div class="bg-white rounded-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 id="searchModalTitle" class="text-xl font-semibold">Pencarian</h2>
        <button onclick="document.getElementById('searchModal').classList.add('hidden')" aria-label="Tutup modal pencarian">&times;</button>
      </div>
      <form action="<?= site_url('search') ?>" method="get" role="search">
        <label for="searchInput" class="sr-only">Cari artikel dan produk</label>
        <input type="search" id="searchInput" name="q" placeholder="Cari artikel dan produk..." class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" />
        <button type="submit" class="mt-3 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Cari</button>
      </form>
    </div>
  </div>

  <script>
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      var dropdown = document.getElementById('dropdownMenu');
      var button = dropdown.previousElementSibling;
      if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.add('hidden');
      }
    });
  </script>
</header>
