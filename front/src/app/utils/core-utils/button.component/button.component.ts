import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'yap-button',
  templateUrl: './button.component.html',
  imports: [CommonModule],
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() fullWidth: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
