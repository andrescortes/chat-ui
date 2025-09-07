import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { AuthService, ChatService } from "../../services";

import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let chatService: ChatService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        Router,
        ChatService,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
    toastrService = fixture.debugElement.injector.get(ToastrService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteChat', () => {
    it('should delete the chat', () => {
      component.chat = {
        id: '1235',
        created_at: '',
        editable: false,
        sender: '',
        text: 'test',
        users: {
          id: '12345',
          avatar_url: '',
          full_name: ''
        }
      };
      const deleteSpy = spyOn(chatService, 'deleteChat').and.returnValue(of(204));
      const urlSpy = spyOnProperty(router, 'url', 'get').and.returnValue('/chat');
      const navigateUrlSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      const tosterSuccessSpy = spyOn(toastrService, 'success').and.callThrough();

      component.deleteChat();
      expect(deleteSpy).toHaveBeenCalledOnceWith(component.chat.id);
      expect(tosterSuccessSpy).toHaveBeenCalled();
      expect(urlSpy).toHaveBeenCalled();
      expect(navigateUrlSpy).toHaveBeenCalled();
    });

    it('should throws an error', () => {
      component.chat = {
        id: '1235',
        created_at: '',
        editable: false,
        sender: '',
        text: 'test',
        users: {
          id: '12345',
          avatar_url: '',
          full_name: ''
        }
      };
      const deleteSpy = spyOn(chatService, 'deleteChat').and.returnValue(throwError(() => new Error('test')));
      const tosterSuccessSpy = spyOn(toastrService, 'error').and.callThrough();

      component.deleteChat();
      expect(deleteSpy).toHaveBeenCalledOnceWith(component.chat.id);
      expect(tosterSuccessSpy).toHaveBeenCalledWith('test', 'Chat');
    })
  })
});
