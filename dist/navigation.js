// Preserve links to the former single-page sections.
const legacyPages={"#inicio":"index.html","#filosofia":"atelier.html","#servicios":"servicios.html","#galeria":"disenos.html","#productos":"productos.html","#visitanos":"visitanos.html"};
if (['/', '/index.html'].includes(location.pathname) && legacyPages[location.hash]) location.replace(new URL(legacyPages[location.hash],location.href).href);
