// Importamos la función bootstrapApplication para iniciar la aplicación Angular de manera independiente,
// sin necesidad de un módulo NgModule tradicional.
import { bootstrapApplication } from '@angular/platform-browser';
// Importamos provideRouter para configurar el enrutamiento de la aplicación utilizando las rutas definidas.
import { provideRouter } from '@angular/router';
// Importamos provideHttpClient para configurar y proveer el cliente HTTP (HttpClient) en toda la aplicación.
import { provideHttpClient } from '@angular/common/http';
// Importamos el componente raíz de la aplicación.
import { AppComponent } from './app/app.component';
// Importamos el arreglo de rutas definidas para la navegación de la aplicación.
import { routes } from './app/app.routes';

// Inicializamos la aplicación Angular utilizando bootstrapApplication.
// Se le pasa el componente raíz (AppComponent) y una configuración de proveedores globales.
bootstrapApplication(AppComponent, {
  providers: [
    // Proporciona el enrutamiento a la aplicación utilizando las rutas definidas.
    provideRouter(routes),
    // Proporciona el cliente HTTP para realizar peticiones a APIs.
    provideHttpClient()
  ]
})
// En caso de que ocurra algún error durante el proceso de bootstrap, se captura y se muestra en la consola.
.catch(err => console.error(err));

// - bootstrapApplication: Es la función que arranca la aplicación Angular sin depender de un NgModule, permitiendo una configuración más directa a través de componentes independientes.
// - Providers: La configuración de proveedores se utiliza para inyectar servicios globales. Aquí se incluyen:
//      - provideRouter: Configura la navegación en la aplicación con las rutas definidas en routes.
//      - provideHttpClient: Habilita el uso del servicio HttpClient para realizar peticiones HTTP.
// - Manejo de errores: La función .catch captura errores potenciales durante el inicio de la aplicación, facilitando la depuración mediante la impresión de errores en la consola