import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UtilityService } from '../services/util.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  eye = faEye;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilService: UtilityService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, firstname, lastname } = this.registerForm.value;
      this.authService.register(username, password, firstname, lastname).subscribe(success => {
        if (success) {
          // Optionally redirect to login or another page
          this.router.navigate(['/login']);
        } else {
          this.utilService.showError('Oops', 'Registration Failed');
        }
      });
    } else {
      this.utilService.showWarning('', 'Please fill out the form correctly');
    }
  }
}