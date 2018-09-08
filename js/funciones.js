	
			
$(document).ready(function () {
    //editamos datos del usuario
    $(".editar").on('click', function () 
	{
		// Obtenemos las variables del registro seleccionado
        var id = $(this).attr('id');
        var nombre = $("#nombre" + id).html();
        var email = $("#email" + id).html();
		var edad = $("#edad" + id).html();
		var rfc = $("#rfc" + id).html();
		var telefono = $("#telefono" + id).html();
		var tipo_vehiculo = $("#tipo_vehiculo" + id).html();
		var estado = $("#estado" + id).html();
		
		var optionsTipoVehiculo = construyeOptionTipoVehiculoSelected(tipo_vehiculo);	
		var optionEstados = construyeOptionEstados(estado);
		
        $("<div class='edit_modal'><form name='edit' id='edit' method='post' action='http://localhost/crud/crud/multi_user'>"+
			"<input type='hidden' name='id' class='id' id='id' value="+id+">"+
            "<label>Nombre</label><input type='text' name='nombre' class='nombre' value='"+nombre+"' id='nombre' /><br/>"+
            "<label>Email</label><input type='email' name='email' class='email' value='"+email+"' id='email' /><br/>"+
			"<label>Edad</label><input type='number' name='edad' class='edad' id='edad' value='"+edad+"'/><label id='edad_err'></label><br/>"+
			"<label>RFC</label><input type='text' name='rfc' class='rfc' id='rfc' value='"+rfc+"' /><label id='rfc_err'></label><br/>"+
			"<label>Teléfono</label><input type='text' name='telefono' class='telefono' id='telefono' value='"+telefono+"'/><label id='telefono_err'></label><br/>"+
			"<label>Tipo de Vehículo</label><select name='tipo_vehiculo' class='tipo_vehiculo' id='tipo_vehiculo'>"+optionsTipoVehiculo+"</select><label id='tipo_err'></label><br/>"+
			"<label>Estado de Procedencia</label><select name='estado' class='estado' id='estado'>"+optionEstados+"</select><label id='estados_err'></label><br/>"+
            "</form></div>").dialog({
 
                resizable:false,
                title:'Editar usuario.',
                height:550,
				width:400,
                modal:true,
                buttons:{
                    
                    "Editar":function () {
                        $.ajax({
                            url : $('#edit').attr("action"),
                            type : $('#edit').attr("method"),
                            data : $('#edit').serialize(),
 
                            success:function (data) {
 
                                var obj = JSON.parse(data);
 
                                if(obj.respuesta == 'error')
                                {
                                    
                                    $("#nombre_err").html(obj.nombre + '<br />');
									$("#edad_err").html(obj.edad + '<br />');
									$("#rfc_err").html(obj.rfc + '<br />');
									$("#email_err").html(obj.email + '<br />');
									$("#telefono_err").html(obj.telefono + '<br />');
									$("#tipo_err").html(obj.tipo_vehiculo + '<br />');
									$("#estados_err").html(obj.estado + '<br />');
									return false;
 
                                }else{
 
                                    $('.edit_modal').dialog("close");
 
                                    $("<div class='edit_modal'>El mensajero fué editado correctamente</div>").dialog({
 
                                        resizable:false,
                                        title:'Mensajero editado.',
                                        height:200,
                                        width:450,
                                        modal:true
 
                                    });
 
                                    setTimeout(function() {
                                        window.location.href = "http://localhost/crud/crud";
                                    }, 2000);
 
                                }
 
                            }, error:function (error) {
                                $('.edit_modal').dialog("close");
                                $("<div class='edit_modal'>Ha ocurrido un error!</div>").dialog({
                                    resizable:false,
                                    title:'Error editando!.',
                                    height:200,
                                    width:450,
                                    modal:true
                                });
                            }
 
                        });
                        return false;
                    },
                    Cancelar:function () {
                        $(this).dialog("close");
                    }
                }
            });
    });
 
    //eliminamos datos del usuario
    $(".eliminar").on('click', function () {
 
        var id = $(this).attr('id');
        var nombre = $("#nombre" + id).html();
 
        $("<div class='delete_modal'>¡Estás seguro que deseas eliminar al mensajero " + nombre + "?</div>").dialog({
 
            resizable:false,
            title:'Eliminar al mensajero ' + nombre + '.',
            height:200,
            width:450,
            modal:true,
            buttons:{
 
                "Eliminar":function () {
                    $.ajax({
                        type:'POST',
                        url:'http://localhost/crud/crud/delete_user',
                        async: true,
                        data: { id : id },
                        complete:function () {
                            $('.delete_modal').dialog("close");
                            $("<div class='delete_modal'>El mensajero " + nombre + " fué eliminado correctamente</div>").dialog({
                                resizable:false,
                                title:'Mensajero eliminado.',
                                height:200,
                                width:450,
                                modal:true
                            });
 
                            setTimeout(function() {
                                window.location.href = "http://localhost/crud/crud";
                            }, 2000);
 
                        }, error:function (error) {
 
                            $('.delete_modal').dialog("close");
                            $("<div class='delete_modal'>Ha ocurrido un error!</div>").dialog({
                                resizable:false,
                                title:'Error eliminando al usuario!.',
                                height:200,
                                width:550,
                                modal:true
 
                            });
 
                        }
 
                    });
                    return false;
                },
                Cancelar:function () {
                    $(this).dialog("close");
                }
            }
        });
    });
 
    //añadimos mensajeros nuevos
    $(".agregar").on('click', function () {
 
        var id = $(this).attr('id');
 
        var nombre = $("#nombre" + id).html();
 
        $("<div class='insert_modal'><form name='insert' id='insert' method='post' action='http://localhost/crud/crud/multi_user'>"+
            "<label>Nombre</label><input type='text' name='nombre' class='nombre' id='nombre' /><label id='nombre_err'></label><br/>"+
            "<label>Edad</label><input type='number' name='edad' class='edad' id='edad' /><label id='edad_err'></label><br/>"+
			"<label>RFC</label><input type='text' name='rfc' class='rfc' id='rfc' /><label id='rfc_err'></label><br/>"+
			"<label>Email</label><input type='email' name='email' class='email' id='email' /><label id='email_err'></label><br/>"+
			"<label>Teléfono</label><input type='text' name='telefono' class='telefono' id='telefono' /><label id='telefono_err'></label><br/>"+
			"<label>Tipo de Vehículo</label><select name='tipo_vehiculo' class='tipo_vehiculo' id='tipo_vehiculo'><option value='1'>Auto</option><option value='2'>Moto</option><option value='1'>Bicicleta</option></select><label id='tipo_err'></label><br/>"+
			"<label>Estado de Procedencia</label><select name='estado' class='estado' id='estado'>"+estados+"</select><label id='estados_err'></label><br/>"+
            "</form></div>").dialog({
 
            resizable:false,
            title:'Añadir nuevo usuario.',
            height:550,
            width:400,
            modal:true,
            buttons:{
 
                "Insertar":function () {
                    $.ajax({
                        url : $('#insert').attr("action"),
                        type : $('#insert').attr("method"),
                        data : $('#insert').serialize(),
 
                        success:function (data) 
						{
                            var obj = JSON.parse(data);
                            if(obj.respuesta == 'error')
                            {
                                $("#nombre_err").html(obj.nombre + '<br />');
								$("#edad_err").html(obj.edad + '<br />');
								$("#rfc_err").html(obj.rfc + '<br />');
								$("#email_err").html(obj.email + '<br />');
								$("#telefono_err").html(obj.telefono + '<br />');
								$("#tipo_err").html(obj.tipo_vehiculo + '<br />');
								$("#estados_err").html(obj.estado + '<br />');
								return false;
                            }
							else
							{
								$('.insert_modal').dialog("close");
                                $("<div class='insert_modal'>El mensajero fué añadido correctamente</div>").dialog({
                                    resizable:false,
                                    title:'Mensajero añadido.',
                                    height:200,
                                    width:450,
                                    modal:true
                                });
                                setTimeout(function() {
                                    window.location.href = "http://localhost/crud/crud";
                                }, 2000);
                            }
 
                        }, error:function (error) {
                            $('.insert_modal').dialog("close");
                            $("<div class='insert_modal'>Ha ocurrido un error!</div>").dialog({
                                resizable:false,
                                title:'Error añadiendo!.',
                                height:200,
                                width:450,
                                modal:true
                            });
                        }
                    });
                    return false;
                },
                Cancelar:function () {
                    $(this).dialog("close");
                }
            }
        });
    });
});

// Construir las opciones del select para tipos de vehiculos, seleccionando el que tenemos guardado
function construyeOptionTipoVehiculoSelected(tipo_vehiculo)
{
	var tipo_vehiculo_auto = '';
	var tipo_vehiculo_moto = '';
	var tipo_vehiculo_bicicleta = '';
	
	if(tipo_vehiculo=='Auto') { var tipo_vehiculo_auto = 'selected'; }
	else if(tipo_vehiculo=='Moto') { var tipo_vehiculo_moto = 'selected'; }	
	else if(tipo_vehiculo=='Bicicleta') { var tipo_vehiculo_bici = 'selected'; }
	
	var cadena = "<option value='1' "+tipo_vehiculo_auto+">Auto</option><option value='2' "+tipo_vehiculo_moto+">Moto</option><option value='3' "+tipo_vehiculo_bicicleta+">Bicicleta</option>";
	return cadena;
}	

// Construir las opciones del select para los estados, seleccionando el que tenemos guardado
function construyeOptionEstados(estado)
{
	if(estado=='Aguascalientes') { var Aguascalientes = 'selected'; } 
	else if(estado=='Baja California') { var Baja = 'selected'; }	
	else if(estado=='Baja California Sur') { var Sur = 'selected'; }	
	else if(estado=='Campeche') { var Campeche = 'selected'; }	
	else if(estado=='Coahuila de Zaragoza') { var Coahuila = 'selected'; }	
	else if(estado=='Colima') { var Colima = 'selected'; }	
	else if(estado=='Chiapas') { var Chiapas = 'selected'; }	
	else if(estado=='Chihuahua') { var Chihuahua = 'selected'; }	
	else if(estado=='Distrito Federal') { var Distrito = 'selected'; }	
	else if(estado=='Durango') { var Durango = 'selected'; }	
	else if(estado=='Guanajuato') { var Guanajuato = 'selected'; }	
	else if(estado=='Guerrero') { var Guerrero = 'selected'; }	
	else if(estado=='Hidalgo') { var Hidalgo = 'selected'; }	
	else if(estado=='Jalisco') { var Jalisco = 'selected'; }	
	else if(estado=='México') { var Mexico = 'selected'; }	
	else if(estado=='Michoacán de Ocampo') { var Michoacan = 'selected'; }	
	else if(estado=='Morelos') { var Morelos = 'selected'; }	
	else if(estado=='Nayarit') { var Nayarit = 'selected'; }	
	else if(estado=='Nuevo León') { var Nuevo = 'selected'; }	
	else if(estado=='Oaxaca de Juárez') { var Oaxaca = 'selected'; }	
	else if(estado=='Puebla') { var Puebla = 'selected'; }
	else if(estado=='Querétaro') { var Queretaro = 'selected'; }	
	else if(estado=='Quintana Roo') { var Quintana = 'selected'; }	
	else if(estado=='San Luis Potosí') { var San = 'selected'; }	
	else if(estado=='Sinaloa') { var Sinaloa = 'selected'; }	
	else if(estado=='Sonora') { var Sonora = 'selected'; }	
	else if(estado=='Tabasco') { var Tabasco = 'selected'; }	
	else if(estado=='Tamaulipas') { var Tamaulipas = 'selected'; }	
	else if(estado=='Tlaxcala') { var Tlaxcala = 'selected'; }	
	else if(estado=='Veracruz de Ignacio de la Llave') { var Veracruz = 'selected'; }	
	else if(estado=='Yucatán') { var Yucatan = 'selected'; }
	else if(estado=='Zacatecas') { var Zacatecas = 'selected'; }

	var cadena = "<option value='1' "+Aguascalientes+">Aguascalientes</option><option value='2' "+Baja+">Baja California</option><option value='3' "+Sur+">Baja California Sur</option><option value='4' "+Campeche+">Campeche</option><option value='5' "+Coahuila+">Coahuila de Zaragoza</option><option value='6' "+Colima+">Colima</option><option value='7' "+Chiapas+">Chiapas</option><option value='8' "+Chihuahua+">Chihuahua</option><option value='9' "+Distrito+">Distrito Federal</option><option value='10' "+Durango+">Durango</option><option value='11' "+Guanajuato+">Guanajuato</option><option value='12' "+Guerrero+">Guerrero</option><option value='13' "+Hidalgo+">Hidalgo</option><option value='14' "+Jalisco+">Jalisco</option><option value='15' "+Mexico+">México</option><option value='16' "+Michoacan+">Michoacán de Ocampo</option><option value='17' "+Morelos+">Morelos</option><option value='18' "+Nayarit+">Nayarit</option><option value='19' "+Nuevo+">Nuevo León</option><option value='20' "+Oaxaca+">Oaxaca de Juárez</option><option value='21' "+Puebla+">Puebla</option><option value='22' "+Queretaro+">Querétaro</option><option value='23' "+Quintana+">Quintana Roo</option><option value='24' "+San+">San Luis Potosí</option><option value='25' "+Sinaloa+">Sinaloa</option><option value='26' "+Sonora+">Sonora</option><option value='27' "+Tabasco+">Tabasco</option><option value='28' "+Tamaulipas+">Tamaulipas</option><option value='29' "+Tlaxcala+">Tlaxcala</option><option value='30' "+Veracruz+">Veracruz de Ignacio de la Llave</option><option value='31' "+Yucatan+">Yucatán</option><option value='32' "+Zacatecas+">Zacatecas</option></select";
	return cadena;
}	



var estados = "<option value='1'>Aguascalientes</option><option value='2'>Baja California</option><option value='3'>Baja California Sur</option><option value='4'>Campeche</option><option value='5'>Coahuila de Zaragoza</option><option value='6'>Colima</option><option value='7'>Chiapas</option><option value='8'>Chihuahua</option><option value='9'>Distrito Federal</option><option value='10'>Durango</option><option value='11'>Guanajuato</option><option value='12'>Guerrero</option><option value='13'>Hidalgo</option><option value='14'>Jalisco</option><option value='15'>México</option><option value='16'>Michoacán de Ocampo</option><option value='17'>Morelos</option><option value='18'>Nayarit</option><option value='19'>Nuevo León</option><option value='20'>Oaxaca de Juárez</option><option value='21'>Puebla</option><option value='22'>Querétaro</option><option value='23'>Quintana Roo</option><option value='24'>San Luis Potosí</option><option value='25'>Sinaloa</option><option value='26'>Sonora</option><option value='27'>Tabasco</option><option value='28'>Tamaulipas</option><option value='29'>Tlaxcala</option><option value='30'>Veracruz de Ignacio de la Llave</option><option value='31'>Yucatán</option><option value='32'>Zacatecas</option></select";