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
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService, cookieService) {
        var _this = this;
        this.dataService = dataService;
        this.cookieService = cookieService;
        this.name = '';
        if (cookieService.check("UserId")) {
            dataService.SignIn((cookieService.get("UserId"))).subscribe(function (x) {
                console.log(cookieService.get("UserId"));
                console.log(x);
                console.log(x == "true");
            });
        }
        else {
            dataService.SignUp().subscribe(function (x) {
                console.log("Pisos" + x);
                _this.userId = JSON.parse(x);
                console.log("Pisos" + _this.userId);
                cookieService.set("UserId", _this.userId);
                console.log("cookie:" + cookieService.check("UserId"));
                console.log("cookie:" + cookieService.get("UserId"));
            });
        }
    }
    AppComponent.prototype.SignUpSync = function () {
        var _this = this;
        this.dataService.SignUp().subscribe(function (x) { _this.guid = x; console.log(_this.guid); });
        return this.guid;
    };
    AppComponent.prototype.SignInSync = function (guid) {
        var _this = this;
        this.dataService.SignIn(guid).subscribe(function (x) { _this.ret = JSON.parse(x); console.log(_this.ret); });
        return this.ret;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.name = this.dataService.UserId;
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            template: "<label>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F:</label>\n                 <input [(ngModel)]=\"name\" placeholder=\"name\">\n                 <h2>\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C {{name}}!</h2>",
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService, CookieService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map