// Importa el decorador NgModule desde Angular, necesario para definir módulos en Angular.
import { NgModule } from '@angular/core';

// Importa BrowserModule, necesario para la ejecución de una aplicación Angular en un navegador.
import { BrowserModule } from '@angular/platform-browser';

// Importa RouteReuseStrategy desde Angular, utilizado para la reutilización de rutas en el enrutamiento.
import { RouteReuseStrategy } from '@angular/router';

// Importa IonicModule y IonicRouteStrategy desde Ionic, necesarios para la configuración y el manejo del enrutamiento en Ionic.
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Importa AppRoutingModule, que contiene la configuración de rutas de la aplicación.
import { AppRoutingModule } from './app-routing.module';

// Importa AppComponent, el componente principal de la aplicación.
import { AppComponent } from './app.component';

// Importa GruposDetallePage, una página específica de la aplicación.
import { GruposDetallePage } from './grupos-detalle/grupos-detalle.page';

// Importa HttpClientModule y HttpClient desde Angular, que permiten realizar solicitudes HTTP en la aplicación.
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Importa los módulos de traducción desde la librería @ngx-translate/core, que permite la internacionalización.
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Importa TranslateHttpLoader desde @ngx-translate/http-loader, usado para cargar los archivos de traducción desde una URL.
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Función para configurar el cargador de traducción que usa el servicio HttpClient para cargar los archivos JSON de traducción.
export function HttpLoaderFactory(http: HttpClient) {
  // El TranslateHttpLoader obtiene los archivos de traducción desde la carpeta './assets/i18n/' y usa el sufijo '.json' para cargar los archivos de idioma.
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Decorador NgModule que define el módulo de la aplicación.
@NgModule({
  // Declaraciones de los componentes utilizados en este módulo. En este caso, solo se declara el componente principal.
  declarations: [
    AppComponent, // Componente principal de la aplicación.
  ],
  imports: [
    // BrowserModule es necesario para ejecutar la aplicación en un navegador.
    BrowserModule,
    
    // IonicModule configura la base para usar Ionic en la aplicación. forRoot() se llama para la inicialización global.
    IonicModule.forRoot(),

    // AppRoutingModule se importa para gestionar las rutas de la aplicación.
    AppRoutingModule,

    // HttpClientModule se importa para habilitar el servicio HTTP en la aplicación.
    HttpClientModule,

    // TranslateModule se importa y se configura con un loader para las traducciones.
    TranslateModule.forRoot({
      // Se define un loader personalizado que usará TranslateHttpLoader para cargar los archivos de traducción.
      loader: {
        provide: TranslateLoader, // Proveedor que usará el TranslateLoader.
        useFactory: HttpLoaderFactory, // Usa la función HttpLoaderFactory para crear el cargador.
        deps: [HttpClient], // Inyecta HttpClient como dependencia.
      },
    }),
  ],
  // Proveedores para la aplicación. En este caso, se configura la estrategia de reutilización de rutas con IonicRouteStrategy.
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Usar IonicRouteStrategy para la reutilización de rutas.
  ],
  // El componente que se usará como punto de entrada de la aplicación, es decir, el componente principal.
  bootstrap: [AppComponent],
})
// Define la clase AppModule, que es el módulo principal de la aplicación.
export class AppModule {}
