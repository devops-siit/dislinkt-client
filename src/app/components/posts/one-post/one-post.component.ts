import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/model/Account';
import { Chat } from 'src/app/model/Chat';
import { Comment } from 'src/app/model/Comment';
import { Post } from 'src/app/model/Post';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { PostService } from 'src/app/services/post/post.service';
import { NewCommentComponent } from '../../comments/new-comment/new-comment.component';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss']
})
export class OnePostComponent implements OnInit {

  commentForm!: FormGroup;
  uuid: any = "";
  user?: Account;
  post: Post = {};
  result: any;
  currentUser?: Account;
  showComm = false;
  comments: Comment[] = [];
  posts: Post[] = [];

  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private postService: PostService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.params.uuid;
    this.createForm();
    
    this.postService.getPostByUuid(this.uuid).subscribe(
      res=>{
        this.post = res as Post;
        this.posts.push(this.post);
      }
    )  
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
      if(result){
        //window.location.reload();
      }
    });

  }

  showComments(post: any): void {
    
    this.postService.getCommentsByPost(post.uuid, 0, 5).subscribe(
      res=>{
        this.comments = res.body.content as Comment[];
        console.log(this.comments)
      }
    )
    this.showComm = true
  }
  
  hideComments(post: any): void{
    this.showComm = false
  }

  like(uuid: any): void{
    this.postService.likePost(uuid).subscribe(
      res=> {
        window.location.reload();
      }, error => {
        this.toastr.error("You already liked this post")
      }
    )
  }
  dislike(uuid: any): void {
    this.postService.dislikePost(uuid).subscribe(
      res=>{
        window.location.reload();
      }, error => {
        this.toastr.error("You already disliked this post")
      }
    )
  }
}
