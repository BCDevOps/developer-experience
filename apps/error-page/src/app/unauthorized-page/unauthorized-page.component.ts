import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (async () => { 
      await this.delay(1800); //this is to wait for the lock animation
      this.playAudio();
  })();
    
  }
  playAudio(){
    let audio = new Audio();
    audio.src = '../../assets/err-page.mp3';
    audio.load();
    audio.play();
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
