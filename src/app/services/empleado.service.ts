// Importamos los módulos necesarios desde Angular para hacer inyecciones de dependencia y realizar peticiones HTTP.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definición de la interfaz Employee, que describe la estructura de un objeto empleado.
// La propiedad 'id' es opcional (puede que el empleado aún no tenga asignado un identificador).
export interface Employee {
  id?: number; // Identificador único del empleado (opcional)
  nombre: string; // Nombre del empleado
  correo: string; // Correo electrónico del empleado
  // Otros campos adicionales se pueden agregar
}

// El decorador @Injectable con 'providedIn: root' indica que este servicio estará disponible a nivel global en la aplicación.
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // URL de la API simulada para realizar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
  private apiUrl = 'http://localhost:3000/employees'; // URL de la API simulada

  // El constructor inyecta el HttpClient, que se usará para realizar las peticiones HTTP.
  constructor(private http: HttpClient) {}

  // Método GET: Obtiene la lista de empleados.
  // Retorna un Observable que emite un arreglo de objetos Employee.
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Método POST: Agrega un nuevo empleado.
  // Envía los datos del empleado a la API y retorna un Observable que emite el objeto Employee creado.
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Método PUT: Actualiza los datos de un empleado existente.
  // Utiliza el id del empleado para construir la URL específica y envía los nuevos datos.
  // Retorna un Observable que emite el objeto Employee actualizado.
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  // Método DELETE: Elimina un empleado.
  // Recibe el id del empleado a eliminar, construye la URL y realiza una petición DELETE.
  // Retorna un Observable sin valor (void) una vez completada la operación.
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// - Interfaz Employee: Define la estructura de los datos de un empleado, facilitando el tipado y la consistencia en el manejo de datos.
// - Inyección de Dependencias: Se utiliza el HttpClient para realizar peticiones HTTP a una API simulada.
// - Métodos CRUD:
//    - getEmployees(): Recupera la lista de empleados.
//    - addEmployee(): Envía datos para crear un nuevo empleado.
//    - updateEmployee(): Envía datos actualizados de un empleado existente, utilizando su ID.
//    - deleteEmployee(): Elimina un empleado especificado por su ID.