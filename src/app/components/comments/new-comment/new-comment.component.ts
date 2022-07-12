import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  postId!: any;
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
    public dialogRef: MatDialogRef<NewCommentComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.id = this.route.snapshot.params.id;
    // TO DO dobavi usera, dobavi njegove postove
    this.user = {"id": this.id, "username": "senorita"};
    this.posts = [{"text": "post1", "showComments": false, "likes":35, "dislikes":5, "comments": [{"username": "Stoja", "text": "VRHH"}]}, {"text": "post2",  "showComments": false, "comments": []}];
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      commentText: ['']
    });
  }

  sendComment(): void {
    console.log(this.postId);
    this.dialogRef.close();

  }

  cancel():void {
    this.dialogRef.close();
  }

  
  
  

}
