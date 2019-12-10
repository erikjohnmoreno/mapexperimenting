import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/api';
import { LocalStorage } from 'src/app/services/utils';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute, 
    private sessionService: SessionService, private localStorage: LocalStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {

  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(values) {
    if (this.form.valid) {
      this.sessionService.signIn(values["email"], values["password"])
      .subscribe(
        res => {
          this.localStorage.setObject('currentUser', res['data']);
          this.router.navigate(['/main/map'])
        }
      )
    }
    
  }

}