import { DatePipe, NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { LOGIN_ROUTE } from "../../constants";
import { DeleteModalComponent } from "../../layout/delete-modal/delete-modal.component";
import { IChat } from "../../models";
import { AuthService, ChatService } from "../../services";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    DatePipe,
    NgClass,
    NgIf,
    DeleteModalComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly _ngZone = inject(NgZone);
  private readonly chatService = inject(ChatService);
  private fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly _destroy$: Subject<void> = new Subject();
  image: string = 'assets/default.jpg';
  chatForm: FormGroup;
  chats: any = [];
  userId: string = '';

  constructor() {
    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getChats();
    // this.getUserId();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  logOut(): void {
    this.authService.signOutGoogle()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response) => {
          if (response.error) {
            this.toastrService.error(response.error.message, 'Chat');
          } else {
            this._ngZone.run(() => {
              this.router.navigate([LOGIN_ROUTE]).then(result => {
                if (result) {
                  localStorage.clear();
                }
              });
            })
          }
        },
        error: (error) => {
          this.toastrService.error(error.message, 'Chat');
        }
      });
  }

  onSubmit(): void {
    if (this.chatForm.invalid) {
      this.toastrService.warning('Please enter a valid message to send', 'Chat');
    } else {
      const chat = this.chatForm.get('chatMessage')?.value;
      this.chatService.chatMessage(chat)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (status) => {
            if (status === 201) {
              this.toastrService.success('Message successfully sent!', 'Chat');
              this.getChats();
            }
          },
          error: (error) => {
            this.toastrService.error(error.message, 'Chat');
          },
          complete: () => {
            this.chatForm.reset();
          }
        });
    }
  }

  getChats(): void {
    this.chatService
      .chats()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (chats) => {
          this.chats = chats;
        },
        error: (error) => {
          this.toastrService.error(error.message, 'Chat');
        }
      })
  }

  getUserId(): void {
    this.chatService
      .user.subscribe(user => {
      this.userId = user.data.user?.id ?? '';
    })
  }

  openDropdown(msg: IChat) {
    console.log(msg)
    this.chatService.selectedChat(msg);
  }
}
