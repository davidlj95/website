import { Component } from '@angular/core'

@Component({
  selector: 'app-empty-component', // not mandatory, but added to be able to use `byComponent` API with it
  template: '',
  standalone: true,
})
export class EmptyComponent {}
