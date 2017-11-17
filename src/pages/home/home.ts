import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  expenses: any = [];
  balance: number=0;
          
  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.storage.ready().then(() => {
      this.storage.get('expen').then((data) => {
        if (data) {
          this.expenses = data;
          this.balance = 0;
          this.expenses.forEach(element => {
            if (element.income) {
              this.balance += parseInt(element.amount);
            } else {
              this.balance -= element.amount;
            }
          });
          console.log(this.expenses);
          console.log(this.balance);
        }
      });
    });
  }

  addData() {
    this.navCtrl.push(AddDataPage);
  }

  // editData(rowId) {
  //   this.navCtrl.push(EditDataPage, {
  //     rowId: rowId
  //   });
  // }

  // deleteData(rowId) {
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('DELETE FROM trans WHERE rowId=?', [rowId])
  //     .then(res => {
  //       console.log(res);
  //       this.getData();
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }
}
