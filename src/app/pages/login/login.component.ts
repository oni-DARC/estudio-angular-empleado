// Importamos los módulos y servicios necesarios para el componente
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login', // Selector para usar el componente en plantillas
  standalone: true, // Indica que este componente es independiente y no requiere de un NgModule
  imports: [CommonModule, ReactiveFormsModule], // Módulos necesarios para la plantilla y formularios reactivos
  templateUrl: './login.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./login.component.css'] // Ruta al archivo de estilos CSS
})
export class LoginComponent {
  // Definición del formulario reactivo que maneja el login
  loginForm: FormGroup;
  // Variable para almacenar y mostrar mensajes de error en la vista
  errorMessage = '';

  constructor(
    private fb: FormBuilder,         // Inyecta FormBuilder para crear el formulario de manera sencilla
    private authService: AuthService, // Inyecta AuthService para manejar la lógica de autenticación
    private router: Router,           // Inyecta Router para manejar la navegación entre rutas
    private route: ActivatedRoute     // Inyecta ActivatedRoute para acceder a parámetros de la ruta actual (como queryParams)
  ) {
    // Inicializa el formulario con dos controles: username y password, ambos requeridos
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Método que se ejecuta al enviar el formulario de login
  onSubmit(): void {
    // Verifica si el formulario es válido (todos los campos requeridos han sido completados correctamente)
    if (this.loginForm.valid) {
      // Obtiene el valor del campo 'username'
      const username = this.loginForm.get('username')?.value;
      // Obtiene el valor del campo 'password'
      const password = this.loginForm.get('password')?.value;
      
      // Llama al método login del AuthService para validar las credenciales
      if (this.authService.login(username, password)) {
        // Recupera la URL a la que se intentaba acceder desde los queryParams (si existe)
        // Si no existe, utiliza '/administracion' como ruta predeterminada
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/administracion';
        // Navega a la ruta de retorno utilizando el Router
        this.router.navigateByUrl(returnUrl);
      } else {
        // Si las credenciales son incorrectas, actualiza la variable errorMessage para mostrar un mensaje de error
        this.errorMessage = 'Credenciales inválidas. Inténtalo nuevamente.';
      }
    }
  }
}

// - Importaciones: Se importan módulos esenciales para construir un componente de Angular, trabajar con formularios reactivos, manejar rutas y utilizar el servicio de autenticación.
// - Decorador @Component: Define el componente LoginComponent como un componente standalone, especificando su selector, módulos necesarios, plantilla HTML y estilos.
// - Constructor: Inyecta dependencias (FormBuilder, AuthService, Router y ActivatedRoute) y crea el formulario reactivo con dos controles obligatorios.
// - Método onSubmit():
//    - Verifica que el formulario sea válido.
//    - Extrae los valores de usuario y contraseña.
//    - Llama al método login del servicio de autenticación para validar las credenciales.
//    - En caso de éxito, redirige al usuario a la URL indicada en los parámetros de la ruta o a una ruta predeterminada.
//    - Si las credenciales no son válidas, muestra un mensaje de error.
