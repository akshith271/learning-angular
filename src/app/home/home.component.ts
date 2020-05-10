import {Component, Inject, OnInit} from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";

import {LeaderService} from "../services/leader.service";
import {Leader} from "../shared/leader";
import {flyInOut,expand} from "../animations/app.animation";
import {error} from "util";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display : block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  dishErrMess : string;
  leader: Leader;
  promoErrMsg:string;
  leaderErrMsg:string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') private baseURL)

   {}

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe((dish)=>this.dish = dish, error => this.dishErrMess = <any>error );
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion)=> this.promotion = promotion, error =>this.promoErrMsg = <any>error);
    this.leaderService.getFeaturedLeader()
      .subscribe((leader)=> this.leader = leader, error => this.leaderErrMsg = <any>error);
  }
}
