<div class="container-fluid">

	<h3><i class="fas fa-edit"></i>EDIT DATA ARTIKEL</h3>



	<?php foreach($artikel as $art) :  ?>



		<form method="post" action="<?php echo base_url(). 'Adminmm/Data_artikel/update_artikel' ?>">

			<div class="form-group">

			    <label for="formGroupExampleInput">Judul</label>

			      <input type="hidden" class="form-control" id="formGroupExampleInput" placeholder="Judul Artikel" name="id_artikel" value="<?php echo $art->id_artikel ?>">

			    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Judul Artikel" name="judul" value="<?php echo $art->judul ?>">

			</div>

			 <div class="form-group">

			    <label for="formGroupExampleInput">Tanggal Input</label>

			    <input type="date" class="form-control" id="formGroupExampleInput" placeholder="Judul Artikel" name="tanggal_input" value="<?php echo $art->tanggal_input ?>">

			  </div>

			  <div class="form-group">

			    <label for="formGroupExampleInput">Admin</label>

			    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Admin" name="admin" value="<?php echo $art->admin ?>">

			  </div>

			  <div class="form-group">

			    <label for="formGroupExampleInput2">Kategori Artikel</label>

			    <select class="form-control" name="id_kategoriartikel">

			       <option value="<?php echo $art->id_kategoriartikel ?>"><?php echo $art->id_kategoriartikel ?></option>

			       <?php foreach($kategori as $kt){ ?>

			         

			          <option value="<?php echo $kt['id_kategoriartikel']; ?>"><?php echo $kt['nama_kategori']; ?></option>

			        <?php } ?>

			      </select>

			  </div>

			  <div class="form-group">

			    <label for="formGroupExampleInput2">Read More</label>

			    <textarea class="form-control" name="read_more" ><?php echo $art->read_more ?></textarea>

			  </div>


			  <div class="form-group">

			    <label for="formGroupExampleInput2">Kata Awal Artikel</label>

			    <textarea class="form-control" name="kata_awal" ><?php echo $art->kata_awal ?></textarea>

			  </div>


			  <div class="form-group">

			    <label for="formGroupExampleInput2">Teks Artikel</label>

			    <textarea class="form-control" name="isi_artikel"><?php echo $art->isi_artikel ?></textarea>

			  </div>




			<button type="submit" class="btn btn-primary btn-sm">Simpan</button>

		</form>



	<?php endforeach; ?>

</div>