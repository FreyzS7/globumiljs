
 <section id="courses" class="courses">
      <div class="container" data-aos="fade-up">

      	<nav aria-label="breadcrumb">
		  <ol class="breadcrumb"  style="background-color: #c82a87;">
		    <li class="breadcrumb-item"><a href="https://globumil.com/produk_kami" style="color: white; font-family: Poppins;">Home</a></li>
		    <li class="breadcrumb-item active" aria-current="page" style="color: white; font-family: Poppins;">Selengkapnya Produk</li>
		  </ol>
		</nav>
		        <div class="row">
		        	<?php foreach($produk as $art){ ?>
		          <div class="col-lg-4 mb-3">
		           	<div id="carouselExample" class="carousel slide">
						  <div class="carousel-inner">
						    <div class="carousel-item active">
						       <img src="<?php echo base_url().'/uploads/'.$art->gambar ?>" class="d-block w-100" alt="..." id="collapseExamplegambar1">
						    </div>
						    <div class="carousel-item">
						     <img src="<?php echo base_url() ?>assets/assets/img/manfaatterbaru.jpeg" class="d-block w-100" alt="..." id="collapseExamplegambar">
						    </div>
						     <div class="carousel-item">
						     <img src="<?php echo base_url() ?>assets/assets/img/konsultasi.jpeg" class="d-block w-100" alt="..." id="collapseExamplegambar2">
						    </div>
						  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
						    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
						    <span class="visually-hidden">Previous</span>
						  </button>
						  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
						    <span class="carousel-control-next-icon" aria-hidden="true"></span>
						    <span class="visually-hidden">Next</span>
						  </button>
						</div>
					</div>
				</div>
			
	           <div class="col-lg-8 ">
              		<h2 style="font-family: Poppins; font-size:24px;"><?php echo $art->nama_produk; ?></h2>
              		<p style="font-family: Poppins;">Mengandung vitamin dan mineral yang dibutuhkan untuk ibu hamil dan menyusui</p>
              		 <p style="font-family: Poppins; font-size:18px;">4.9 
              		 	<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>

              		 | 10RB Penilaian | 10RB+ Terjual</p>
              		 <p style="font-family: Poppins; font-size:22px;"><strike style="color: red;"> Rp. 200.000</strike><b> <?php echo "Rp. " . number_format($art->harga_produk, 0, ".", "."); ?></b> <button type="button" class="btn btn-sm" disabled style="border-color: #c82a87; background-color: #c82a87; color:white;"> 10% Harga Eksklusif Website</button></p> 
              		 <p style="font-family: Poppins; font-size:15px;">Jaminan Halal<br>
              		 <a href="<?php echo base_url()?>uploads/SK NIE GLOBUMIL.PDF"><img src="<?php echo base_url()?>assets/assets/img/BPOM.png" width="50px;"></a><br>
              		 Klik untuk lihat sertifikat</p>

              		 <p><a href="<?php echo $art->link_produk; ?>" class="btn" style="border-color: #d2348d; font-family: Poppins; font-size:19px; border-radius: 20px; width: 100%;" >Beli Sekarang</a> 
              		 <p style="font-family: Poppins; font-size: 20px;"> Belanja di E-Commerce </p>
              		 <div class="dropdown" >
				  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; background-color: #c82a87; text-align: left; font-family: Poppins; font-size: 17px;">
				    Pilih MarketPlace
				  </button>	
              		 <ul class="dropdown-menu" style="width: 100%; " >
				  <li><a class="dropdown-item" href="https://shopee.co.id/Paket-Bumil-Sehat-2-Pcs-Globumil-Pregnancy-Supplement-Multivitamin-Terbaik-Untuk-Ibu-Hamil-Suplemen-DHA-Asam-Folat-Multivitamin-i.941947323.20585675981?sp_atk=3a8b5154-ed08-45fd-8a26-2f30976028d1&xptdk=3a8b5154-ed08-45fd-8a26-2f30976028d1" style="font-family: Poppins; font-size: 15px;" target="_blank">Shopee</a></li>
				  <!-- <li><a class="dropdown-item" href="https://vt.tokopedia.com/t/ZSF7Wx6Uj/" target="_blank">Tiktok</a></li>
				  <li><a class="dropdown-item" href="https://www.lazada.co.id/products/globumil-pregnancy-supplement-multivitamin-terbaik-untuk-ibu-hamil-suplemendhaasam-folatmultivitamin-i7941196568-s14354214382.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253Aglobumil%253Bnid%253A7941196568%253Bsrc%253ALazadaMainSrp%253Brn%253Afdb9e3769dc2652b8794894d8b75257f%253Bregion%253Aid%253Bsku%253A7941196568_ID%253Bprice%253A143000%253Bclient%253Adesktop%253Bsupplier_id%253A401566528219%253Bbiz_source%253Ah5_hp%253Bslot%253A1%253Butlog_bucket_id%253A470687%253Basc_category_id%253A11382%253Bitem_id%253A7941196568%253Bsku_id%253A14354214382%253Bshop_id%253A6726403&fastshipping=0&freeshipping=1&fs_ab=2&fuse_fs=&lang=id&location=Kab.%20Bogor&price=1.43E%205&priceCompare=skuId%3A14354214382%3Bsource%3Alazada-search-voucher%3Bsn%3Afdb9e3769dc2652b8794894d8b75257f%3BunionTrace%3A7567749917138472110267273e%3BoriginPrice%3A14300000%3BvoucherPrice%3A14300000%3BdisplayPrice%3A14300000%3BsinglePromotionId%3A900000021061659%3BsingleToolCode%3ApromPrice%3BvoucherPricePlugin%3A1%3BbuyerId%3A0%3Btimestamp%3A1713847211444&ratingscore=5.0&request_id=fdb9e3769dc2652b8794894d8b75257f&review=2&sale=5&search=1&source=search&spm=a2o4j.searchlist.list.1&stock=1" target="_blank">Lazada</a></li>
				  <li><a class="dropdown-item" href="https://www.tokopedia.com/medikacareofficial/globumil-pregnancy-supplement-vitamin-ibu-hamil-menyusui?extParam=src%3Dshop%26whid%3D9680608" target="_blank">Tokopedia</a></li> -->
				</ul>
				</div>
              		 </p>
	                
	              		</div>
	            	</div>
			  </div>
		    </div>
            </div>
          </div> <!-- End Course Item--> 
           <hr style="border-color: black;">
            <?php } ?>
        </div>
      </div>



      <div class="container" data-aos="fade-up">
      	<div class="row">
		<div class="col-lg-12 mb-3">
        	<p class="d-inline-flex gap-1">
		  <a class="btn" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style="background-color: #c82a87; color: white; font-family: Poppins;">
		    Dosis Konsumsi
		  </a>
		  <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" style="background-color: #c82a87; color: white; font-family: Poppins;">
		   	Komposisi Globumil
		  </button>

		   <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" style="background-color: #c82a87; color: white; font-family: Poppins;">
		   	Manfaat Globumil
		  </button>
		</p>
		<div class="collapse" id="collapseExample">
		  <div class="card card-body">
		  	<p style="font-family: Poppins; font-size:15px;">
		   	Dewasa: 1 kapsul/hari
		   </p>
		  </div>
		</div>
		<div class="collapse" id="collapseExample1">
		  <div class="card card-body">
		  	<p>
		  		<ul style="font-family: Poppins; font-size:18px; list-style-type: circle;" >
		  			<li>Folic Acid : 1000 mg</li>
		  			<li>Calcium : 31,25 mg</li>
		  			<li>Iron /Fe : 7,5 mg </li>
		  			<li>Iodin : 50 mcg </li>
		  			<li>Vitamin B1 : 0.35 mg </li>
		  			<li>Vitamin B12 1 mcg  </li>
		  			<li>Vitamin B6 : 1.25 mg  </li>
		  			<li>Vitamin C : 22,5 mg  </li>
		  			<li>Vitamin D3 100 IU : 2.5 mcg  </li>
		  			<li>Zinc : 3.95 mg  </li>
		  			<li>Biotin : 8 mcg  </li>
		  			<li>DHA : 100 mg  </li>
		  		</ul>
			</p>
		  </div>
		</div>
		<div class="collapse" id="collapseExample2">
		  <div class="card card-body">
		  	<p>
		   	<ul style="font-family: Poppins; font-size:18px; list-style-type: circle;" >
		  			<li>Mencegah Terjadinya Kecacatan Pada Janin</li>
		  			<li>Dapat Mengoptimalkan Perkembangan Otak Janin</li>
		  			<li>Mencegah Pendarahan Saat Masa Persalinan</li>
		  			<li>Menjaga Daya Tahan Tubuh Selama Kehamilan</li>
		  		</ul>
			</p>
		  </div>
		</div>
			</div>
		</div>

			<div class="row">
			 <div class="col-lg-12 mb-3">
	   		  <img src="<?php echo base_url()?>assets/assets/img/Artboard 3.png" class="img-fluid" alt="..." width="100%;">
	   		</div>
			 <div class="col-lg-12 mb-3">
	   		  <img src="<?php echo base_url()?>assets/assets/img/kenapa.png" class="img-fluid" alt="..." width="100%;">
	   		</div>
	   	
	   </div>
	</section>

	 <section id="courses" class="courses">
      <div class="container" data-aos="fade-up">
      	<div class="row">
			<div class="col-lg-12 mb-3">
				<h2>Ulasan </h2>
			</div>
			<hr style="background-color: black;">
			<div class="card">
				  <div class="card-body">
				    <h5 class="card-title">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/velly.jpg" class="img-fluid" alt="..." width="30px;">
					velynenovelia</h5>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<p class="card-text"><small class="text-body-secondary">2024-02-16 22:30</small></p>
				    <p class="card-text">Kualitas sangat baik, Cocok Untuk dikonsumsi sebagai suplemen ibu hamil, Produk datang masih disegel, Baru pertama kali nyobak semoga cocok</p>
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen1.png" class="img-fluid" alt="..." width="80px;">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen2.png" class="img-fluid" alt="..." width="80px;">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen3.png" class="img-fluid" alt="..." width="80px;">
				  </div>
				  
				</div>

				<div class="card" style="margin-top: 10px;">
				  <div class="card-body">
				    <h5 class="card-title">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/aryam.jpg" class="img-fluid" alt="..." width="30px;">
					aryam.muhammad.ali</h5>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<p class="card-text"><small class="text-body-secondary">2024-01-26 08:27</small></p>
				    <p class="card-text">Kandungannya bagus dan sesuai semoga cocok ya kak, ada no buat konsultasi gak kak ?</p>
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen4.png" class="img-fluid" alt="..." width="80px;">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen5.png" class="img-fluid" alt="..." width="80px;">
				  </div>
				</div>

				<div class="card" style="margin-top: 10px;">
				  <div class="card-body">
				    <h5 class="card-title">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/elvi.jpg" class="img-fluid" alt="..." width="30px;">
					elvihamisah</h5>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<p class="card-text"><small class="text-body-secondary">2024-04-07 21:06</small></p>
				    <p class="card-text">Orderan ke 3 dapat bonus,thank you 💝</p>
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen6.png" class="img-fluid" alt="..." width="80px;">
				  </div>
				</div>

				<div class="card" style="margin-top: 10px;">
				  <div class="card-body">
				    <h5 class="card-title">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/bagiyosaputro.jpg" class="img-fluid" alt="..." width="30px;">
					bagiyosaputro</h5>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<p class="card-text"><small class="text-body-secondary">2024-04-07 21:06</small></p>
				    <p class="card-text">Barang datang sesuai pesanan, kemasan rapi, aman. Semoga produknya bagus dan cocok.</p>
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen7.png" class="img-fluid" alt="..." width="80px;">
				  </div>
				</div>

				<div class="card" style="margin-top: 10px;">
				  <div class="card-body">
				    <h5 class="card-title">
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/bundaaby.jpg" class="img-fluid" alt="..." width="30px;">
					bundaaby</h5>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star checked" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<span class="fa fa-star" style="color:orange"></span>
					<p class="card-text"><small class="text-body-secondary">2024-03-10 19:45</small></p>
				    <p class="card-text">Vitamin bagus buat ibu hamil karna sudah lengkap dalam 1 kapsul. Makasih bonusnya min</p>
				    <img src="<?php echo base_url()?>assets/assets/img/gallery/komen8.png" class="img-fluid" alt="..." width="80px;">
				  </div>
				</div>
				<div align="right"><a href="<?php echo base_url('Produk_kami/testi_produk') ?>" class="btn" style="background-color: #c82a87; color:white;  font-family: Poppins; margin-top: 10px;">Lihat Testimoni Lainnya <i class="fa fa-arrow-right" aria-hidden="true"></i></a></div>
			</div>
		</div>
		
      </div>
 	</section>


    


       
            
			   

