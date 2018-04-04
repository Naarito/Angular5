import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private Goals = new BehaviorSubject<any>(['Become a PROgrammer', 'Skydive', 'Bungee Jump']);
  goal = this.Goals.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.Goals.next(goal);
  }

}
