<div class="container-fluid">



<div class="d-sm-flex align-items-center justify-content-between mb-4">

    <h1 class="h3 mb-0 text-gray-800">Kelola Artikel</h1>

    <a href="<?php echo base_url('Adminmm/Data_artikel/tambah_artikel')?>" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa fa-plus" aria-hidden="true"></i> Tambah</a>

</div>

<hr>
          <div class="card-body">

                <div class="row">

               <?php foreach($artikel as $art) : ?>

                    <div class="col-md-3">

                        <div class="card card-primary">

                            <div class="card-header">

                                <h3 class="card-heading" style="font-size: 20px;"><?php echo $art->judul; ?></h3>

                            </div>

                            <div class="card-body">

                                <div class="text-center">

                                    <img alt="<?php echo $art->judul; ?>" class="img img-fluid rounded" src="<?php echo base_url().'/uploads/'.$art->gambar ?>" style="width: 1000px; max-height: 800px">

                                    <br>

                                    <br>

                                </div>

                                

                            </div>

                            <div class="card-footer text-center">

                                <a href="<?php echo site_url('Adminmm/Data_artikel/tampil_artikel/'. $art->id_artikel); ?>" class="btn btn-info btn-sm"><i class="fa fa-eye"></i></a>

                                <a href="<?php echo site_url('Adminmm/Data_artikel/edit_artikel/'. $art->id_artikel); ?>" class="btn btn-success btn-sm"><i class="fa fa-edit"></i></a>

                                <a href="<?php echo site_url('Adminmm/Data_artikel/hapus_artikel/'. $art->id_artikel); ?>" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></a>

                            </div>

                        </div>

                    </div>

                <?php endforeach; ?>

                </div>

            </div>