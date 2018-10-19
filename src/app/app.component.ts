import { Component } from "@angular/core";

@Component({
  selector : 'pm-root',
  templateUrl : './app.component.html'
})
export class AppComponent{
  pageTitle : string = 'Acme Product Management';
  reason : string = 'reason'
}