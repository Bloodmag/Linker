var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
//import { Product } from './product';
var DataService = /** @class */ (function () {
    function DataService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.userUrl = "/api/user";
        if (cookieService.check("UserId") && this.SignIn(cookieService.get("UserId"))) {
            this.UserId = cookieService.get("UserId");
        }
        else {
            var guid = this.SignUp();
            cookieService.set("UserID", guid);
            this.UserId = guid;
        }
        console.log(this.UserId);
    }
    DataService.prototype.SignUp = function () {
        return this.http.get(this.userUrl, { responseType: 'text' })[0];
    };
    DataService.prototype.SignIn = function (guid) {
        return this.http.get(this.userUrl + "/" + guid, { responseType: 'text' })[0] == "true";
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CookieService])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map