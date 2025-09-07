import { Injectable, signal, WritableSignal } from '@angular/core';
import { createClient, PostgrestError, SupabaseClient, UserResponse } from "@supabase/supabase-js";
import { from, mergeMap, Observable, of, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { CHAT_TABLE } from "../constants";
import { IChat } from "../models";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase: SupabaseClient;
  public savedChat: WritableSignal<IChat> = signal<IChat>({
    text: '',
    created_at: '',
    editable: false,
    sender: '',
    users: {
      id: '',
      full_name: '',
      avatar_url: ''
    },
    id: ''
  });

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  chatMessage(text: string): Observable<number> {
    return from(this.supabase.from(CHAT_TABLE).insert({text}))
      .pipe(
        mergeMap(result => {
          const error: PostgrestError | null = result.error;
          if (error) {
            return throwError(() => error);
          }
          return of(result.status);
        })
      );
  }

  chats(): Observable<IChat[]> {
    return from(this.supabase.from(CHAT_TABLE).select('*,users(*)'))
      .pipe(
        mergeMap((result) => {
          if (result.error) {
            return throwError(() => result.error.message);
          }
          return of(result.data);
        })
      );
  }

  get user(): Observable<UserResponse> {
    return from(this.supabase.auth.getUser())
  }

  selectedChat(chat: IChat): void {
    this.savedChat.set(chat);
  }

  deleteChat(id: string): Observable<number> {
    return from(this.supabase.from(CHAT_TABLE).delete().eq('id', id))
      .pipe(
        mergeMap((result) => {
          if (result.error) {
            return throwError(() => result.error);
          }
          return of(result.status);
        })
      );
  }
}
