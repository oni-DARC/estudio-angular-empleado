// Importamos Component y OnInit desde Angular, necesarios para definir el componente y su ciclo de vida.
import { Component, OnInit } from '@angular/core';
// Importamos CommonModule para poder usar directivas comunes de Angular en la plantilla (por ejemplo, *ngIf, *ngFor).
import { CommonModule } from '@angular/common';
// Importamos EmployeeService para interactuar con la API de empleados y la interfaz Employee para tipar los datos.
import { EmployeeService, Employee } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados', // Selector que se usará para insertar este componente en la aplicación.
  standalone: true,         // Indica que el componente es independiente y no necesita ser declarado en un NgModule.
  imports: [CommonModule],    // Importa CommonModule para tener acceso a directivas comunes en la plantilla.
  templateUrl: './empleados.component.html', // Archivo HTML que define la vista del componente.
  styleUrls: ['./empleados.component.css']     // Archivo CSS con los estilos para el componente.
})
export class EmpleadosComponent implements OnInit {
  // Declaramos un arreglo que almacenará los empleados obtenidos desde el servicio.
  empleados: Employee[] = [];

  // Inyectamos el EmployeeService a través del constructor para poder usar sus métodos.
  constructor(private employeeService: EmployeeService) { }

  // ngOnInit es un hook del ciclo de vida del componente que se ejecuta una vez que éste ha sido inicializado.
  ngOnInit(): void {
    // Llamamos al método para cargar la lista de empleados cuando el componente se inicialice.
    this.cargarEmpleados();
  }

  // Método para obtener la lista de empleados desde la API.
  cargarEmpleados(): void {
    // Se llama al método getEmployees del EmployeeService, el cual retorna un Observable.
    // Usamos subscribe para escuchar los datos que emite el Observable.
    this.employeeService.getEmployees().subscribe({
      // La función 'next' se ejecuta cuando el Observable emite datos exitosamente.
      // Aquí asignamos los datos recibidos al arreglo 'empleados'.
      next: (data) => this.empleados = data,
      // La función 'error' se ejecuta si ocurre algún problema al obtener los datos.
      // Se imprime un mensaje de error en la consola para ayudar en la depuración.
      error: (err) => console.error('Error al cargar empleados', err)
    });
  }
}


// ngOnInit:
// Es un método del ciclo de vida del componente que se ejecuta después de que Angular ha inicializado las propiedades vinculadas. 
// Se utiliza aquí para llamar a cargarEmpleados() y obtener la lista de empleados desde el servidor.

// subscribe:
// La función subscribe se utiliza para escuchar las emisiones del Observable devuelto por getEmployees(). Permite definir acciones 
// para cuando llegan los datos (next) o cuando ocurre un error (error).