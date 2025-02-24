# GestionEmpleados00

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.


## Instalar Angular CLI
- ng version
- npm install -g @angular/cli
- npm install -g json-server


## Crear un nuevo proyecto
- ng new gestion-empleados-00 --standalone --routing --style css

## Estructura
src/app/
  app.component.ts
  app.routes.ts
  main.ts
  pages/
    home/
      home.component.ts
      home.component.html
      home.component.css
    empleados/
      empleados.component.ts
      empleados.component.html
      empleados.component.css
    administracion/
      administracion.component.ts
      administracion.component.html
      administracion.component.css
    error404/
      error404.component.ts
      error404.component.html
      error404.component.css
  services/
    empleado.service.ts
  guards/
    auth.guard.ts


## Creación de Componentes
- ng g c pages/home --standalone
- ng g c pages/empleados --standalone
- ng g c pages/administracion --standalone
- ng g c pages/error404 --standalone
- ng g c pages/login --standalone


## Creación de guardianes
- ng generate guard guards/auth
	- CanActivate

## Creación de servicio
- ng g s services/empleado
- ng generate service services/auth


## 2. Configuración de Rutas (app.routes.ts)
Como Angular 19 con componentes standalone ya no utiliza el tradicional app-routing.module.ts, se define un archivo de rutas y se provee en el bootstrap.
Archivo: src/app/app.routes.ts


## 3. Componente Raíz (app.component.ts)
Este componente contendrá el <router-outlet> para mostrar las rutas definidas.
Archivo: src/app/app.component.ts


## 4. Archivo Principal de Arranque (main.ts)
En Angular 19 se usa la función bootstrapApplication para iniciar la aplicación y se inyecta el enrutamiento junto con el cliente HTTP.
Archivo: src/main.ts


## 5. Servicio para Empleados (empleado.service.ts)
En este servicio se implementan los métodos para comunicarse con la API REST simulada (por ejemplo, utilizando json-server).
Archivo: src/app/services/empleado.service.ts


## 6. Guard para Protección de Rutas (auth.guard.ts)
Este guard protegerá la ruta de administración.
Archivo: src/app/guards/auth.guard.ts

Crear el json db.json
{
	"employees":
		[{"id":"1","nombre":"Juan Pérez","correo":"juan@example.com"},
		{"id":"2","nombre":"María Gómez","correo":"maria@example.com"}
		]
}


## 7. Componentes de Páginas
### 7.1. Página Home
Archivo: src/app/pages/home/home.component.ts
Archivo: src/app/pages/home/home.component.html

### 7.2. Vista de Empleados
En esta vista se mostrará la lista de empleados obtenida mediante el servicio.
Archivo: src/app/pages/empleados/empleados.component.ts
Archivo: src/app/pages/empleados/empleados.component.html

### 7.3. Página de Administración (Formulario para Agregar Empleados)
Esta vista permite agregar empleados mediante un formulario reactivo.
Archivo: src/app/pages/administracion/administracion.component.ts
Archivo: src/app/pages/administracion/administracion.component.html

### 7.4. Página Error 404
Muestra un mensaje cuando la ruta no es válida.
Archivo: src/app/pages/error404/error404.component.ts
Archivo: src/app/pages/error404/error404.component.html

## 8. Orden de configuración
### 1. Configurar auth.service.ts
### 2. app.routes.ts
### 3. auth.guard.ts
### 4. auth.service.ts
### 5. empleado.service.ts
### 6. app.component.ts
### 7. home.component.ts
### 8. home.component.html
### 9. error404.component.ts
### 10. error404.component.html
### 11. empleados.component.ts
### 12. empleados.component.html
### 13. main.ts


## 9. Ejecucióngit add
json-server --watch db.json --port 3000
ng serve
ng serve -o
ng serve --open


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
