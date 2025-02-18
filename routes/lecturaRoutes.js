const express = require('express');
const router = express.Router();
const lecturaController = require('../controllers/lecturaController');




/**
 * @swagger
 * /lecturas/obtenerLecturas:
 *   get:
 *     description: Obtiene todas las lecturas
 *     responses:
 *       200:
 *         description: Lecturas obtenidas
 *       500:
 *         description: Error al obtener las lecturas
 */
router.get('/obtenerLecturas', lecturaController.obtenerLecturas);





/**
 * @swagger
 * /lecturas/actualizarLectura/{id}:
 *   put:
 *     description: Actualiza una lectura existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la lectura a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Los nuevos datos de la lectura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               alertaCritico:
 *                 type: boolean
 *               alertaBajo:
 *                 type: boolean
 *               bombaEncendida:
 *                 type: boolean
 *               nivelAgua:
 *                 type: number
 *     responses:
 *       200:
 *         description: Lectura actualizada
 *       400:
 *         description: Faltan datos requeridos
 *       404:
 *         description: Lectura no encontrada
 *       500:
 *         description: Error al actualizar la lectura
 */
router.put('/actualizarLectura/:id', lecturaController.actualizarLectura);


module.exports = router;
