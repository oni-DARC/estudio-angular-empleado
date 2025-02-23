// Importamos los módulos y servicios necesarios desde Angular.
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

// El decorador @Injectable indica que este guard se puede inyectar en otros componentes o servicios.
// 'providedIn: root' asegura que se crea una única instancia global en la aplicación.
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Esta línea comentada se usaba para simular la autenticación manualmente.
  // En un caso real, se utiliza AuthService para gestionar el estado de autenticación.
  // private isAuthenticated = true;

  // El constructor inyecta AuthService para verificar el estado de autenticación
  // y Router para realizar redirecciones en caso de que el usuario no esté autenticado.
  constructor(private authService: AuthService, private router: Router) {}

  // El método canActivate es obligatorio para la implementación de la interfaz CanActivate.
  // Este método decide si se permite o no el acceso a una ruta.
  // Devuelve:
  // - true, si se permite el acceso.
  // - UrlTree, que redirige al usuario a otra ruta (por ejemplo, a la pantalla de login).
  canActivate(): boolean | UrlTree {
    // Si el usuario está autenticado, se permite el acceso.
    // Si no, se redirige a la pantalla de login.
    // Se consulta el estado de autenticación usando AuthService.
    if (this.authService.isAuthenticated) {
      // Si el usuario está autenticado, se permite el acceso a la ruta protegida.
      return true;
    }
    // Si el usuario no está autenticado, se redirige a la ruta '/login'.
    // Se incluye un parámetro 'returnUrl' para que, tras el login, se pueda redirigir de vuelta
    // a la sección deseada (en este caso, '/administracion').
    // Se puede incluir un parámetro de retorno para redirigir de vuelta luego del login.
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: '/administracion' } });
  }
}

// Importaciones y Decorador: Se importan módulos esenciales de Angular y el servicio de autenticación. El decorador @Injectable con providedIn: 'root' asegura 
// que el guard se comparta globalmente.

// Inyección de Dependencias: Se inyecta AuthService para acceder al estado de autenticación y Router para manejar redirecciones.

// Método canActivate: Este método verifica el estado de autenticación. Si el usuario está autenticado, retorna true y permite el acceso. 
// Si no, utiliza router.createUrlTree para redirigir al usuario a la página de login, pasando como parámetro la ruta a la que se intentaba acceder 
// originalmente (en este ejemplo, /administracion).