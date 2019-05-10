import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { Router } from '@angular/router';
import { Gamelists } from '../model/gamelist.model';
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  Gamelist: Gamelists[]; 
  baseUrl: string = 'http://localhost:3000/Gamelist';
  public playList: any;

  private amount: number;

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    this.gameService.getGamesList().subscribe(data => {
      this.playList = data;
      console.log( this.playList);
    });
    this.amount = this.gameService.getAmount();

  }

  playGame(game) {
  
   
    if (game.price > this.amount) {
      this.gameService.setAmount(this.amount-Number(game.price));
      this.gameService.setSelectedGame(game.name);
      this.gameService.setResult('2');
    } else {
      this.gameService.setSelectedGame(game.name);
      this.gameService.setResult('1');
    }
    this.router.navigate(['success']);
  }

}
