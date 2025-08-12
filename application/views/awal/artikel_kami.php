  <section id="counts" class="counts" style="background-color: #fbedf6;">
      <div class="container">

        <nav aria-label="breadcrumb" >
          <ol class="breadcrumb" style="background-color: #fbedf6;">
            <li class="breadcrumb-item"><a href="https://globumil.com/"><b>Home</b></a></li>
            <li class="breadcrumb-item active" aria-current="page"><b>Artikel Kami</b></li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="count-box">
              
                <a href="<?php echo base_url('Artikel_kami/kehamilan') ?>" class="btn" style="width: 200px; background-color: #c82a87; color: white;">Kehamilan</a>
            </div>
          </div>

           <div class="col-lg-3 col-md-6">
            <div class="count-box">
              <a href="<?php echo base_url('Artikel_kami/menyusui') ?>" class="btn" style="width: 200px; background-color: #c82a87; color: white;">Menyusui</a></button>
            </div>
          </div>

           <div class="col-lg-3 col-md-6">
            <div class="count-box">
              <a href="<?php echo base_url('Artikel_kami/parenting') ?>" class="btn" style="width: 200px; background-color: #c82a87; color: white;">Parenting</a></button>
            </div>
          </div>

           <div class="col-lg-3 col-md-6">
            <div class="count-box">
              <button type="button" class="btn" style="width: 200px; background-color: #c82a87; color: white;">
                <a href="<?php echo base_url('Artikel_kami/momslife') ?>" style="color:white;">Mom's Life</a></button>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Counts Section -->

<section id="courses" class="courses">
      <div class="container" data-aos="fade-up">

        <div class="row" data-aos="zoom-in" data-aos-delay="100">
            <?php foreach ($data->result() as $art) :?>
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="course-item">
              <img src="<?php echo base_url().'/uploads/'.$art->gambar ?>" class="img-fluid mb-4" alt="...">
                <h3 style="font-size:14px; font-family: Poppins;"><a href="<?php echo site_url('Artikel_kami/lihat_artikel/'. $art->id_artikel .'/'. $art->judul .'/'); ?>"><b><?php echo $art->judul; ?></b></a></h3>
                <div class="row">
                 <div class="col-lg-5">
                  <i class="fas fa-calendar-week"></i>
                  <span style="font-size:11px; font-family: Poppins;"><b><?php echo $art->tanggal_input; ?></b></span>
                </div>
                <div class="col-lg-7">
                 <span style="font-size:10px; font-family: Poppins;"><b><?php echo $art->admin; ?></b></span>
                </div>
              </div>
                <p style="font-size:12px; text-align: justify; font-family: Poppins;"><?php echo $art->read_more; ?></p>
              </div>
            </div>

             
               <?php endforeach; ?>
          </div> <!-- End Course Item-->

          <div class="row">
        <div class="col">
                <!--Tampilkan pagination-->
                <?php echo $pagination; ?>
        </div>
    </div>

        </div>
      
      </div>

    </section><!-- End Courses Section -->








    