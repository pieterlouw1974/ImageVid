import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      unit_name: ['', Validators.required ],
      unit_price: ['', Validators.required ]
   });
  }

  addAdUnit(unit_name, unit_price) {
    // this.adunitservice.addAdUnit(unit_name, unit_price);
}
  ngOnInit() {
  }

}
