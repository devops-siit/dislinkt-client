import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {

  id: any = "";
  user: any = {};
  result: any;
  messageForm!: FormGroup;
  withUser = "Senorita"
  messages = [{"id":1, "sender":"Senorita", "text": "Da li se vidimo veceras?"},
  {"id":2, "sender":"Stoja", "text": "Da draga stizem"},
  {"id":3, "sender":"Stoja", "text": "Mozes li 5 min ranije?"}]

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { 
    this.createForm();
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    
  }
  sendMessage(): void{
    if (this.messageForm.value['message'] === ""){
      return
    }
    let newMessage = {"id": 4, "sender": "Stoja", "text": ""};
    newMessage.text = this.messageForm.value['message'];
    this.messages.push(newMessage);
    this.messageForm.controls['message'].setValue("");
  }
  createForm() : void{
    this.messageForm = this.fb.group({
      message: ['']
    });
  }
}
