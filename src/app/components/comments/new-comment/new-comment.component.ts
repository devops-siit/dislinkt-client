import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  postUuid!: any;
  commentForm!: FormGroup;
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
    public dialogRef: MatDialogRef<NewCommentComponent>,
    private postService: PostService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();

    }

  createForm(): void {
    this.commentForm = this.fb.group({
      commentText: ['']
    });
  }

  sendComment(): void {
    console.log(this.postUuid);
    //send comment
    this.postService.insertComment({"text": this.commentForm.value.commentText, "postUuid": this.postUuid}).subscribe(
      res=>{
        this.toastr.success("Comment added");
      },
      error => {
          console.log(error);
          this.toastr.error("Cannot add comment");
      }
    )
    this.dialogRef.close(true);

  }

  cancel():void {
    this.dialogRef.close();
  }

  
  
  

}
