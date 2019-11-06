var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';
import { PlatformLocation } from '@angular/common';
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService, cookieService, platformLocation) {
        var _this = this;
        this.dataService = dataService;
        this.cookieService = cookieService;
        this.name = '';
        if (cookieService.check("UserId")) {
            dataService.SignIn((cookieService.get("UserId"))).subscribe(function (x) {
                if (x == "true") {
                    _this.userId = cookieService.get("UserId");
                    console.log("Successfully logged as " + _this.userId);
                }
                else {
                    dataService.SignUp().subscribe(function (x) {
                        _this.userId = JSON.parse(x);
                        cookieService.set("UserId", _this.userId);
                        console.log("Unsuccessful login attempt. Registering as " + _this.userId);
                    });
                }
            });
        }
        else {
            dataService.SignUp().subscribe(function (x) {
                _this.userId = JSON.parse(x);
                cookieService.set("UserId", _this.userId);
                console.log("Registered as " + _this.userId);
            });
        }
        this.pageUrl = platformLocation.href + "l/";
        this.isCopyBtnVisible = false;
        this.isLongUrlValid = false;
        this.regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\) \*\+,;=.]+$/;
        this.hasShortened = false;
    }
    AppComponent.prototype.Shorten = function () {
        var _this = this;
        console.log("ОБРЕЗАНО");
        document.querySelectorAll(".dick_head").forEach(function (p) { return p.classList.add("dick_head_animate"); });
        document.querySelector(".saber").classList.add("saber_anim");
        this.dataService.ShortenUrl(this.userId, this.longUrl).subscribe(function (x) {
            _this.shortUrl = _this.pageUrl + JSON.parse(x)["value"];
        });
        this.isCopyBtnVisible = true;
        this.hasShortened = true;
        this.Shorten = function () { };
    };
    AppComponent.prototype.OnUrlUpdated = function () {
        this.isLongUrlValid = this.regex.test(this.longUrl);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.name = this.dataService.UserId;
    };
    AppComponent.prototype.copyToClipBoard = function () {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.shortUrl;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            //styleUrls: ['./app.component.css'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService, CookieService, PlatformLocation])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map