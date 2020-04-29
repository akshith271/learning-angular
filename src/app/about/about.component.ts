import { Component, OnInit } from "@angular/core";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
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
