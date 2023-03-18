import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-learning',
  templateUrl: './rxjs-learning.component.html',
  styleUrls: ['./rxjs-learning.component.scss']
})
export class RxjsLearningComponent implements OnInit {

  agent!: Observable<string>;
  agentName!: string;
  constructor() { }

  ngOnInit(): void {
    this.agent = new Observable(
      function(observer) {
        try{
          observer.next('Hello');
          setInterval(() => {
            observer.next('Hi');
          }, 4000)
          setInterval(() => {
            observer.next('Good morning');
          }, 8000)
        }
        catch(e) {
          observer.error(`Oops, something went wrong ${e}`);
        }
      }
    )

    this.agent.subscribe((data) => this.agentName = data);
  }

}
