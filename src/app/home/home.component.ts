import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { DataService } from '../data.service';

import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('animateGoals',[
      transition('*=>*',[
        query(':enter', style({opacity:0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform:'translateY(-75%)', offset:0}),
            style({opacity:.5, transform:'translateY(20%)', offset:.3}),
            style({opacity:1, transform:'translateY(0)', offset:1})
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform:'translateY(0)', offset:0}),
            style({opacity:.5, transform:'translateY(20%)', offset:.3}),
            style({opacity:0, transform:'translateY(-75%)', offset:1})
          ]))
        ]), {optional: true})
      ])
    ])
  ],
  providers: [NgbCarouselConfig]
})

export class HomeComponent implements OnInit {

  itemCount: number;
  GoalText: string = '';
  BtnText: string = 'Add Item';
  Goals = [];
  constructor(
    private _data: DataService,
     config: NgbCarouselConfig
    ) 
    {
      config.interval = 10000;
      config.wrap = false;
      config.keyboard = false;
    }

  ngOnInit() {
    this._data.goal.subscribe(res => this.Goals = res);
    this.itemCount = this.Goals.length;
    this._data.changeGoal(this.Goals);
  }

  addItem() {
    this.Goals.push(this.GoalText);
    this.GoalText='';
    this.itemCount=this.Goals.length;
    this._data.changeGoal(this.Goals);
  }

  removeItem(i) {
    this.Goals.splice(i,1);
    this._data.changeGoal(this.Goals);
  }

}
