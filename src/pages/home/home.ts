import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public event = {
    dateStarts: new Date()
  };
  public testDate: any;
  public adjustmentVariable: Number = 0;

  constructor(public navCtrl: NavController) {
    this.testDate = this.writeIslamicDate(this.adjustmentVariable);
  }

  getHijriDate() {
    console.log("Get Hijri Date.");
    this.testDate = this.writeIslamicDate(this.adjustmentVariable);
  }

  gmod(n,m) {
    return ((n%m)+m)%m;
  }

  kuwaiticalendar(adjust) {
    var today = new Date();
    if (adjust) {
      var adjustmili = 1000*60*60*24*adjust;
      var todaymili = today.getTime()+adjustmili;
      var today = new Date(todaymili);
    }
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var m = month+1;
    var y = year;
    if (m<3) {
      y -= 1;
      m += 12;
    }

    var a = Math.floor(y/100.);
    var b = 2-a+Math.floor(a/4.);
    if (y<1583) b = 0;
    if (y==1582) {
      if (m>10)  b = -10;
      if (m==10) {
        b = 0;
        if (day>4) b = -10;
      }
    }

    var jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

    b = 0;
    if (jd>2299160) {
      a = Math.floor((jd-1867216.25)/36524.25);
      b = 1+a-Math.floor(a/4.);
    }
    var bb = jd+b+1524;
    var cc = Math.floor((bb-122.1)/365.25);
    var dd = Math.floor(365.25*cc);
    var ee = Math.floor((bb-dd)/30.6001);
    var day =(bb-dd)-Math.floor(30.6001*ee);
    var month = ee-1;
    if (ee>13) {
      cc += 1;
      month = ee-13;
    }
    year = cc-4716;


    var wd = this.gmod(jd+1,7)+1;

    var iyear = 10631./30.;
    var epochastro = 1948084;
    var epochcivil = 1948085;

    var shift1 = 8.01/60.;

    var z = jd-epochastro;
    var cyc = Math.floor(z/10631.);
    var z = z-10631*cyc;
    var j = Math.floor((z-shift1)/iyear);
    var iy = 30*cyc+j;
    var z = z-Math.floor(j*iyear+shift1);
    var im = Math.floor((z+28.5001)/29.5);
    if (im==13) im = 12;
    var id = z-Math.floor(29.5001*im-29);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month-1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd-1; //julian day number
    myRes[4] = wd-1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im-1; //islamic month
    myRes[7] = iy; //islamic year

    return myRes;
  }
  writeIslamicDate(adjustment) {
    var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt");
    var iMonthNames = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir",
    "Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban",
    "Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja");
    var iDate = this.kuwaiticalendar(adjustment);
    var outputIslamicDate = wdNames[iDate[4]] + ", "
    + iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " AH";
    return outputIslamicDate;
  }

}
