import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  formSignIn: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage: string = "";

  constructor(private fb: FormBuilder,
              private authService: AuthService,) {}

  public handleSubmitForm() {
    if (this.formSignIn.valid) {
      this.authService.signIn(this.formSignIn.value).subscribe({
        next: (res) => {
        },
        error: (err: Error) => {
          console.log(err);
          this.errorMessage = "Usuário ou senha incorretos"
        }
      })
    }
  }

}
