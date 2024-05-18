import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomListDialogComponent } from './hotel-room-list-dialog.component';

describe('HotelRoomListDialogComponent', () => {
  let component: HotelRoomListDialogComponent;
  let fixture: ComponentFixture<HotelRoomListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRoomListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelRoomListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
