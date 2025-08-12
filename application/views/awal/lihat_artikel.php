
 <?php foreach($artikel as $art){ ?>
    <!-- ======= Cource Details Section ======= -->

    <section id="course-details" class="course-details">
      <div class="container" data-aos="fade-up">

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="https://bundapedia.id/Dashboard/artikel"><b>Home</b></a></li>
            <li class="breadcrumb-item active" aria-current="page"><b><?php echo $art->judul; ?></b></li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-lg-12">
             <h3 style="font-size: 30px;" align="center"><b><?php echo $art->judul; ?></b></h3>
              <p style="font-size: 16px;" align="center"><b>
             <?php echo $art->admin; ?> || <?php echo $art->tanggal_input; ?>
            </b></p>
             <p style="font-family: Poppins; font-size:16px; text-align: justify;">
             <?php echo $art->kata_awal; ?>
            </p>
            <h2 align="center"><img src="<?php echo base_url().'/uploads/'.$art->gambar ?>" class="img-fluid" alt="" style="width: 100%; align-content: center;"></h2>
            <p style="font-family: Poppins; font-size:16px; text-align: justify;">
             <?php echo $art->isi_artikel; ?>
            </p>
          </div>
         
        </div>
        



        
        </div>
      </div>
            
    </section><!-- End Cource Details Section -->

        <?php } ?>



 