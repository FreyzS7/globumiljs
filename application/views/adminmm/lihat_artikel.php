<div class="container-fluid">

<div class="card mb-3">
  <?php foreach($artikel as $art) : ?>
  <img src="<?php echo base_url().'/uploads/'.$art->gambar ?>" class="card-img-top" alt="..." style="width: 50%;">
  <div class="card-body">
    <h5 class="card-title"><?php echo $art->judul ?></h5>
    <p class="card-text"><?php echo $art->isi_artikel ?></p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>

 <?php endforeach; ?>
</div>