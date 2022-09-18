import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCommentComponent } from '../../comments/new-comment/new-comment.component';
import { MatDialog } from '@angular/material/dialog';


import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-one-profile',
  templateUrl: './one-profile.component.html',
  styleUrls: ['./one-profile.component.scss']
})
export class OneProfileComponent implements OnInit {

  commentForm!: FormGroup;
  id: any = "";
  user: any = {};
  posts: any = [];
  following = true;
  privateAccount = true;
  result: any;

  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.id = this.route.snapshot.params.id;
    // TO DO dobavi usera, dobavi njegove postove
    this.user = {"id": this.id, "username": "senorita"};

    this.posts = [{"id":1,"text": "post1", "showComments": false, "likes":35, "dislikes":5, "comments": [{"username": "Stoja", "text": "VRHH"}]}, {"id":2,"text": "post2",  "showComments": false, "comments": []}];
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      commentText: ['']
    });
  }

  sendComment(id: any): void {
    const dialogRef = this.dialog.open(NewCommentComponent);
    dialogRef.componentInstance.postId = id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  follow(): void {

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
    this.router.navigate(['/chat-messages/' + this.id]);
  }
  showComments(post: any): void {
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
  like(id: any): void{

  }
  dislike(id: any): void {

  }
}
