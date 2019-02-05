import { Injectable } from "@angular/core";
import { NgFlashMessageService } from "ng-flash-messages";

@Injectable()
export class FlashService {
  constructor(private ngFlashService: NgFlashMessageService) { }

  successMessage(messageText: string) {
    this.ngFlashService.showFlashMessage({
      messages: [messageText],
      type: "success",
      dismissible: false,
      timeout: 3000
    });
  }
}
