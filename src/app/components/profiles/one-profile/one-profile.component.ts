import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-one-profile',
  templateUrl: './one-profile.component.html',
  styleUrls: ['./one-profile.component.scss']
})
export class OneProfileComponent implements OnInit {

  id: any = "";
  user: any = {};
  posts: any = [];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    // TO DO dobavi usera, dobavi njegove postove
    this.user = {"id": this.id, "username": "senorita"};
    this.posts = [{"text": "post1", "showComments": false, "comments": [{"username": "Stoja", "text": "VRHH"}]}, {"text": "post2",  "showComments": false, "comments": []}];
  }

  follow(): void {

  }
  message(): void {
    
  }
  showComments(post: any): void {
    post.showComments = true
  }
  
  hideComments(post: any): void{
    post.showComments = false
  }

}