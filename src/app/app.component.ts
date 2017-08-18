import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  songs = [
    {
      title: 'Song 1',
      likes: 25
    },
    {
      title: 'Song 5',
      likes: 50
    },
    {
      title: 'Song 10',
      likes: 10
    }
  ];
  term = 5;
  changeMaker(value){
    let pennies = value * 100;
    const quarters = Math.floor(pennies / 25);
    pennies -= quarters * 25;
    const dimes = Math.floor(pennies / 10);
    pennies -= dimes * 10;
    const nickels = Math.floor(pennies / 5);
    pennies -= nickels * 5;
    pennies++;
    return {
      quarters,
      dimes,
      nickels,
      pennies,
    };
  }
}
