import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OAuthResponse } from "@supabase/supabase-js";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly authService = inject(AuthService);
  private readonly _destroy$ = new Subject<void>();
  responseAuth: OAuthResponse = {
    data: {
      provider: "google",
      url: ''
    },
    error: null,
  };

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  handleAuth(): void {
    this.authService.signInWithGoogle()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: (response) => {
          this.responseAuth = response;
        },
        error: error => {
          console.log('Something went wrong', error);
        }
      });
  }
}
