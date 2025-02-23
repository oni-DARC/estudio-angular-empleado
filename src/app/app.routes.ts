// Importamos las dependencias necesarias para definir rutas en Angular.
import { Routes } from '@angular/router';

// Importamos los componentes que se mostrarán según la ruta.
import { HomeComponent } from './pages/home/home.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';

// Importamos el guard que protege rutas restringidas (solo accesibles si se cumple cierta condición, en este caso autenticación).
import { AuthGuard } from './guards/auth.guard';

// Definimos las rutas de la aplicación utilizando el arreglo 'routes'.
// Cada objeto en el arreglo representa una ruta con su respectivo componente y configuraciones adicionales.
export const routes: Routes = [
  // Ruta raíz (''): muestra el componente HomeComponent.
  { path: '', component: HomeComponent },
  // Ruta '/empleados': muestra el componente EmpleadosComponent.
  { path: 'empleados', component: EmpleadosComponent },
  // Ruta '/administracion': muestra el componente AdministracionComponent,
  // pero está protegida por el AuthGuard, que verifica si el usuario está autenticado
  { path: 'administracion', component: AdministracionComponent, canActivate: [AuthGuard] },
  // Ruta '/login': muestra el componente LoginComponent, utilizado para iniciar sesión.
  { path: 'login', component: LoginComponent },
  // Ruta comodín '**': captura todas las rutas no definidas y muestra el componente Error404Component,
  // indicando que la página solicitada no existe.
  { path: '**', component: Error404Component }
];

// Importaciones: Se traen los componentes y el guard necesarios para definir las rutas.
// Rutas Definidas:
//  - La ruta vacía ('') corresponde a la página principal.
//  - Otras rutas específicas (empleados, administracion, login) muestran sus respectivos componentes.
//  - La ruta 'administracion' está protegida por AuthGuard, lo que significa que solo se puede acceder a ella si se cumple la condición de autenticación.
//  - La ruta comodín ('**') captura cualquier ruta que no coincida con las definidas y redirige al componente de error 404, indicando que la ruta solicitada no existe.