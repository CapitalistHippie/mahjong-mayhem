import { Component, Directive, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { MdSelectModule } from '@angular/material';

@Component({
  selector: 'md-card',
  template: ''
})
export class MdCardComponent { }

@Component({
  selector: 'md-card-content',
  template: ''
})
export class MdCardContentComponent { }

@Component({
  selector: 'md-card-title',
  template: ''
})
export class MdCardTitleComponent { }

@Component({
  selector: 'md-option',
  template: ''
})
export class MdOptionComponent {
  @Input() value: any;
}

@Component({
  selector: 'md-toolbar',
  template: ''
})
export class MdToolbarComponent { }

@Directive({
  selector: '[mdInput]'
})
export class MdInputDirective { }

let modules = [
  MdSelectModule
]

let components = [
  MdCardComponent,
  MdCardContentComponent,
  MdCardTitleComponent,
  // MdOptionComponent,
  MdToolbarComponent
]

let directives = [
  MdInputDirective
]

@NgModule({
  declarations: [
    components,
    directives
  ],
  imports: [
    MdSelectModule // TODO: Stub this module.
  ],
  exports: [
    MdSelectModule,
    components,
    directives
  ],
})
export class AngularMaterialModule { }
