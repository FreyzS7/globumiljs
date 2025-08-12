<div class="container-fluid">



<h2><b>Kategori Artikel</b></h2>

<form action="<?php echo base_url(). 'Adminmm/Kategori_artikel/tambah_aksi'; ?>" method="post">

  <div class="form-group">

    <label for="formGroupExampleInput">Nama Kategori</label>

    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nama Kategori" name="nama_kategori">

  </div>

  <button type="submit" class="btn mb-3" style="background-color: #df4e8d; color:white;">Submit</button>

</form>



  <table class="table table-bordered">

    <tr>

      <th>No</th>

      <th>Nama Kategori</th>

      <th colspan="3">Aksi</th>

    </tr>





  <?php 

  $no=1;

  foreach($kategori as $kt) : ?>

    <tr>

      <td><?php echo $no++ ?></td>

      <td><?php echo $kt->nama_kategori ?></td>

      <td><div class="btn btn-success btn-sm"><i class="fas fa-search-plus"></i></div></td>

      <td><?php echo anchor('Adminmm/Kategori_artikel/edit/' .$kt->id_kategoriartikel, '<div class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></div>') ?></td>

      <td><?php echo anchor('Adminmm/Kategori_artikel/hapus/' .$kt->id_kategoriartikel, '<div class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></div>')?></td>

    </tr>

  <?php endforeach; ?>

  </table>

</div>





</div>



