const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

/**
 * @swagger
 * /configuracion/crearConfiguracion:
 *   post:
 *     description: Crea una nueva configuración del sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pines:
 *                 type: object
 *                 properties:
 *                   triggerUltrasonico:
 *                     type: number
 *                   echoUltrasonico:
 *                     type: number
 *                   releBomba:
 *                     type: number
 *                   buzzer:
 *                     type: number
 *                   lcdSDA:
 *                     type: string
 *                   lcdSCL:
 *                     type: string
 *               nivelCritico:
 *                 type: number
 *               nivelBajo:
 *                 type: number
 *               controlManual:
 *                 type: boolean
 *               bombaEncendida:
 *                 type: boolean
 *               intervaloLectura:
 *                 type: number
 *     responses:
 *       201:
 *         description: Configuración creada
 *       500:
 *         description: Error al crear la configuración
 */

router.post('/crearConfiguracion', configController.crearConfiguracion);

/**
 * @swagger
 * /configuracion/obtenerConfiguracion:
 *   get:
 *     description: Obtiene la configuración del sistema
 *     responses:
 *       200:
 *         description: Configuración obtenida
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error al obtener la configuración
 */
router.get('/obtenerConfiguracion', configController.obtenerConfiguracion);

/**
 * @swagger
 * /configuracion/actualizarConfiguracion/{id}:
 *   put:
 *     description: Actualiza la configuración del sistema
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la configuración a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Los nuevos datos de la configuración
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pines:
 *                 type: object
 *                 properties:
 *                   triggerUltrasonico:
 *                     type: number
 *                   echoUltrasonico:
 *                     type: number
 *                   releBomba:
 *                     type: number
 *                   buzzer:
 *                     type: number
 *                   lcdSDA:
 *                     type: string
 *                   lcdSCL:
 *                     type: string
 *               nivelCritico:
 *                 type: number
 *               nivelBajo:
 *                 type: number
 *               controlManual:
 *                 type: boolean
 *               bombaEncendida:
 *                 type: boolean
 *               intervaloLectura:
 *                 type: number
 *     responses:
 *       200:
 *         description: Configuración actualizada
 *       400:
 *         description: Faltan datos requeridos
 *       404:
 *         description: Configuración no encontrada
 *       500:
 *         description: Error al actualizar la configuración
 */
router.put('/actualizarConfiguracion/:id', configController.actualizarConfiguracion);



module.exports = router;
