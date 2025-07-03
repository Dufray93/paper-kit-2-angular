import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit {
    simpleSlider: number = 40;
    doubleSlider: number[] = [20, 60];
    state_default: boolean = true;
    focus: boolean = false;
    
    constructor() { }

    ngOnInit() {}
}
