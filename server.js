const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Apunta correctamente al directorio "browser"
app.use(express.static(path.join(__dirname, 'dist/kalev-web/browser')));

// Para rutas de Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/kalev-web/browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Angular corriendo en http://localhost:${PORT}`);
});
