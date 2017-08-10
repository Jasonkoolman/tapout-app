import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { App } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComponentsModule} from '../components/components.module';
import { ShapeService } from "../components/game/shapes/shape.service"

@NgModule({
  declarations: [
    App,
    HomePage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShapeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
