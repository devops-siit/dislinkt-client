import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/model/Chat';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit {

 //chats = [{"id": 1, "user": "Senorita"}, {"id": 2, "user": "Stoja"}]
  chats: Chat[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.chatService.getChatsByAccount().subscribe(
      res=>{
        this.chats = res.body as Chat[];
      }
    )
  }

  openChat(uuid: any, username: any, userUuid: any):void{
    this.router.navigate(['/chat-messages/' + uuid + '/' + username + '/' + userUuid]);
  }
}
