# Hacienda de Letras - Demo

## Descripción
Aplicación web para la presentación y gestión de experiencias enoturísticas de Hacienda de Letras.

## Requisitos del Sistema
- Node.js 18.x o superior
- npm o yarn
- PostgreSQL (para la base de datos)

## Estructura de Imágenes
Las imágenes del proyecto deben seguir la siguiente estructura:

```
client/public/images/
├── vineyard/           # Imágenes de viñedos y paisajes
├── wines/             # Imágenes de vinos y botellas
├── experiences/       # Imágenes de experiencias y eventos
└── gallery/          # Galería general
```

### Especificaciones de Imágenes
- **Formato**: Preferentemente .webp para mejor rendimiento
- **Resolución**:
  - Hero images: 2000px de ancho mínimo
  - Thumbnails: 800px de ancho
  - Galerías: 1600px de ancho
- **Optimización**: Todas las imágenes deben estar optimizadas para web

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm start`: Inicia la aplicación en modo producción
- `npm run db:push`: Actualiza la base de datos

## Estructura del Proyecto
```
HDL DEMO/
├── client/            # Frontend React
├── server/            # Backend Express
├── shared/            # Tipos y utilidades compartidas
├── public/            # Archivos estáticos
└── ...
```

## Guías de Estilo
- Usar TailwindCSS para estilos
- Seguir la guía de colores del tema definido en theme.json
- Mantener consistencia en el diseño responsive

## Mantenimiento
- Actualizar regularmente las imágenes según la temporada
- Mantener las dependencias actualizadas
- Realizar backups regulares de la base de datos

## Problemas Conocidos y Soluciones
1. Si las imágenes no cargan:
   - Verificar que estén en el directorio correcto
   - Comprobar los formatos soportados
   - Revisar las rutas en constants.ts

2. Problemas de rendimiento:
   - Optimizar imágenes según especificaciones
   - Usar lazy loading para imágenes
   - Implementar caching cuando sea necesario 