<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
Class Crud extends CI_CONTROLLER
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database('default');
		$this->load->helper(array('url','form'));
		$this->load->library(array('form_validation'));
		$this->load->model('crud_model');
	}
	 
	// Cargamos la vista y pasamos los usuarios 
	public function index()
	{
		$data = array('users' => $this->crud_model->get_users(), 'estados' => $this->crud_model->get_estados());
		$this->load->view('crud',$data);
	}
	 
	 
	// Función para eliminar 
	public function delete_user()
	{
		//comprobamos si es una petición ajax y existe la variable post id
		if($this->input->is_ajax_request() && $this->input->post('id'))
		{
			$id = $this->input->post('id');
			$this->crud_model->delete_user($id);
	 	}
	}
	 
	//con esta función añadimos y editamos usuarios dependiendo 
	//si llega la variable post id, en ese caso editamos
	public function multi_user()
	{
		//comprobamos si es una petición ajax
		if($this->input->is_ajax_request())
		{
			$this->form_validation->set_rules('nombre', 'nombre', 'trim|min_length[2]|required|max_length[60]');
			$this->form_validation->set_rules('email', 'email', 'trim|min_length[4]|required|max_length[100]|valid_email');
			$this->form_validation->set_rules('edad', 'edad', 'min_length[2]|required|max_length[3]');
			$this->form_validation->set_rules('rfc', 'rfc', 'trim|min_length[10]|required|max_length[13]');
			$this->form_validation->set_rules('telefono', 'telefono', 'trim|min_length[10]|required|max_length[10]');
			$this->form_validation->set_rules('tipo_vehiculo', 'tipo_vehiculo', 'required');
			$this->form_validation->set_rules('estado', 'estado', 'required');
			
			$this->form_validation->set_message('required','El campo %s es obligatorio');
			$this->form_validation->set_message('valid_email','El campo %s no es válido');
			
			$this->form_validation->set_message('max_length', 'El %s no puede tener más de %s carácteres');
			$this->form_validation->set_message('min_length', 'El %s no puede tener menos de %s carácteres');
		
			if($this->form_validation->run() == FALSE)
			{
				//de esta forma devolvemos los errores de formularios
				$errors = array(
					'nombre' => form_error('nombre'),
					'edad' => form_error('edad'),
					'rfc' => form_error('rfc'),
					'telefono' => form_error('telefono'),
					'tipo_vehiculo' => form_error('tipo_vehiculo'),
					'estado' => form_error('estado'),
					'email' => form_error('email'),
					'respuesta' => 'error'
				);
				//y lo devolvemos así para parsearlo con JSON.parse
				echo json_encode($errors);
				return FALSE;
			}
			else
			{
	 			$nombre = $this->input->post('nombre');
				$email = $this->input->post('email');
				$edad = $this->input->post('edad');
				$rfc = $this->input->post('rfc');
				$telefono = $this->input->post('telefono');
				$tipo_vehiculo = $this->input->post('tipo_vehiculo');
				$estado = $this->input->post('estado');
	 
				//si estamos editando
				if($this->input->post('id'))
				{
					$id = $this->input->post('id');
					$this->crud_model->edit_user($id,$nombre,$email,$edad,$rfc,$telefono,$tipo_vehiculo,$estado);
	 			}
				else //si estamos agregando un usuario
				{
					$this->crud_model->new_user($nombre,$email,$edad,$rfc,$telefono,$tipo_vehiculo,$estado);
	 			}
				
				$response = array(
					'respuesta' => 'ok'
				);
				echo json_encode($response);
			}
		}
	}
 
}
 