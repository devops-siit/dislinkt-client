import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
  declarations: [AllPostsComponent, MyPostsComponent, NewPostComponent],
  imports: [ MatDialogModule, MaterialModule],
  exports: [AllPostsComponent, MyPostsComponent, NewPostComponent],
  providers: []
})

export class PostsModule { }
