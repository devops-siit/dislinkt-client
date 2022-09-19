import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/model/Message';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {

  uuid: any = "";
  user: any = {};
  result: any;
  messageForm!: FormGroup;
  withUser: any = "";
  withUserUuid: any = "";
  messages: Message[] = [];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private chatService: ChatService,
  ) { 
    this.createForm();
  }

  ngOnInit(): void {

    // chat uuid
    this.uuid = this.route.snapshot.params.uuid;
    this.withUser = this.route.snapshot.params.username;
    this.withUserUuid = this.route.snapshot.params.userUuid;
    this.chatService.getMessagesByChat(this.uuid).subscribe(
      res=>{
        this.messages = res.body as Message[];

      }, error=>{
        
      }
    )
    
  }
  sendMessage(): void{
    if (this.messageForm.value['message'] === ""){
      return
    }
    let newMessage = {"accountUuid": this.withUserUuid,  "text": ""};
    newMessage.text = this.messageForm.value['message'];
    this.chatService.insertMessage(newMessage).subscribe(
      res=>{
          //reload
          window.location.reload();
      },error =>{
        console.log("ERROR message not sent")
      }

    )
    
  }
  createForm() : void{
    this.messageForm = this.fb.group({
      message: ['']
    });
  }
}
