#!/bin/bash

echo "==========================================="
echo "Setup de PocketBase para Portfolio"
echo "==========================================="

echo ""
echo "1. Verificando dependencias..."
if ! command -v curl &> /dev/null; then
    echo "Error: curl no está instalado"
    exit 1
fi

if ! command -v unzip &> /dev/null; then
    echo "Error: unzip no está instalado"
    exit 1
fi

echo "✓ Dependencias verificadas"

echo ""
echo "2. Descargando PocketBase (si no está presente)..."

POCKETBASE_VERSION="0.26.8"

if [ ! -f "./pocketbase" ]; then
    echo "Descargando PocketBase..."
    
    # Detectar arquitectura
    ARCH=$(uname -m)
    PLATFORM=$(uname -s | tr '[:upper:]' '[:lower:]')

    if [[ "$ARCH" == "x86_64" ]]; then
        ARCH="amd64"
    elif [[ "$ARCH" == "aarch64" ]] || [[ "$ARCH" == "arm64" ]]; then
        ARCH="arm64"
    fi

    FILENAME="pocketbase_${POCKETBASE_VERSION}_${PLATFORM}_${ARCH}.zip"
    DOWNLOAD_URL="https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/${FILENAME}"

    echo "Descargando: $DOWNLOAD_URL"
    curl -L -o pocketbase.zip "$DOWNLOAD_URL"
    
    if [ $? -eq 0 ]; then
        unzip pocketbase.zip
        chmod +x pocketbase
        rm pocketbase.zip
        echo "✓ PocketBase descargado y descomprimido"
    else
        echo "✗ Error al descargar PocketBase"
        exit 1
    fi
else
    echo "✓ PocketBase ya está presente"
fi

echo ""
echo "3. Creando directorio de datos (si no existe)..."
mkdir -p pb_data

echo ""
echo "4. Iniciando PocketBase en segundo plano..."
if ! pgrep -f "pocketbase serve" > /dev/null; then
    echo "Iniciando PocketBase..."
    ./pocketbase serve --http=127.0.0.1:8090 &
    POCKETBASE_PID=$!
    echo $POCKETBASE_PID > pb_pid.txt
    sleep 3  # Esperar a que PocketBase inicie
    echo "✓ PocketBase iniciado (PID: $POCKETBASE_PID)"
else
    echo "✓ PocketBase ya está en ejecución"
fi

echo ""
echo "5. Configuración completada!"
echo ""
echo "Accede al panel de administración en:"
echo "http://127.0.0.1:8090/_/"
echo ""
echo "Siga las instrucciones en pocketbase_setup_instructions.md para:"
echo "- Crear la colección 'projects'"
echo "- Configurar los campos según el esquema"
echo ""
echo "Variables de entorno necesarias:"
echo "PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090"
echo "PUBLIC_POCKETBASE_IMAGES_URL=http://127.0.0.1:8090/api/files"
echo ""

echo "Para detener PocketBase, ejecute:"
echo "kill \$(cat pb_pid.txt) 2>/dev/null || killall pocketbase 2>/dev/null"
echo ""
echo "==========================================="
echo "Setup completado exitosamente!"
echo "==========================================="