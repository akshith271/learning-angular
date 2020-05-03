import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../services/dish.service";
import {Dish} from "../shared/dish";
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  commentFormErrors = {
    authorName: "",
    comment: "",
  };
  validationMessages = {
    authorName: {
      required: "Author name is required.",
      minlength: "Name must be at least two characters long.",
    },
    comment: {
      required: "Comment is required. ",
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      authorName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      comment: ["", [Validators.required]],
      rating: "5",
    });
    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    // this.onValueChanged(); //reset the form validation messages
  }

  getErrorMessage(fieldName, error) {
    for (let errorType in this.validationMessages[fieldName]) {
      if (
        error &&
        this.validationMessages[fieldName].hasOwnProperty(errorType) &&
        error.hasOwnProperty(errorType)
      ) {
        return this.validationMessages[fieldName][errorType];
      }
    }
  }

  onValueChanged(data) {
    const form = this.commentForm;
    for (let fieldName in this.commentFormErrors) {
      const field = form.get(fieldName);
      this.commentFormErrors[fieldName] = "";
      if (field && field.dirty) {
        const message = this.getErrorMessage(fieldName, field.errors);
        if (message) {
          this.commentFormErrors[fieldName] = message;
        }
      }
    }
  }
  onSubmit() {
    const formValue = this.commentForm.value;
    let newComment = {
      author: formValue.authorName,
      rating: formValue.rating,
      comment: formValue.comment,
      date: new Date().toISOString(),
    };
    this.dish.comments.push(newComment);

    this.commentForm.reset({
      authorName : '',
      rating : '5',
      comment : '',

    });
  }

  ngOnInit() {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params["id"]))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
