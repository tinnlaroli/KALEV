const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Carpeta correcta de archivos Angular
app.use(express.static(path.join(__dirname, 'dist/kalev-web/browser')));

// Para manejar rutas con Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/kalev-web/browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Angular corriendo en http://localhost:${PORT}`);
});
