import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { AuthService, ChatService } from "../../services";

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatService;
  let authService: AuthService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent,ToastrModule.forRoot()],
      providers: [
        ToastrService,
        Router,
        ChatService,
        AuthService,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
    toastrService = fixture.debugElement.injector.get(ToastrService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
