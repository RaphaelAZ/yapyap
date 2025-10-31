import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "@appUtils/form-utils/input-field.component/input-field.component";
import { ButtonComponent } from "@appUtils/core-utils/button.component/button.component";
import { AuthService } from '@appStore/auth/auth.service';
import { authQuery } from '@appStore/auth/auth.query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    authQuery.user$.subscribe((user) => console.log(user));
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  tryLogin() {
    if(this.form.valid) {
      this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value);
    }
  }
}
