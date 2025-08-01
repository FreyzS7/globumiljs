<div class="container-fluid">





<form action="<?php echo base_url(). 'Adminmm/Data_artikel/tambah_aksi'; ?>" method="post" enctype="multipart/form-data">

  <div class="form-group">

    <label for="formGroupExampleInput">Judul</label>

    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Judul Artikel" name="judul">

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput">Tanggal Input</label>

    <input type="date" class="form-control" id="formGroupExampleInput" placeholder="Judul Artikel" name="tanggal_input">

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput">Admin</label>

    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Admin" name="admin">

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput2">Kategori Artikel</label>

    <select class="form-control" name="id_kategoriartikel">

       <option>-- Pilih Kategori -- </option>

       <?php foreach($kategori as $kt){ ?>

         

          <option value="<?php echo $kt['id_kategoriartikel']; ?>"><?php echo $kt['nama_kategori']; ?></option>

        <?php } ?>

      </select>

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput2">Read More</label>

    <textarea class="form-control" name="read_more"></textarea>

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput2">Kata Awal Artikel</label>

    <textarea class="form-control" name="kata_awal"></textarea>

  </div>

  <div class="form-group">

    <label for="formGroupExampleInput2">Teks Artikel</label>

    <textarea class="form-control" name="isi_artikel"></textarea>

  </div>



  <div class="form-group">

    <label for="formGroupExampleInput2">Gambar Artikel</label>

    <input type="file" class="form-control" name="gambar" id="formGroupExampleInput2" placeholder="Another input placeholder">

  </div>



  <button type="submit" class="btn mb-3" style="background-color: #df4e8d; color:white;">Submit</button>



</form>



</div>