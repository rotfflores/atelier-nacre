# NACRE — Nail Atelier

Sitio de demostración en español con seis páginas HTML independientes, CSS y JavaScript sin dependencias.

## Páginas

- dist/index.html: presentación breve y accesos al sitio.
- dist/atelier.html: filosofía, criterios de trabajo y experiencia de la visita.
- dist/servicios.html: 20 servicios, precios, tiempos, comparativa de técnicas y preguntas sobre los servicios.
- dist/disenos.html: galería filtrable, fichas de inspiración y guía de formas de uñas.
- dist/productos.html: seis productos, fichas individuales y recomendaciones de cuidado en casa.
- dist/visitanos.html: dirección, horarios, preparación de la cita y preguntas sobre reservas.

Las antiguas direcciones con fragmentos, como /#filosofia, redirigen a la página correspondiente. Cada página tiene título, descripción y enlace activo propios. El encabezado, pie y formulario de reserva son compartidos.

## Desarrollo y personalización

Ejecuta npm run dev y abre http://127.0.0.1:4173. Ejecuta npm run build después de modificar las fuentes de las páginas.

- scripts/build-pages.mjs: composición y contenido específico de las seis páginas.
- src/shell.html: base del documento y ventanas compartidas; la navegación y el pie se generan en el script de construcción.
- src/sections/: secciones que se utilizan únicamente en su página correspondiente.
- dist/pages.css: páginas, navegación adaptable y nuevos bloques editoriales.
- dist/app.js: servicios, precios, filtros y formulario de reserva.
- dist/catalog.js: productos y opción para incluirlos en las notas de la visita.
- dist/icons.js: iconos SVG independientes de las fuentes del dispositivo.
- dist/motion.js y dist/motion.css: animaciones de botones, navegación, ventanas y cambios de contenido.
- dist/assets/: fotografías, ilustraciones SVG de productos y video de fondo.

## Funcionalidad de demostración

La marca, los precios, la dirección y los horarios son ficticios. El formulario procesa los datos solo en el navegador: no envía correos, no guarda datos, no acepta pagos y no crea citas reales. Puede generar un recordatorio .ics identificado como ejemplo. El catálogo no procesa compras.

Para producción, configura un sistema real de reservas, recepción de mensajes, contacto, condiciones y aviso de privacidad.

## Recursos y accesibilidad

Fotografía principal generada con ImageGen; fotografías complementarias de Unsplash; tipografías Cormorant Garamond y DM Sans desde Google Fonts. Las imágenes y el video se sirven localmente. Se respeta prefers-reduced-motion automáticamente. El video proporcionado por el usuario se utiliza sin audio y sin controles visibles en Inicio.
