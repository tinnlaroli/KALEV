import { Component, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-compra-exitosa',
  templateUrl: './compra-exitosa.component.html',
  styleUrls: ['./compra-exitosa.component.scss'],
  standalone: false
})
export class CompraExitosaComponent {
  @Input() itemComprado: any;
  @Input() estudiante: any;

  constructor(private platform: Platform, private modalCtrl: ModalController) {}

  async generarReciboPDF() {
    if (!this.itemComprado || !this.estudiante) {
      console.warn('Faltan datos para generar el recibo.');
      return;
    }

    try {
      const doc = new jsPDF();
      const yBase = 20;

      doc.setFontSize(16);
      doc.text('Comprobante de Compra - KALEV', 10, yBase);
      doc.setFontSize(12);
      doc.text(
        `Estudiante: ${this.estudiante.nombre || 'Sin nombre'}`,
        10,
        yBase + 10
      );
      doc.text(
        `Correo: ${this.estudiante.correo || 'No disponible'}`,
        10,
        yBase + 16
      );
      doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, yBase + 22);
      doc.text(`Item: ${this.itemComprado.nombre}`, 10, yBase + 32);
      doc.text(`Costo: ${this.itemComprado.precio} monedas`, 10, yBase + 38);

      const pdfBlob = doc.output('blob');
      const nombreArchivo = `recibo_kalev_${new Date().getTime()}.pdf`;

      if (this.platform.is('capacitor') || this.platform.is('android')) {
        await this.guardarEnAndroid(pdfBlob, nombreArchivo);
      } else {
        this.descargarEnNavegador(pdfBlob, nombreArchivo);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }

  private async guardarEnAndroid(blob: Blob, fileName: string) {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ''
        )
      );

      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Documents,
        recursive: true,
      });

      console.log('Archivo guardado en:', result.uri);
      alert(`Recibo guardado en: ${result.uri}`);
    } catch (error) {
      console.error('Error al guardar PDF en Android:', error);
      alert('Error al guardar el archivo. Revisa los permisos o la consola.');
    }
  }

  private descargarEnNavegador(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
