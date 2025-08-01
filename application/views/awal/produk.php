 <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
       <img src="<?php echo base_url() ?>assets/assets/img/Bannerproduk1.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
     <img src="<?php echo base_url() ?>assets/assets/img/freepregnancybelt.png" class="d-block w-100" alt="...">
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

 <section id="departments" class="departments mb-4">
       <div class="container">
		        <div class="row gy-4">
		        	<?php foreach($produk as $art){ ?>
		          <div class="col-lg-4 mb-3">
		          	<div class="card" style="width: 22rem;">
					  <img src="<?php echo base_url().'/uploads/'.$art->gambar ?>" class="card-img-top" alt="...">
					  <div class="card-body">
					    <p class="card-text" style="font-family:Poppins;"><b><?php echo $art->nama_produk; ?></b></p>
					    <p style="text-align: center;"><a href="<?php echo site_url('Produk_kami/tampil_produk/'. $art->id_produk .'/'. $art->nama_produk .'/'); ?>" class="btn" style="border-color: #d2348d; border-radius: 10px; width:100%;">Selengkapnya</a></p>

					    <div class="accordion" id="accordionExample">
							  <div class="accordion-item" >
							    <h2 class="accordion-header"style="font-family: Poppins; font-size:14px;">
							      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
							      30 Kapsul
							      </button>
							    </h2>
							    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
							      <div class="accordion-body">
							        <p style="font-family: Poppins; font-size:14px;"><b><?php echo "Rp. " . number_format($art->harga_produk, 0, ".", "."); ?></b></p>
							      </div>
							    </div>
							  </div>
							  <div class="accordion-item">
							    <h2 class="accordion-header" style="font-family: Poppins; font-size:14px;">
							      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							       Manfaat
							      </button>
							    </h2>
							    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							      <div class="accordion-body">
							        <p style="font-family: Poppins; font-size:14px;">
							       	* Dosis disesuaikan berdasarkan kebutuhan ibu hamil & menyusui di Indonesia <br>
							        * Zat besi yang berasal dari besi fumarat yang tidak menyebabkan konstipasi <br>
							        * Dosis DHA yang tinggi,baik untuk perkembangan otak si kecil <br>
							        * Minyak ikan tidak berbau dan kaya akan DHA tanpa mengakibatkan mual </p>
							      </div>
							    </div>
							  </div>
							  <div class="accordion-item">
							    <h2 class="accordion-header" style="font-family: Poppins; font-size:14px;">
							      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
							        Komposisi
							      </button>
							    </h2>
							    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							      <div class="accordion-body">
							       <p style="font-family: Poppins; font-size:14px;">
							       	- Folic Acid : 1000 mg <br>
									- Calcium : 31,25 mg<br>
									- Iron /Fe : 7,5 mg<br>
									- Iodin : 50 mcg<br>
									- Vitamin B1 : 0.35 mg<br>
									- Vitamin B12 1 mcg<br>
									- Vitamin B6 : 1.25 mg<br>
									- Vitamin C : 22,5 mg<br>
									- Vitamin D3 100 IU : 2.5 mcg<br>
									- Zinc : 3.95 mg<br>
									- Biotin : 8 mcg<br>
									- DHA : 100 mg<br>
							       </p>
							      </div>
							    </div>
							  </div>
							</div>
					  </div>
					</div>
				</div>
	          <?php } ?>
					</div>
					</div>








					</div>
					</div>		
	              </div>
	            </div>
            </div>

          </div> <!-- End Course Item-->
         
        </div>

      </div>
    </section><!-- End Courses Section -->