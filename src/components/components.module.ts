import { NgModule } from '@angular/core';
import { GameComponent } from './game/game';
import { IonicModule } from 'ionic-angular';
import { GameResultsComponent } from './game-results/game-results';

@NgModule({
	declarations: [GameComponent, GameResultsComponent],
	imports: [IonicModule],
	exports: [GameComponent, GameResultsComponent],
})
export class ComponentsModule {}
