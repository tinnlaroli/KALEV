const mongoose = require('mongoose');

const lecturaSchema = new mongoose.Schema({
  nivelAgua: { type: Number, required: true },
  bombaEncendida: { type: Boolean, required: true },
  alertaBajo: { type: Boolean, required: true },
  alertaCritico: { type: Boolean, required: true },
  fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Lectura', lecturaSchema);
