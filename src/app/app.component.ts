import { Component, VERSION } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  corg: string;
  cdst: string;
  eorg: string;
  edst: string;
  km: number;
  kg: number;
  valor: number;
  frete: number;
  vfrete: number;
  vfinal: number;

  constructor(private alertController: AlertController) {}

  calcular() {
    this.frete = 0;
    this.vfrete = 20;
    if (this.valor <= 500) {
      if (this.corg != this.cdst) {
        if (this.eorg == this.edst) {
          if (this.km < 400) {
            this.frete = this.frete + 0.2;
          } else {
            this.frete = this.frete + 0.35;
          }
        } else {
          this.frete = this.frete + 0.4;
        }
        if (this.kg < 3) {
          this.frete = this.frete - 0.15;
        }
        this.vfinal = this.valor + (this.vfrete + this.valor * this.frete);
        this.MostrarAlert();
      } else {
        this.vfinal = this.valor + 20;
        this.MostrarAlert();
      }
    } else {
      this.vfrete = 0;
      this.vfinal = this.valor;
      this.MostrarAlert();
    }
  }

  async MostrarAlert() {
    const alert = await this.alertController.create({
      header: 'Frete Calculado!',
      message: `Frete: ${this.frete * 100}%<br/>Valor do Frete: R$${
        this.vfrete + this.valor * this.frete
      }<br/>Valor da Compra com Frete: R$${this.vfinal}`,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ionViewDidEnter() {}
}
