const { execSync } = require('child_process')
const fs = require('fs')

console.log('Restaurando el esquema de la base de datos de PocketBase...')

// Verifica si PocketBase está instalado globalmente o localmente
let pocketbaseCmd = 'pocketbase'
try {
  execSync('which pocketbase', { stdio: 'pipe' })
  console.log('PocketBase encontrado en el sistema')
} catch (e) {
  try {
    execSync('which ./pocketbase', { stdio: 'pipe' })
    pocketbaseCmd = './pocketbase'
    console.log('PocketBase encontrado localmente')
  } catch (e) {
    console.error(
      'ERROR: No se encontró PocketBase. Por favor instale PocketBase antes de continuar.'
    )
    console.error('Visite: https://pocketbase.io/docs/')
    process.exit(1)
  }
}

// Comandos para crear la colección de proyectos
const createProjectsCollection = `
# Script para restaurar el esquema de la base de datos de PocketBase

echo "Creando colección de proyectos..."

# Este script debe ejecutarse en el directorio donde PocketBase está almacenando sus datos
# Asegúrate de detener el servidor de PocketBase antes de ejecutar este script

# Si estás usando el CLI de PocketBase, puedes crear la colección con este comando:
# pocketbase collections create projects \
#   --type=base \
#   --options= {} \
#   --schema='[{"name":"name","type":"text","required":true,"unique":false,"options":{"min":null,"max":null,"pattern":""}},{"name":"slug","type":"text","required":true,"unique":true,"options":{"min":null,"max":null,"pattern":""}},{"name":"short_desc","type":"text","required":true,"unique":false,"options":{"min":null,"max":null,"pattern":""}},{"name":"long_desc","type":"text","required":false,"unique":false,"options":{"min":null,"max":null,"pattern":""}},{"name":"app_type","type":"number","required":true,"unique":false,"options":{"min":null,"max":null,"pattern":""}},{"name":"go_to","type":"url","required":false,"unique":false,"options":{"pattern":""}},{"name":"icons","type":"text","required":false,"unique":false,"options":{"min":null,"max":null,"pattern":""},"list":true},{"name":"thumbnail","type":"file","required":true,"unique":false,"options":{"maxSelect":1,"maxSize":5242880,"mimeTypes":["image/jpeg","image/png","image/svg+xml","image/webp"],"thumbs":null}},{"name":"images","type":"file","required":false,"unique":false,"options":{"maxSelect":99,"maxSize":5242880,"mimeTypes":["image/jpeg","image/png","image/svg+xml","image/webp"],"thumbs":null},"list":true},{"name":"year","type":"number","required":true,"unique":false,"options":{"min":1900,"max":2100}}]' \
#   --indexes='[]'

# Pero para recrear la colección manualmente, aquí están los pasos:

# 1. Copia la siguiente definición de colección en un archivo JSON:

cat > projects_collection.json << 'EOF'
{
  "id": "_pb_users_auth_",
  "created": "2024-01-01 00:00:00.000Z",
  "updated": "2024-01-01 00:00:00.000Z",
  "name": "projects",
  "type": "base",
  "system": false,
  "schema": [
    {
      "system": false,
      "id": "name",
      "name": "name",
      "type": "text",
      "required": true,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "system": false,
      "id": "slug",
      "name": "slug",
      "type": "text",
      "required": true,
      "unique": true,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "system": false,
      "id": "short_desc",
      "name": "short_desc",
      "type": "text",
      "required": true,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "system": false,
      "id": "long_desc",
      "name": "long_desc",
      "type": "text",
      "required": false,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "system": false,
      "id": "app_type",
      "name": "app_type",
      "type": "select",
      "required": true,
      "unique": false,
      "options": {
        "maxSelect": 1,
        "values": [
          "web",
          "android",
          "ios",
          "desktop"
        ]
      }
    },
    {
      "system": false,
      "id": "go_to",
      "name": "go_to",
      "type": "url",
      "required": false,
      "unique": false,
      "options": {
        "match": "",
        "pattern": ""
      }
    },
    {
      "system": false,
      "id": "icons",
      "name": "icons",
      "type": "text",
      "required": false,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      },
      "list": true
    },
    {
      "system": false,
      "id": "thumbnail",
      "name": "thumbnail",
      "type": "file",
      "required": true,
      "unique": false,
      "options": {
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": [
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/webp"
        ],
        "thumbs": null
      }
    },
    {
      "system": false,
      "id": "images",
      "name": "images",
      "type": "file",
      "required": false,
      "unique": false,
      "options": {
        "maxSelect": 99,
        "maxSize": 5242880,
        "mimeTypes": [
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/webp"
        ],
        "thumbs": null
      },
      "list": true
    },
    {
      "system": false,
      "id": "year",
      "name": "year",
      "type": "number",
      "required": true,
      "unique": false,
      "options": {
        "min": 1900,
        "max": 2100
      }
    }
  ],
  "indexes": [],
  "listRule": "",
  "viewRule": "",
  "createRule": null,
  "updateRule": null,
  "deleteRule": null,
  "options": {}
}
EOF

echo "Archivo projects_collection.json creado."
echo ""
echo "Para restaurar completamente la base de datos:"
echo "1. Detén el servidor de PocketBase si está corriendo"
echo "2. Copia el archivo projects_collection.json a tu directorio de PocketBase (usualmente pb_data)"
echo "3. Reinicia PocketBase"
echo "4. Si tienes datos antiguos, también puedes restaurar el archivo pb_data/data.db"
echo ""
echo "Alternativamente, puedes crear la colección a través de la UI de PocketBase:"
echo "- Ve a http://127.0.0.1:8090/_/"
echo "- Inicia sesión como administrador"
echo "- Navega a Collections > Create Collection"
echo "- Usa los campos definidos anteriormente"
`

// Escribir el script
fs.writeFileSync('restore_pocketbase_schema.sh', createProjectsCollection.trim())

console.log('\n✓ Se ha creado el archivo restore_pocketbase_schema.sh')
console.log('\nInstrucciones:')
console.log('1. Ejecuta: chmod +x restore_pocketbase_schema.sh')
console.log('2. Luego: ./restore_pocketbase_schema.sh')
console.log('3. Sigue las instrucciones en pantalla para restaurar el esquema de PocketBase')
console.log('')
console.log('Además, se ha generado un archivo de colección JSON que puedes importar manualmente.')
console.log('')

// Crear también un archivo JSON con la definición de la colección
const projectsCollectionJson = {
  id: 'projects_new_id', // Este ID será generado por PocketBase
  created: new Date().toISOString().replace('T', ' ').substring(0, 19),
  updated: new Date().toISOString().replace('T', ' ').substring(0, 19),
  name: 'projects',
  type: 'base',
  system: false,
  schema: [
    {
      system: false,
      id: 'fld_name',
      name: 'name',
      type: 'text',
      required: true,
      unique: false,
      options: {
        min: null,
        max: null,
        pattern: '',
      },
    },
    {
      system: false,
      id: 'fld_slug',
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      options: {
        min: null,
        max: null,
        pattern: '',
      },
    },
    {
      system: false,
      id: 'fld_short_desc',
      name: 'short_desc',
      type: 'text',
      required: true,
      unique: false,
      options: {
        min: null,
        max: null,
        pattern: '',
      },
    },
    {
      system: false,
      id: 'fld_long_desc',
      name: 'long_desc',
      type: 'text',
      required: false,
      unique: false,
      options: {
        min: null,
        max: null,
        pattern: '',
      },
    },
    {
      system: false,
      id: 'fld_app_type',
      name: 'app_type',
      type: 'select',
      required: true,
      unique: false,
      options: {
        maxSelect: 1,
        values: ['web', 'android', 'ios', 'desktop'],
      },
    },
    {
      system: false,
      id: 'fld_go_to',
      name: 'go_to',
      type: 'url',
      required: false,
      unique: false,
      options: {
        match: '',
        pattern: '',
      },
    },
    {
      system: false,
      id: 'fld_icons',
      name: 'icons',
      type: 'text',
      required: false,
      unique: false,
      options: {
        min: null,
        max: null,
        pattern: '',
      },
      list: true,
    },
    {
      system: false,
      id: 'fld_thumbnail',
      name: 'thumbnail',
      type: 'file',
      required: true,
      unique: false,
      options: {
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
        thumbs: null,
      },
    },
    {
      system: false,
      id: 'fld_images',
      name: 'images',
      type: 'file',
      required: false,
      unique: false,
      options: {
        maxSelect: 99,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
        thumbs: null,
      },
      list: true,
    },
    {
      system: false,
      id: 'fld_year',
      name: 'year',
      type: 'number',
      required: true,
      unique: false,
      options: {
        min: 1900,
        max: 2100,
      },
    },
  ],
  indexes: [],
  listRule: '',
  viewRule: '',
  createRule: null,
  updateRule: null,
  deleteRule: null,
  options: {},
}

fs.writeFileSync('projects_collection.json', JSON.stringify(projectsCollectionJson, null, 2))

console.log('✓ Se ha creado el archivo projects_collection.json para importar manualmente')
console.log('')
console.log('Información adicional extraída del código:')
console.log('- La aplicación espera una colección llamada "projects"')
console.log(
  '- Los campos incluyen: name, slug, short_desc, long_desc, app_type, go_to, icons, thumbnail, images, year'
)
console.log(
  '- Se utilizan imágenes almacenadas en PocketBase con URLs formateadas como: /api/files/{collection}/{id}/{filename}'
)
console.log('- La aplicación está construida con Astro y Preact')
console.log('- La URL base de PocketBase se configura en PUBLIC_POCKETBASE_URL')
console.log('- La URL para imágenes se configura en PUBLIC_POCKETBASE_IMAGES_URL')
