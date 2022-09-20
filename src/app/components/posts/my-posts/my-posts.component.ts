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
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

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
    this.authService.validateToken().subscribe(
      res=>{
        this.currentUser = res.body as Account;
        this.postService.getPostsByAccount(this.currentUser.uuid, 0, 5).subscribe(
          res=>{
            this.posts = res.content as Post[];
          }
        )
      }
    )

    
  }
  newPost(): void {
    const dialogRef = this.dialog.open(NewPostComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  createForm(): void {
    this.commentForm = this.fb.group({
      commentText: ['']
    });
  }
  readMore(postUuid: any): void {
    this.router.navigate(['/one-post/' + postUuid]);
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
