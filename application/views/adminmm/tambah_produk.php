
<div class="container-fluid">

  <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Tambah Produk</li>
  </ol>
</nav>

<form action="<?php echo base_url(). 'Adminmm/Data_produk/tambah_aksi'; ?>" method="post" enctype="multipart/form-data">

  <div class="form-group">

    <label for="formGroupExampleInput">Nama Produk</label>

    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nama Produk" name="nama_produk">

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput">Deskripsi</label>

    <textarea class="form-control" name="deskripsi"></textarea>

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput">Link Produk</label>

    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Link Produk" name="link_produk">

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput">Harga Produk</label>

    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Harga Produk" name="harga_produk">

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput2">Gambar</label>

    <input type="file" class="form-control" name="gambar" id="formGroupExampleInput2" placeholder="Gambar">

  </div>



  <button type="submit" class="btn mb-3" style="background-color: #df4e8d; color:white;">Submit</button>



</form>



</div>