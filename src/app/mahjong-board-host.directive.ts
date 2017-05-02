import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMahjongBoardHost]'
})
export class MahjongBoardHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
