import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-new-roster-bar',
  templateUrl: './new-roster-bar.component.html',
  styleUrls: ['./new-roster-bar.component.css', '../new-roster.component.css']
})
export class NewRosterBarComponent implements OnInit {

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
