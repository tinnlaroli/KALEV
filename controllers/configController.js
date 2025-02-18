const ConfiguracionSistema = require('../models/ConfiguracionSistema');


// Crear configuración
exports.crearConfiguracion = async (req, res) => {
  try {
    const newConfig = new ConfiguracionSistema(req.body);
    await newConfig.save();
    res.status(201).json(newConfig);
  } catch (error) {
    console.error("Error al crear la configuración:", error);
    res.status(500).json({ error: 'Error al crear la configuración' });
  }
};

// Obtener configuración
exports.obtenerConfiguracion = async (req, res) => {
  try {
    const config = await ConfiguracionSistema.find();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
};

// Actualizar configuración
exports.actualizarConfiguracion = async (req, res) => {
  try {
    console.log('Datos recibidos en el cuerpo:', req.body); // Datos que llegan en el body
    console.log('ID de la lectura:', req.params.id); // ID recibido desde la URL


    const { id } = req.params;

    if (!id) {
      console.log('Error: falta el ID de la lectura');
      return res.status(400).json({ error: 'Falta el ID de la lectura' });
    }


    const { pines, nivelCritico, nivelBajo, controlManual, bombaEncendida, intervaloLectura } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!pines || nivelCritico === undefined || nivelBajo === undefined || controlManual === undefined || bombaEncendida === undefined || intervaloLectura === undefined) {
      console.log('Faltan datos requeridos');
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    //Si los datos estan presentes, verificar la estructura antes de la actualizacion
    console.log('Datos para actualizar:', { pines, nivelCritico, nivelBajo, controlManual, bombaEncendida, intervaloLectura });

    // Actualizar la configuración en la base de datos
    const config = await ConfiguracionSistema.findByIdAndUpdate(
      id,
      { pines, nivelCritico, nivelBajo, controlManual, bombaEncendida, intervaloLectura }, // Nuevos datos
      { new: true } // Devuelve el documento actualizado
    );

    // Verificar si la configuración fue exitosa
    if (!config) {
      console.log('No se encontró la configuración con ese ID');
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    
    // Responder con la configuración actualizada
    console.log('Configuración actualizada:', config);
    res.status(200).json(config);

  } catch (error) {
    // Capturar y loguear cualquier error
    console.error("Error al actualizar la configuración:", error);
    res.status(500).json({ 
      error: 'Error al actualizar la configuración', 
      detalles: error.errors ? error.errors : error.message
    });
  }
};