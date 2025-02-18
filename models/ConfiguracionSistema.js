const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  pines: {
    triggerUltrasonico: { type: Number, required: true },
    echoUltrasonico: { type: Number, required: true },
    releBomba: { type: Number, required: true },
    buzzer: { type: Number, required: true },
    lcdSDA: { type: String, required: true },
    lcdSCL: { type: String, required: true }
  },
  nivelCritico: { type: Number, required: true },
  nivelBajo: { type: Number, required: true },
  controlManual: { type: Boolean, required: true },
  bombaEncendida: { type: Boolean, required: true },
  intervaloLectura: { type: Number, required: true }
});

module.exports = mongoose.model('ConfiguracionSistema', configuracionSchema);
