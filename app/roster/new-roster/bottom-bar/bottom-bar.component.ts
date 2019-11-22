import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css', '../new-roster.component.css']
})
export class BottomBarComponent implements OnInit {

	@Output() tabSelected = new EventEmitter<number>();

	@Input() currentTab: number;

  constructor() { }

  ngOnInit() {
  }

  selectTab(index: number) {
		this.currentTab = index;
		this.tabSelected.emit(index);
	}

}
