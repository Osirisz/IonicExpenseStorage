import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {
  data = { rowId: 0, trandate: "", categoryId: 0, description: "", amount: 0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
    this.getCurrentData(navParams.get("rowId"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

  getCurrentData(rowId) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM trans WHERE rowId=?', [rowId])
        .then(res => {
          if (res.rows.length > 0) {
            this.data.rowId = res.rows.item(0).rowId;
            this.data.trandate = res.rows.item(0).trandate;
            this.data.categoryId = res.rows.item(0).categoryId;
            this.data.description = res.rows.item(0).description;
            this.data.amount = res.rows.item(0).amount;
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE trans SET trandate=?,categoryId=?,description=?,amount=? WHERE rowId=?', [this.data.trandate, this.data.categoryId, this.data.description, this.data.amount, this.data.rowId])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
