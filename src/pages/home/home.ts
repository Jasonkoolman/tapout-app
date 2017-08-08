import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Circle } from '../../components/game/shapes/circle.model';
import { Shape } from '../../components/game/shapes/shape.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {

  }

}
