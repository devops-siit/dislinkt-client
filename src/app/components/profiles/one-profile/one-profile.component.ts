import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCommentComponent } from '../../comments/new-comment/new-comment.component';
import { MatDialog } from '@angular/material/dialog';


import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';
import { Account } from 'src/app/model/Account';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/model/Comment';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-one-profile',
  templateUrl: './one-profile.component.html',
  styleUrls: ['./one-profile.component.scss']
})
export class OneProfileComponent implements OnInit {

  commentForm!: FormGroup;
  uuid: any = "";
  user?: Account;
  posts: Post[] = [];
  following = true;
  sendRequest = false;
  privateAccount = true;
  result: any;

  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountsService,
    private postService: PostService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.uuid = this.route.snapshot.params.uuid;
    this.accountService.getAccountByUuid(this.uuid).subscribe(
      res=>{
        this.user = res.body as Account;
        this.privateAccount = this.user.isPublic;
        // podesi dal se pratimo
        // podesi dal je poslat zahtev za pracenje
      }
    )

    this.postService.getPostsByAccount(this.uuid, 0, 5).subscribe(
      res=>{
        this.posts = res.body as Post[];
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
      console.log(`Dialog result: ${result}`);
    });

  }

  follow(): void {
    if (this.privateAccount) {
      this.accountService.sendFollowRequest(this.uuid).subscribe(
        res=>{
            this.toastr.success("Follow send");
      }, error=>{
        this.toastr.error("Follow not send");
      })
    }
    else{
      // zaprati nalog nije privatan
    }
    
  }
  unfollow(): void{
    if (this.privateAccount) {
      const message = `This account is private. If you change your mind, you'll have to request to follow. Are you sure? `
      const dialogData = new ConfirmDialogModel('Confirm Action', message);
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){

          // this.profileService.unfollowkAccount(this.user.id).subscribe(
          //   result => {
          //     this.toastr.success('User unfollowed');
          //     window.location.reload();
          //   }, error => {
          //     this.toastr.error('Cannot unfollow user');
      
          //   }
          // );

          }
      })
    }
    // nije privatan
    else {
      // unfollow user
      // this.profileService.unfollowkAccount(this.user.id).subscribe(
          //   result => {
          //     this.toastr.success('User unfollowed');
          //     window.location.reload();
          //   }, error => {
          //     this.toastr.error('Cannot unfollow user');
      
          //   }
          // );
    }
  }
  message(): void {
    this.router.navigate(['/chat-messages/' + this.uuid]);
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
  block():void{
    const message = `Are you sure you want to block user?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){
          // this.profileService.blockAccount(this.user.id).subscribe(
          //   result => {
          //     this.toastr.success('User blocked');
          //     window.location.reload();
          //   }, error => {
          //     this.toastr.error('Cannot block user');
      
          //   }
          // );

          }
      })
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
