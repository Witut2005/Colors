import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourColorsComponent } from './your-colors.component';

describe('YourColorsComponent', () => {
  let component: YourColorsComponent;
  let fixture: ComponentFixture<YourColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
