import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShapeCoverage } from '../game/shapes/shape-coverage.interface';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the GameResultsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'game-results',
  templateUrl: 'game-results.html'
})
export class GameResultsComponent {

  /* The shape coverage results */
  @Input() results: Array<ShapeCoverage> = [];

  constructor(private navCtrl: NavController) {
    console.log('Hello GameResultsComponent Component');
  }

  retry() {
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'back'});
  }

  proceed() {
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
  }

}
