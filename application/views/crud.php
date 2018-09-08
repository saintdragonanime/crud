<!DOCTYPE html>
<html lang="es">
<head>
    <title>Crud</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>css/960.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>css/text.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>css/reset.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>css/estilos.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.1/themes/ui-darkness/jquery-ui.css" />
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
    <script type="text/javascript" src="<?php echo base_url()?>js/funciones.js"></script>
</head>
<body>

  <div class="container_12">
		<br>
        <h1>Crud de mensajeros </h1>
        <div class="grid_12">
            <div class="grid_12" id="head">
                <div class="grid_1" id="head_nombre">Nombre</div>
                <div class="grid_2" id="head_email">Email</div>
				<div class="grid_1" id="head_edad">Edad</div>
                <div class="grid_1" id="head_rfc">RFC</div>
				<div class="grid_2" id="head_telefono">Teléfono</div>
                <div class="grid_1" id="head_tipo_vehiculo">Vehículo</div>
				<div class="grid_1" id="head_estado">Estado</div>
                <div class="grid_1" id="head_eliminar">Eliminar</div>
                <div class="grid_1" id="head_editar">Editar</div>
            </div>
            <?php
			$vehiculo = '';
            foreach($users as $fila):
			if($fila->tipo_vehiculo==1) $vehiculo = 'Auto'; elseif($fila->tipo_vehiculo==2) $vehiculo = 'Moto'; elseif($fila->tipo_vehiculo==3) $vehiculo = 'Bicicleta';
			
			$nombre_estado = '';
			foreach($estados as $estado):
			if($fila->estado==$estado->id) $nombre_estado = $estado->estado;
			endforeach;
            ?>
            <div class="grid_12" id="body">
                <div class="grid_1" id="nombre<?=$fila->id?>"><?=$fila->nombre?></div>
                <div class="grid_2" id="email<?=$fila->id?>"><?=$fila->email?></div>
				<div class="grid_1" id="edad<?=$fila->id?>"><?=$fila->edad?></div>
				<div class="grid_1" id="rfc<?=$fila->id?>"><?=$fila->rfc?></div>
				<div class="grid_2" id="telefono<?=$fila->id?>"><?=$fila->telefono?></div>
				<div class="grid_1" id="tipo_vehiculo<?=$fila->id?>"><?=$vehiculo?></div>
				<div class="grid_1" id="estado<?=$fila->id?>"><?=$nombre_estado?></div>
				
                <div class="grid_1" id="eliminar"><input type="button" value="Eliminar" id="<?=$fila->id?>" class="eliminar"></div>
                <div class="grid_1" id="editar"><input type="button" value="Editar" id="<?=$fila->id?>" class="editar"></div>
            </div>
            <?php
            endforeach;
            ?>
            <div class="grid_12" id="agregar"><input type="button" value="Añadir" id="<?=$fila->id?>" class="agregar"></div>
        </div>
    </div>
   
</body>
</html>