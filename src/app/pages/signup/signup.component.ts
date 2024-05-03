import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';


interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {


  signupForm!: FormGroup<SignupForm>; // ! é pra dizer que ele tá vazio mas vai ser declarado em algum momento

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    })
  }

  submit(){
    this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => console.log('success'),
      error: () => console.log('deu erro')
    })
  }
  navigate(){
    this.router.navigate(["/login"])
  }
}
