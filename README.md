# JR Notes – SPA CRUD (Laravel + Angular)

Una mini app para gestionar notas rápidas: crear, ver, editar y borrar.
“JR” significa “Jot & Remember” (apunta y recuerda). Es una SPA sencilla
pensada para mostrar un CRUD claro y usable.

## Despliegue rápido (Windows)
- Requisitos: Node.js 18+, npm; PHP 8.3; Composer.
- Backend (Laravel):
  - En `backend`: `composer install`
  - `php artisan key:generate`
  - `php artisan migrate`
  - `php artisan serve --host=127.0.0.1 --port=8000`
- Frontend (Angular):
  - En `frontend`: `npm install`
  - `npm start`

## Cómo verla
- Abre `http://localhost:4200/` en tu navegador.
- Verás la lista de notas. Usa “Nuevo” para crear una nota, “Editar” para
  modificarla y “Eliminar” con confirmación.
- Validaciones: el nombre es obligatorio (mínimo 2 caracteres). Los mensajes
  están en español.

## API (resumen)
- `GET /api/jrs` lista notas.
- `POST /api/jrs` crea.
- `PUT /api/jrs/{id}` actualiza.
- `DELETE /api/jrs/{id}` elimina.

Si no carga, asegúrate de que el backend corre en `http://127.0.0.1:8000/` y
refresca el frontend. En desarrollo, CORS está relajado.


Una app CRUD muy humana y sencilla para gestionar “Jr” (con dos campos: `name` y `description`). Está hecha con cariño y sin complicaciones, como la construiría un desarrollador junior: directa, clara y fácil de entender.

## ¿De qué se trata?
- Lista de elementos (Jr) con nombre y descripción.
- Crear, editar y eliminar con confirmación.
- Validaciones básicas en el formulario (el nombre es obligatorio y mínimo 2 caracteres).
- UI y mensajes en español.

## Tecnologías
- Frontend: Angular (standalone components), `HttpClient`.
- Backend: Laravel, API REST con `Route::apiResource('jrs', ...)`.
- Base de datos: SQLite (archivo local).

## Cómo verlo rápido (Windows)
1) Requisitos
   - Node.js 18+ y npm.
   - PHP 8.3 (con extensiones `pdo_sqlite`, `sqlite3`, `fileinfo`).
   - Composer.

2) Arrancar el backend
   - En `backend`:
     - `composer install`
     - `php artisan key:generate`
     - `php artisan migrate`
     - `php artisan serve --host=127.0.0.1 --port=8000`
   - La API queda en `http://127.0.0.1:8000/api/jrs`.

3) Arrancar el frontend
   - En `frontend`:
     - `npm install`
     - `npm start`
   - Abre `http://localhost:4200/` y navega:
     - “Jr” → listado
     - “Nuevo” → crea un registro
     - “Editar” y “Eliminar” en cada fila

## Endpoints de la API
- `GET /api/jrs` → lista
- `POST /api/jrs` → crea
- `GET /api/jrs/{id}` → detalle
- `PUT /api/jrs/{id}` → actualiza
- `DELETE /api/jrs/{id}` → elimina

Ejemplos rápidos (PowerShell):
```powershell
# Crear
$body = @{ name = "Test JR"; description = "Creado desde PowerShell" } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:8000/api/jrs -Method Post -Body $body -ContentType 'application/json'

# Listar
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/api/jrs
```

## Base de datos
- Archivo: `backend/database/database.sqlite`.
- Migración `jrs` crea: `id`, `name`, `description`, `timestamps`.
- Para reiniciar limpio: borrar el archivo y ejecutar `php artisan migrate` otra vez.

## Cosas que te pueden pasar (y cómo solucionarlas)
- `ERR_CONNECTION_REFUSED` en el frontend:
  - Asegúrate de que el backend está corriendo: `php artisan serve --host=127.0.0.1 --port=8000`.
- Error CORS:
  - En desarrollo se permite `'*'`. Si cambias CORS, ejecuta `php artisan config:clear`.
- Composer pide `ext-fileinfo` o “could not find driver (sqlite)”:
  - Habilita en `php.ini`: `extension=fileinfo`, `extension=pdo_sqlite`, `extension=sqlite3`.
  - Reinicia la terminal para refrescar `PATH` si instalaste PHP/Composer.
- PHP no se reconoce en una nueva terminal:
  - Añade la ruta de PHP al `PATH` de la sesión: `setx PATH "%PATH%;C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.NTS.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe"`.

## Pequeños detalles de la UI (frontend)
- `frontend/src/app/components/jr-form.component.ts`:
  - Validaciones y mensajes en español.
- `frontend/src/app/components/jr-list.component.ts`:
  - Estados: “Cargando…”, “Error al cargar los datos.” y “No hay registros”.
  - Confirmación al eliminar.
- `frontend/src/app/jr.service.ts` apunta a `http://127.0.0.1:8000/api/jrs`.

## Prueba unitaria (opcional)
- `frontend/src/app/jr.service.spec.ts` (en español) comprueba que el servicio se crea.
- Si tienes runner configurado, puedes lanzar `ng test`.

## Filosofía
Simple y directo. Sin patrones complicados. Ideal para entender un CRUD rápido y funcional. Si quieres mejorarlo, puedes añadir paginación, mensajes de éxito y un `environment.ts` para configurar la URL del backend.