# Configuración de Email con Resend

## Configuración Completada

### 1. API Endpoint Creado
- **Archivo**: `/api/send-email.js`
- **Función**: Maneja el envío de emails usando Resend
- **Destino**: liconstructionplus@gmail.com

### 2. Dependencias Instaladas
- Paquete `resend` instalado en el proyecto

### 3. Formularios Actualizados
- Los formularios ahora envían datos al endpoint `/api/send-email`
- Incluye manejo de errores y confirmación de envío

## Pasos para Desplegar en Vercel

### 1. Configurar Variable de Entorno en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a **Settings** → **Environment Variables**
3. Agrega la siguiente variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_RfUr5Dfk_2pgAeMh2rzkqcn7AKXR1yR5v`
   - **Environment**: Selecciona Production, Preview, y Development

### 2. Desplegar el Proyecto

Opción A - Desde Git (Recomendado):
```bash
git add .
git commit -m "Add Resend email integration"
git push
```
Vercel desplegará automáticamente los cambios.

Opción B - Desde CLI:
```bash
npm install -g vercel
vercel --prod
```

### 3. Verificar el Dominio en Resend

Asegúrate de que tu dominio esté verificado en Resend Dashboard:
- Ve a https://resend.com/domains
- Verifica que tu dominio esté activo

### 4. Actualizar el Email "From" (Opcional)

Una vez que tu dominio esté verificado, puedes actualizar el archivo `/api/send-email.js`:

Cambia:
```javascript
from: 'Long Island Roofing <onboarding@resend.dev>',
```

Por:
```javascript
from: 'Long Island Roofing <noreply@tudominio.com>',
```

## Estructura de Email

Los emails incluyen:
- Nombre del cliente
- Teléfono
- Email
- Mensaje
- Tipo de formulario (hero, modal, o footer)

## Testing Local

Para probar localmente:

1. Crea un archivo `.env` en la raíz del proyecto:
```bash
RESEND_API_KEY=re_RfUr5Dfk_2pgAeMh2rzkqcn7AKXR1yR5v
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Prueba el formulario en http://localhost:5173

## Notas Importantes

- Los emails se envían a: **liconstructionplus@gmail.com**
- El campo `replyTo` está configurado con el email del cliente para facilitar las respuestas
- Los formularios incluyen validación antes de enviar
- Se muestra un mensaje de error si el envío falla
