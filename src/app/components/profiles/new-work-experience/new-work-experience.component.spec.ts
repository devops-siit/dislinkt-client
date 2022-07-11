import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkExperienceComponent } from './new-work-experience.component';

describe('NewWorkExperienceComponent', () => {
  let component: NewWorkExperienceComponent;
  let fixture: ComponentFixture<NewWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWorkExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
