// Importamos decoradores y clases necesarias desde Angular y RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// BehaviorSubject: Es una especialización de Observable que siempre guarda el último valor emitido y lo emite a nuevos suscriptores. 
// Aquí se utiliza para manejar el estado de autenticación en tiempo real.

// Getters: Se utilizan para exponer tanto el valor actual (isAuthenticated) como un Observable (isAuthenticated$) para que otros componentes 
// puedan reaccionar a los cambios.

// Decorador Injectable que indica que este servicio puede ser inyectado en otros componentes o servicios
// 'providedIn: root' significa que el servicio se provee a nivel global en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Creamos un BehaviorSubject que mantiene el estado de autenticación.
  // Inicialmente se establece en false, lo que significa que el usuario no está autenticado.
  // Manejamos el estado de autenticación con un BehaviorSubject
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Getter para obtener el valor actual de la autenticación.
  // Accedemos a la propiedad 'value' del BehaviorSubject, que siempre contiene el último estado emitido.
  // Permite consultar el estado actual
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Getter que expone el BehaviorSubject como un Observable.
  // Permite a otros componentes suscribirse a los cambios en el estado de autenticación.
  // Permite suscribirse a los cambios en el estado de autenticación (opcional)
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Método para "loguear" al usuario (en un caso real, se haría una petición a un backend)
  // En un caso real, aquí se realizaría una petición a un backend para validar las credenciales.
  // En este ejemplo, se valida de forma simple comparando con valores predefinidos.
  login(username: string, password: string): boolean {
    // Se comprueba si las credenciales son iguales a 'admin'
    if (username === 'admin' && password === 'admin') {
      // Se actualiza el estado de autenticación a 'true'
      this.isAuthenticatedSubject.next(true);
      return true; // Retorna true indicando que el login fue exitoso
    }
    // Si las credenciales no son válidas, retorna false sin modificar el estado
    return false;
  }

  // Método para "desloguear" al usuario.
  // Simplemente se cambia el estado de autenticación a false
  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}