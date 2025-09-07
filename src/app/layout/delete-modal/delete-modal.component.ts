import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { IChat } from "../../models";
import { ChatService } from "../../services";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent implements OnDestroy {
  private readonly chatService = inject(ChatService);
  private readonly _destroy$ = new Subject<void>();
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  dismiss = signal<boolean>(false);
  chat!: IChat;

  constructor() {
    effect(() => {
      this.chat = this.chatService.savedChat();
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


  deleteChat(): void {
    this.dismiss.set(false);
    if (this.chat?.id) {
      this.chatService.deleteChat(this.chat.id)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: result => {
            if (result === 204) {
              this.toastrService.success("Chat deleted successfully.", 'Chat');
              let currentUrl = this.router.url;
              this.dismiss.set(true);
              this.router.navigateByUrl('/', {
                  skipLocationChange: true
                }
              ).then(() => {
                this.router.navigate([currentUrl]).then();
              });
            }
          },
          error: err => {
            this.toastrService.error(err.message, 'Chat');
          }
        });
    }
  }
}
