import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { DropdownMenu } from 'src/app/core/models/dropdown-menu';
import { SeparateCapitalWordsPipe } from '../../pipes/separate-capital-words.pipe';
import { StatusBadgesComponent } from '../status-badges/status-badges.component';
import { TextOverflowPipe } from '../../pipes/text-overflow.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TextOverflowPipe, SeparateCapitalWordsPipe, CustomDatePipe, StatusBadgesComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any;
  @Output() itemClicked = new EventEmitter<DropdownMenu>();

  public isMenuOpen = false;

  public menus = ['edit', 'delete'];
  private row!: Record<string, any>;

  public toggleMenu(row: any): void {
    this.row = row;
    this.isMenuOpen = !this.isMenuOpen;
  }

  onItemClick(item: string): void {
    const dropdownMenu: DropdownMenu = {
      item,
      id: this.row['id'],
    };
    this.itemClicked.emit(dropdownMenu);
    this.isMenuOpen = false;
  }
}
