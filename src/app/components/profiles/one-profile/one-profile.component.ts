import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-one-profile',
  templateUrl: './one-profile.component.html',
  styleUrls: ['./one-profile.component.scss']
})
export class OneProfileComponent implements OnInit {

  id: any = "";
  user: any = {};
  posts: any = [];
  following = true;
  privateAccount = true;
  result: any;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    // TO DO dobavi usera, dobavi njegove postove
    this.user = {"id": this.id, "username": "senorita"};
    this.posts = [{"text": "post1", "showComments": false, "comments": [{"username": "Stoja", "text": "VRHH"}]}, {"text": "post2",  "showComments": false, "comments": []}];
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
}
