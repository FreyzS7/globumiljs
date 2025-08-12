<div class="container-fluid">
	<h3><i class="fas fa-edit"></i>EDIT DATA FASKES</h3>

	<?php foreach($kategori as $kt) :  ?>

		<form method="post" action="<?php echo base_url(). 'adminmm/kategori_artikel/update' ?>">
			<div class="for-group mb-3">
				<label>Nama Kategori Artikel</label>
				<input type="hidden" name="id_kategoriartikel" class="form-control" value="<?php echo $kt->id_kategoriartikel ?>">
				<input type="text" name="nama_kategori" class="form-control" value="<?php echo $kt->nama_kategori ?>">
			</div>

			<button type="submit" class="btn btn-primary btn-sm">Simpan</button>
		</form>

	<?php endforeach; ?>
</div>