import { Component, OnInit } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Leader } from "../shared/leader";
import {LeaderService} from "../services/leader.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;
  featuredLeader: Leader;
  constructor(private dishService: DishService,
              private leaderService: LeaderService) {}

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe((dishes)=> this.dishes = dishes);
  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
