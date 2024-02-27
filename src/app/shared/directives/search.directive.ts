import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

type EventArg = { target: { value: string } };

@Directive({
  selector: '[appSearch]',
  standalone: true,
})
export class SearchDirective implements OnInit {
  constructor(private hostRef: ElementRef) { }

  @Input() debounceTime: number = 1000;
  @Input() minLength: number = 1000;
  @Output() search: Observable<string> = fromEvent<EventArg>(this.hostRef.nativeElement, 'keyup').pipe(
    debounceTime(this.debounceTime),
    map((eventArg: EventArg) => {
      console.log(eventArg.target.value);
      return eventArg.target.value;
    }),
    filter((term: string) => {
      return term.length >= this.minLength;
    }),
    distinctUntilChanged(),
  );

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
      fromEvent(clearButton, 'click').subscribe(() => {
        this.clearInput();
      });
    }
  }

  private clearInput() {
    const inputElement = this.hostRef.nativeElement;
    if (inputElement && inputElement.value) {
      inputElement.value = '';
      inputElement.dispatchEvent(new Event('input'));
      this.clear.emit(inputElement.value);
    }
  }
}
