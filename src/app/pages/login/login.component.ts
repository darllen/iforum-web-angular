import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';


interface LoginForm {
  email: FormControl,
  password: FormControl
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>; // ! é pra dizer que ele tá vazio mas vai ser declarado em algum momento

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => console.log('success'),
      error: () => console.log('deu erro')
    })
  }
  navigate(){
    this.router.navigate(["/signup"])
  }
}
