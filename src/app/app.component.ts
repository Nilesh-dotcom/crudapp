import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from './myservice.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crudoperation';
  userform!: FormGroup;
  allUser!: any;
  isEdit = false;
  userId: any;

  constructor(private myservice: MyserviceService) { }

  ngOnInit(): void {

    this.getLatestUser();

    this.userform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]*$")]),
      email: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      mobileno: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")])

    })
  }

  get formData() {

    return this.userform.controls;

  }


  addUser(formobj: any) {

    console.log(formobj);
    this.myservice.createUser(formobj).subscribe((response) => {

      this.getLatestUser();
    })
    this.userform.reset();
  }

  getLatestUser() {

    this.myservice.getAllUser().subscribe((response) => {

      this.allUser = response;
      console.log();

    })
  }
  editUser(user: any) {
    this.isEdit = true;
    this.userId = user.id;
    this.userform.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      mobileno: user.mobileno,

    })

  }

  deleteUser(id: any) {
    this.userform.reset();
    this.myservice.deleteUser(id).subscribe(() => {
      this.getLatestUser();
    })
  }

  updateUser() {
    this.isEdit = !this.isEdit;
    console.log(this.userform.value);
    this.myservice.updateUser(this.userform.value, this.userId).subscribe(() => {
      this.getLatestUser();

    })
    this.userform.reset();
  }

}
