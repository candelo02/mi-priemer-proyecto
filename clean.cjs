const fs = require('fs');

function sanitize(str) {
  return str
    .split('â€”').join('—')
    .split('Atención').join('Atención')
    .split('atención').join('atención')
    .split('Servicios y atención').join('Servicios y Atención')
    .split('Servicios y atenci').join('Servicios y Atención')
    .split('atención inmediata').join('Atención inmediata')
    .split('atenci').join('Atención');
}

const targetFiles = [
  'D:/DIPLOMADO/MODULO 4/mi-primer-proyecto/src/App.tsx',
  'D:/DIPLOMADO/MODULO 4/mi-primer-proyecto/src/components/TarjetaTramite.tsx',
  'D:/DIPLOMADO/MODULO 4/mi-primer-proyecto/src/pages/ConsultasPage.tsx',
  'D:/DIPLOMADO/MODULO 4/mi-primer-proyecto/src/pages/DetalleConsultaPage.tsx',
  'D:/DIPLOMADO/MODULO 4/mi-primer-proyecto/data/pqrs.json'
];

targetFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, sanitize(content), 'utf8');
    console.log('Sanitized file:', file);
  }
});