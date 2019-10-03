import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app',
    template: `<label>Введите имя:</label>
                 <input [(ngModel)]="name" placeholder="name">
                 <h2>Добро пожаловать {{name}}!</h2>`,
    providers: [DataService]
})
export class AppComponent implements OnInit {

    
    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.name = this.dataService.UserId;
        console.log(this.dataService.SignUp());
    }
    

    name = '';
}