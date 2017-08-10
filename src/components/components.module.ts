import { NgModule } from '@angular/core';
import { GameComponent } from './game/game';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [GameComponent],
	imports: [IonicModule],
	exports: [GameComponent],
})
export class ComponentsModule {}
