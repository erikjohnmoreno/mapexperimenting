import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  links = [
    {name: 'map', route: '/main/map'}
  ];
  
  constructor() {}

  ngOnInit() {}
}