const Lectura = require('../models/Lectura');


// Crear lectura
// exports.crearLectura = async (req, res) => {
  //   try {
  //     // Asegurarse de que los datos están siendo enviados
  //     console.log(req.body);
    
  //     // Validar si los campos requeridos existen
  //     const { fecha, alertaCritico, alertaBajo, bombaEncendida, nivelAgua } = req.body;
  //     if (!fecha || alertaCritico === undefined || alertaBajo === undefined || bombaEncendida === undefined || nivelAgua === undefined) {
  //       return res.status(400).json({ error: 'Faltan datos requeridos' });
  //     }
      
  //     // Crear la lectura
  //     const nuevaLectura = new Lectura(req.body);
  //     await nuevaLectura.save();
  //     res.status(201).json(nuevaLectura);
  //   } catch (error) {
  //     console.error('Error al crear la lectura:', error);  // Logs más detallados
  //     res.status(500).json({ 
  //       error: 'Error al crear la lectura', 
  //       detalles: error.errors ? error.errors : error.message 
  //     });
  //   }
  // };
  
  
// Obtener lecturas



exports.obtenerLecturas = async (req, res) => {
    try {
      const lecturas = await Lectura.find();
      res.json(lecturas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener lecturas' });
    }
};

// Actualizar lectura

exports.actualizarLectura = async (req, res) => {
  try {
    // Verificar qué datos están llegando
    console.log('Datos recibidos en el cuerpo:', req.body); // Datos que llegan en el body
    console.log('ID de la lectura:', req.params.id); // ID recibido desde la URL

    const { id } = req.params; // ID de la lectura a actualizar

    if (!id) {
      console.log('Error: falta el ID de la lectura');
      return res.status(400).json({ error: 'Falta el ID de la lectura' });
    }

    const { fecha, alertaCritico, alertaBajo, bombaEncendida, nivelAgua } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!fecha || alertaCritico === undefined || alertaBajo === undefined || bombaEncendida === undefined || nivelAgua === undefined) {
      console.log('Faltan datos requeridos:', { fecha, alertaCritico, alertaBajo, bombaEncendida, nivelAgua });
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Si los datos están presentes, verificar la estructura antes de la actualización
    console.log('Datos para actualizar:', { fecha, alertaCritico, alertaBajo, bombaEncendida, nivelAgua });

    // Actualizar la lectura en la base de datos
    const lecturaActualizada = await Lectura.findByIdAndUpdate(
      id, // El ID de la lectura
      { fecha, alertaCritico, alertaBajo, bombaEncendida, nivelAgua }, // Nuevos datos
      { new: true } // Devuelve el documento actualizado
    );

    // Verificar si la actualización fue exitosa
    if (!lecturaActualizada) {
      console.log('No se encontró una lectura con ese ID');
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }

    // Responder con la lectura actualizada
    console.log('Lectura actualizada:', lecturaActualizada);
    res.status(200).json(lecturaActualizada);
    
  } catch (error) {
    // Capturar y loguear cualquier error
    console.error('Error al actualizar la lectura:', error);
    res.status(500).json({
      error: 'Error al actualizar la lectura',
      detalles: error.errors ? error.errors : error.message
    });
  }
};
