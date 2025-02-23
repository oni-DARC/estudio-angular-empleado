// Importa el decorador Component desde Angular, que se usa para definir un componente.
import { Component } from '@angular/core';
// Importa la directiva RouterLink, que permite enlazar rutas en la plantilla.
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home', // Define el nombre del selector que se usará para insertar este componente en las plantillas.
  standalone: true,    // Indica que este componente es independiente y no requiere ser declarado en un NgModule.
  imports: [RouterLink], // Importa la directiva RouterLink para poder usar enlaces de navegación en la plantilla.
  templateUrl: './home.component.html', // Especifica el archivo HTML que contiene la vista del componente.
  styleUrls: ['./home.component.css']   // Especifica el archivo CSS para los estilos de este componente.
})
export class HomeComponent { 
  // Este componente no contiene lógica adicional, su función principal es mostrar la vista definida en el template.
}


// Component Decorator:
// Define el componente y establece su configuración, como el selector, si es standalone, qué módulos/directivas se necesitan, la plantilla y los estilos.

// standalone:
// Permite que el componente se use de forma independiente, sin necesidad de declarar un módulo aparte.

// imports:
// Al incluir RouterLink, el componente puede utilizar esta directiva en su plantilla para crear enlaces de navegación.