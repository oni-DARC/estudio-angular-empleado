// Importamos los módulos y servicios necesarios para este componente
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService, Employee } from '../../services/empleado.service';

@Component({
  selector: 'app-administracion', // Selector que se usará para insertar este componente en la plantilla
  standalone: true,             // Indica que este componente es independiente y no necesita un NgModule
  // Se importan módulos necesarios para formularios reactivos, directivas comunes y navegación
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './administracion.component.html', // Ruta al archivo HTML que define la vista
  styleUrls: ['./administracion.component.css']    // Ruta al archivo CSS que contiene los estilos del componente
})
export class AdministracionComponent implements OnInit {
  employees: Employee[] = [];  // Arreglo para almacenar la lista de empleados
  employeeForm: FormGroup;     // Formulario reactivo para registrar o editar empleados
  submitted = false;           // Bandera para indicar si el formulario fue enviado
  isEditing = false;           // Bandera para diferenciar entre edición y creación de un empleado
  currentEmployeeId?: number;  // Almacena el ID del empleado que se está editando (si aplica)
  showForm = false;            // Controla la visibilidad del formulario en la vista

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    // Se crea el formulario utilizando FormBuilder con controles y validaciones:
    // - 'nombre' es obligatorio.
    // - 'correo' es obligatorio y debe tener un formato válido de email.
    // - 'contraseña' y 'confirmarContraseña' son obligatorios.
    // Además, se agrega un validador personalizado para asegurar que ambas contraseñas coincidan.
    this.employeeForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      confirmarContraseña: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Hook del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadEmployees(); // Se carga la lista de empleados al iniciar el componente
  }

  // Método para obtener la lista de empleados mediante el servicio (operación GET)
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      // Si la petición es exitosa, se asigna la respuesta al arreglo 'employees'
      next: (data) => this.employees = data,
      // Si ocurre un error, se imprime en la consola
      error: (err) => console.error('Error al cargar empleados', err)
    });
  }

  // Validador personalizado para confirmar que los campos 'contraseña' y 'confirmarContraseña' coincidan
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('contraseña')?.value;
    const confirmPass = form.get('confirmarContraseña')?.value;
    // Retorna null si las contraseñas coinciden; de lo contrario, retorna un objeto de error
    return pass === confirmPass ? null : { 'mismatch': true };
  }

  // Método que se ejecuta al enviar el formulario (asociado a (ngSubmit) en la plantilla)
  onSubmit(): void {
    this.submitted = true; // Marca que el formulario ha sido enviado
    if (this.employeeForm.valid) {
      // Se extraen los datos del formulario y se crean para el objeto Employee
      const employeeData: Employee = {
        nombre: this.employeeForm.get('nombre')?.value,
        correo: this.employeeForm.get('correo')?.value
      };

      // Si se está en modo edición y se tiene un ID de empleado...
      if (this.isEditing && this.currentEmployeeId != null) {
        // Se asigna el ID actual para realizar la actualización (operación PUT)
        employeeData.id = this.currentEmployeeId;
        this.employeeService.updateEmployee(employeeData).subscribe({
          next: (data) => {
            console.log('Empleado actualizado:', data);
            this.resetForm();     // Reinicia el formulario
            this.loadEmployees(); // Recarga la lista actualizada de empleados
          },
          error: (err) => console.error('Error al actualizar empleado', err)
        });
      } else {
        // Si se trata de un nuevo empleado, se procede a agregarlo (operación POST)
        this.employeeService.addEmployee(employeeData).subscribe({
          next: (data) => {
            console.log('Empleado agregado:', data);
            this.resetForm();     // Reinicia el formulario
            this.loadEmployees(); // Recarga la lista de empleados
          },
          error: (err) => console.error('Error al agregar empleado', err)
        });
      }
    }
  }

  // Prepara el formulario para editar un empleado seleccionado
  onEdit(employee: Employee): void {
    this.isEditing = true;               // Activa el modo edición
    this.currentEmployeeId = employee.id;  // Guarda el ID del empleado a editar
    this.showForm = true;                // Muestra el formulario en la vista
    // Rellena el formulario con los datos actuales del empleado
    this.employeeForm.patchValue({
      nombre: employee.nombre,
      correo: employee.correo,
      // Se dejan vacíos los campos de contraseña para que el usuario ingrese uno nuevo si lo desea
      contraseña: '',
      confirmarContraseña: ''
    });
  }

  // Elimina un empleado utilizando el servicio (operación DELETE)
  onDelete(employee: Employee): void {
    // Verifica que el empleado tenga un ID y solicita confirmación al usuario antes de eliminar
    if (employee.id != null && confirm(`¿Estás seguro de eliminar a ${employee.nombre}?`)) {
      this.employeeService.deleteEmployee(employee.id).subscribe({
        next: () => {
          console.log('Empleado eliminado');
          this.loadEmployees(); // Recarga la lista de empleados tras la eliminación
        },
        error: (err) => console.error('Error al eliminar empleado', err)
      });
    }
  }

  // Muestra el formulario para agregar un nuevo empleado
  onAddNew(): void {
    this.isEditing = false;          // Desactiva el modo edición
    this.currentEmployeeId = undefined; // Limpia cualquier ID previamente seleccionado
    this.resetForm();                // Reinicia el formulario
    this.showForm = true;            // Muestra el formulario en la vista
  }

  // Reinicia el formulario y restablece los estados de envío y visibilidad
  resetForm(): void {
    this.employeeForm.reset(); // Limpia los valores del formulario
    this.submitted = false;    // Resetea la bandera de envío
    this.showForm = false;     // Oculta el formulario luego de registrar o actualizar
  }
}



// - Declaración del Formulario y Validaciones:
// Se crea un formulario reactivo con controles para nombre, correo, contraseña y confirmarContraseña. Se aplican validadores para campos obligatorios, formato de email y se utiliza un validador personalizado para asegurar que las contraseñas coincidan.

// - Carga y Gestión de Empleados:
//      - loadEmployees(): Realiza una petición GET para obtener la lista de empleados y almacenarla en el arreglo employees.
//      - onSubmit(): Maneja el envío del formulario, diferenciando entre la creación de un nuevo empleado (POST) y la actualización de uno existente (PUT).
//      - onEdit(employee): Prepara el formulario para editar un empleado, rellenando los campos con sus datos actuales.
//      - onDelete(employee): Solicita confirmación para eliminar y, de ser aceptada, elimina el empleado mediante una petición DELETE.
//      - onAddNew(): Muestra el formulario para agregar un nuevo empleado.

// - Estados y Control de la Interfaz:
// Variables como submitted, isEditing, currentEmployeeId y showForm controlan la lógica del componente y la visibilidad del formulario, asegurando una experiencia de usuario coherente.