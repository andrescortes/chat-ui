import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AuthError, createClient, OAuthResponse, SupabaseClient } from "@supabase/supabase-js";
import { from, Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { CHAT_ROUTE, USER } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly router = inject(Router);
  private readonly _ngZone = inject(NgZone);
  private supabase: SupabaseClient;
  private readonly supabaseSubscription;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    const {data} = this.supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      if (user) {
        localStorage.setItem(USER, JSON.stringify(user));
        this._ngZone.run(() => {
          this.router.navigate([CHAT_ROUTE]).then();
        });
      }
    });
    this.supabaseSubscription = data.subscription;
  }

  ngOnDestroy(): void {
    if (this.supabaseSubscription) {
      this.supabaseSubscription.unsubscribe();
    }
  }

  signInWithGoogle(): Observable<OAuthResponse> {
    return from(this.supabase.auth.signInWithOAuth({
        provider: "google"
      })
    );
  }

  signOutGoogle(): Observable<{ error: AuthError | null }> {
    return from(this.supabase.auth.signOut());
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem(USER) as string;
    return !!user;
  }
}
