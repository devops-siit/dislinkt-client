import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { AllChatsComponent } from './all-chats/all-chats.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';

@NgModule({
  declarations: [ChatMessagesComponent, AllChatsComponent],
  imports: [ MatDialogModule, MaterialModule],
  exports: [ChatMessagesComponent, AllChatsComponent],
  providers: []
})

export class MessagesModule { }
