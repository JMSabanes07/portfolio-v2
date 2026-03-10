# Instrucciones para Restaurar el Esquema de PocketBase

## Información Recopilada del Código

Basándonos en el análisis del código fuente, se ha identificado lo siguiente:

### Colección Requerida

- **Nombre de la colección**: `projects`
- **Tipo**: Colección base (no sistema)

### Campos Requeridos

1. **name** (texto, requerido)
2. **slug** (texto, requerido, único)
3. **short_desc** (texto, requerido)
4. **long_desc** (texto, opcional)
5. **app_type** (select, requerido, valores posibles: web, android, ios, desktop)
6. **go_to** (URL, opcional)
7. **icons** (texto, opcional, lista)
8. **thumbnail** (archivo, requerido, imagen)
9. **images** (archivo, opcional, lista de imágenes)
10. **year** (número, requerido, año entre 1900 y 2100)

### Configuración de la Aplicación

- URL de PocketBase: `PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090`
- URL de Imágenes: `PUBLIC_POCKETBASE_IMAGES_URL=http://127.0.0.1:8090/api/files`

## Pasos para Restaurar Manualmente

### Opción 1: Usando el Panel de Administración de PocketBase

1. Inicia PocketBase:

   ```bash
   ./pocketbase serve
   ```

2. Accede a la interfaz de administración: http://127.0.0.1:8090/_

3. Crea una nueva cuenta de administrador si es necesario

4. Ve a "Collections" > "Create Collection"

5. Crea una colección con nombre `projects` y tipo `base`

6. Agrega los siguientes campos:
   - **name**: Tipo Text, Requerido ✓
   - **slug**: Tipo Text, Requerido ✓, Único ✓
   - **short_desc**: Tipo Text, Requerido ✓
   - **long_desc**: Tipo Text, Opcional
   - **app_type**: Tipo Select, Requerido ✓, Valores: web, android, ios, desktop
   - **go_to**: Tipo URL, Opcional
   - **icons**: Tipo Text, Opcional, Lista ✓
   - **thumbnail**: Tipo File, Requerido ✓, Máximo 1 archivo, Máximo 5MB, Tipos permitidos: jpeg, png, svg, webp
   - **images**: Tipo File, Opcional, Lista ✓, Máximo 99 archivos, Máximo 5MB, Tipos permitidos: jpeg, png, svg, webp
   - **year**: Tipo Number, Requerido ✓, Mínimo 1900, Máximo 2100

### Opción 2: Usando el Archivo JSON

Si tienes acceso directo a los archivos de PocketBase:

1. Detén el servidor de PocketBase si está en ejecución

2. Copia el archivo `projects_collection.json` generado en el directorio `pb_data/collections/`

3. Reinicia PocketBase

### Opción 3: Usando el Script Generado

1. Haz ejecutable el script:

   ```bash
   chmod +x restore_pocketbase_schema.sh
   ```

2. Ejecuta el script:
   ```bash
   ./restore_pocketbase_schema.sh
   ```

## Notas Importantes

- La aplicación está usando Astro como framework frontend
- Las imágenes se sirven desde la ruta `/api/files/projects/{record_id}/{filename}`
- La consulta de datos se hace con `pb.collection('projects').getFullList()` ordenado por año descendente (`sort: '-year'`)
- La interfaz espera que el campo `app_type` sea numérico según el enum en `src/types/projects.ts`:
  ```typescript
  enum AppType {
    web, // 0
    android, // 1
    ios, // 2
    desktop, // 3
  }
  ```

## Variables de Entorno Requeridas

Asegúrate de tener estas variables en tu archivo `.env`:

```
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
PUBLIC_POCKETBASE_IMAGES_URL=http://127.0.0.1:8090/api/files
```

## Prueba de la Configuración

Después de restaurar el esquema:

1. Asegúrate de que PocketBase esté corriendo en `http://127.0.0.1:8090`

2. Inicia la aplicación Astro:

   ```bash
   npm run dev
   ```

3. Verifica que la sección de proyectos cargue correctamente

4. Prueba creando un registro de ejemplo en la colección `projects` desde el panel de administración
