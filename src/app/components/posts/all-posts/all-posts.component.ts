import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/model/Account';
import { Chat } from 'src/app/model/Chat';
import { Post } from 'src/app/model/Post';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { PostService } from 'src/app/services/post/post.service';
import { NewCommentComponent } from '../../comments/new-comment/new-comment.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  commentForm!: FormGroup;
  uuid: any = "";
  user?: Account;
  posts: Post[] = [];
  following = true;
  sendRequest = false;
  privateAccount = true;
  result: any;
  currentUser?: Account;
  myChats: Chat[] = [];

  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountsService,
    private postService: PostService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    
    // dobavi postove ljudi koje pratim
    
  }
  

  createForm(): void {
    this.commentForm = this.fb.group({
      commentText: ['']
    });
  }

  sendComment(uuid: any): void {
    const dialogRef = this.dialog.open(NewCommentComponent);
    dialogRef.componentInstance.postUuid = uuid;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  showComments(post: any): void {
    post.comments = [{"text": "bla bla"}];
    this.postService.getCommentsByPost(post.uuid, 0, 5).subscribe(
      res=>{
        post.comment = res.body as Comment[];
      }
    )
    post.showComments = true
  }
  
  hideComments(post: any): void{
    post.showComments = false
  }

  like(uuid: any): void{
    this.postService.likePost(uuid).subscribe(
      res=> {
        window.location.reload();
      }
    )
  }
  dislike(uuid: any): void {
    this.postService.dislikePost(uuid).subscribe(
      res=>{
        window.location.reload();
      }
    )
  }

}
