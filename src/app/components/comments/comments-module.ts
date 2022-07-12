import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { NewCommentComponent } from './new-comment/new-comment.component';

@NgModule({
  declarations: [NewCommentComponent],
  imports: [ MatDialogModule, MaterialModule],
  exports: [NewCommentComponent],
  providers: []
})

export class CommentsModule { }
