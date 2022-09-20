import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postUuid!: any;
  postForm!: FormGroup;
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
    public dialogRef: MatDialogRef<NewPostComponent>,
    private postService: PostService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();

    }

  createForm(): void {
    this.postForm = this.fb.group({
      text: ['']
    });
  }

  insertPost(): void {
   
    this.postService.insertPost({"text": this.postForm.value.text}).subscribe(
      res=>{
        this.toastr.success("Post added");
      },
      error => {
          console.log(error);
          this.toastr.error("Cannot add post, sorry :( ");
      }
    )
    this.dialogRef.close();

  }

  cancel():void {
    this.dialogRef.close();
  }

}
