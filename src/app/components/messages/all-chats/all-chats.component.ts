import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit {

  chats = [{"id": 1, "user": "Senorita"}, {"id": 2, "user": "Stoja"}]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  openChat(id: any):void{
    this.router.navigate(['/chat-messages/' + id]);
  }
}
