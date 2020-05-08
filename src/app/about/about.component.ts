import { Component, OnInit } from "@angular/core";
import { LeaderService } from "../services/leader.service";
import {flyInOut,expand} from "../animations/app.animation";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display : block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders;

  constructor(private leaderService: LeaderService) {}

  ngOnInit() {
    let something = this.leaderService.getLeaders()
      .subscribe((result)=>{
         this.leaders = result;
      })
  }
}
