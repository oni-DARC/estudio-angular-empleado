// Importamos el decorador Component para definir un componente Angular.
import { Component } from '@angular/core';
// Importamos la directiva RouterLink para permitir la navegación en la plantilla a través de enlaces.
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404', // Selector que se usa para insertar este componente en la plantilla.
  standalone: true,        // Indica que el componente es independiente y no requiere ser declarado en un NgModule.
  imports: [RouterLink],     // Permite utilizar la directiva RouterLink dentro de la plantilla de este componente.
  templateUrl: './error404.component.html', // Ruta del archivo HTML que contiene la vista del componente.
  styleUrls: ['./error404.component.css']    // Ruta del archivo CSS que contiene los estilos del componente.
})
export class Error404Component { 
  // Este componente se muestra cuando el usuario navega a una ruta que no existe (Error 404).
}


// Component Decorator:
// Define la configuración del componente, incluyendo su selector, plantilla, estilos y módulos/directivas necesarios.

// standalone:
// Permite que el componente se utilice de forma independiente, sin necesidad de incluirlo en un módulo Angular tradicional.

// imports:
// Al importar RouterLink, se habilita el uso de enlaces de navegación en la vista, facilitando la redirección del usuario en la aplicación.

// Función del Componente:
// Error404Component actúa como la página de error para rutas no definidas, informando al usuario que la página solicitada no existe.