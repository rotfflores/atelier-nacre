# NACRE — Nail Atelier

Plantilla ficticia de estudio de uñas, en español. HTML, CSS y JavaScript sin instalación de dependencias.

## Vista local

Ejecuta `npm run dev` en esta carpeta y abre http://127.0.0.1:4173.

## Personalización

- `dist/index.html`: marca, textos, ubicación, horarios y secciones.
- `dist/styles.css`: colores, tipografía, composición, animaciones y diseño responsive.
- `dist/app.js`: carta de servicios, precios, tiempos, filtros y reserva de demostración.
- `dist/motion.js` y `dist/motion.css`: respuesta al pulsar botones, entradas y salidas de ventanas, cambios de servicios y filtros, menú móvil, acordeones y transiciones de navegación. Las animaciones se omiten al activar movimiento reducido en el dispositivo; los clics rápidos cancelan transiciones anteriores sin bloquear la interfaz.
- `dist/assets/`: fotografías, favicon y fondo de video adaptado del archivo proporcionado por el usuario; se eliminó el audio para uso de fondo.

El formulario no envía datos, no acepta pagos y no crea reservas reales. El recordatorio `.ics` descargable especifica que es una demostración. Para producción, conecta un sistema real de reservas, actualiza datos y precios, configura correo y aviso de privacidad, y verifica los derechos de todos los recursos.

## Recursos

Fotografías complementarias de Unsplash; tipografías Cormorant Garamond y DM Sans desde Google Fonts. Las fotografías se sirven localmente. Se respeta `prefers-reduced-motion` y se incluye un control para pausar el fondo y las animaciones.
