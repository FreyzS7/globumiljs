<div class="container-fluid">



<div class="d-sm-flex align-items-center justify-content-between mb-4">

    <h1 class="h3 mb-0 text-gray-800">Kelola Produk</h1>

    <a href="<?php echo base_url('Adminmm/Data_produk/tambah_produk')?>" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa fa-plus" aria-hidden="true"></i> Tambah</a>

</div>

<hr>


<div class="container-fluid">



<table class="table table-bordered">

    <tr>

      <th>No</th>

      <th>Nama Produk</th>

      <th>Harga Produk</th>

      <th colspan="3">Aksi</th>

    </tr>





  <?php 

  $no=1;

  foreach($produk as $kt) : ?>

    <tr>

      <td><?php echo $no++ ?></td>

      <td><?php echo $kt->nama_produk ?></td>

      <td><?php echo $kt->harga_produk ?></td>

      <td><div class="btn btn-success btn-sm"><i class="fas fa-search-plus"></i></div></td>

      <td><?php echo anchor('Adminmm/produk/edit/' .$kt->id_produk, '<div class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></div>') ?></td>

      <td><?php echo anchor('Adminmm/produk/hapus/' .$kt->id_produk, '<div class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></div>')?></td>

    </tr>

  <?php endforeach; ?>

  </table>

</div>