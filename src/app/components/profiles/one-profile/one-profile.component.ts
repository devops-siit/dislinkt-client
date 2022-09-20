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
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Chat } from 'src/app/model/Chat';

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
  following = false;
  sendRequest = true;
  requestSent = false;
  privateAccount = false;
  result: any;
  currentUser?: Account;
  myChats: Chat[] = [];
  myFollowing: Account[] = [];

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
    this.uuid = this.route.snapshot.params.uuid;

    this.authService.validateToken().subscribe(
      res=>{
        this.currentUser = res.body as Account;
        this.accountService.getFollowing(this.currentUser?.uuid).subscribe(
          res=>{
            this.myFollowing = res.content as Account[];
            for(var acc of this.myFollowing){
              if(acc.uuid == this.uuid){
                this.following = true; // pratimo se
                if(!acc.isPublic){
                  this.privateAccount = true;
                  console.log(this.privateAccount)
                }
              }
            }
          }
        )
      }
    )
    
    this.accountService.getAccountByUuid(this.uuid).subscribe(
      res=>{
        this.user = res as Account;
        this.privateAccount = this.user.isPublic? false:true;
      }
    );
    

    this.postService.getPostsByAccount(this.uuid, 0, 5).subscribe(
      res=>{
        this.posts = res.content as Post[];
      }
    )
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      commentText: ['']
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
      this.accountService.followAccount(this.uuid).subscribe(
        res=>{
          this.following = true;
          this.toastr.success("You're now following "+ this.user?.username);
        }
      )
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

          this.accountService.unFollowAccount(this.uuid).subscribe(
            res=>{
              this.following = false;
              this.toastr.success('User unfollowed');
            }
          )
        }
      })
    }
    // nije privatan
    else {
      this.accountService.unFollowAccount(this.uuid).subscribe(
        res=>{
          this.following = false;
          this.toastr.success('User unfollowed');
        }
      )
    }
  }
  message(): void {
    // proveri prvo dal postoji chat taj chat
    let existing = false;
    let chatUuid ;
    this.chatService.getChatsByAccount().subscribe(
      res=>{
        this.myChats = res as Chat[];
        for(var chat of this.myChats){
          if(chat.account?.uuid == this.uuid){
            existing = true; // postoji chat
            chatUuid = chat.uuid;
          }
        }
      }
    );
    if (existing) {
      this.router.navigate(['/chat-messages/' + chatUuid+'/'+this.user?.username + '/'+this.uuid]);
    }
    else {
      this.chatService.insertChat(this.uuid).subscribe(
        res=>{
          let newChat = res as Chat;
          this.router.navigate(['/chat-messages/' + newChat.uuid +'/'+this.user?.username + '/'+ this.uuid]);
        }
      )
    }
    
  }
  readMore(postUuid: any): void {
    this.router.navigate(['/one-post/' + postUuid]);
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
          this.accountService.blockAccount(this.uuid).subscribe(
            res=>{
              this.toastr.success('User blocked');
               window.location.reload();
            }
          )}
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
