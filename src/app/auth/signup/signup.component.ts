import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  startDate = new Date(1996, 0, 1);
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2015, 0, 1);


  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}