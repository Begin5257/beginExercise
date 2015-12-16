/**
 * Created by 83916 on 2015/12/11.
 */
var SY,SM,SD,cy,cm
SY = new Date().getFullYear();
SM = new Date().getMonth()+1;
SD = new Date().getDate();
cy = document.getElementById("cy")
cm = document.getElementById("cm")
window.onload = function(){
    getDynamicTable(SY,SM)
    document.getElementById("YearAll").innerHTML = YearAll(SY)
    document.getElementById("DateAll").innerHTML = DateAll(SY,SM)
}
function YearAll(Y){
    var Ystr = ""
    for (var y = Y - 10; y <= Y + 10; y++) {
        Ystr += "<li onclick='getym(this,\"cy\")'>"+ y +"</li>"
    }
    return Ystr
}
function DateAll(Y,M){
    var Mstr = "",Mnum = GetDaysInMonth(Y,M)
    for (var m = 1; m <= 12; m++) {
        Mstr += "<li onclick='getym(this,\"cm\")'>"+ (m < 10 ? "0" + m : m) +"</li>"
    }
    return Mstr
}
function getym(o,s){
    document.getElementById(s).innerHTML = parseInt(o.innerHTML)
    getDynamicTable(parseInt(cy.innerHTML),parseInt(cm.innerHTML))
}
function Month(s){
    var y = parseInt(cy.innerHTML),m = parseInt(cm.innerHTML)
    if (s == "l") {
        if (m <= 1) {
            m = 12
            y --
        } else {
            m --
        }
    } else {
        if (m >= 12) {
            m = 1
            y ++
        } else {
            m ++
        }
    }
    cy.innerHTML = y
    cm.innerHTML = m
    getDynamicTable(y,m)
}
function now(){
    getDynamicTable(SY,SM)
    cy.innerHTML = SY
    cm.innerHTML = SM
}
function getDynamicTable(Y,M){
    var Temp,i,j
    var FirstDate,MonthDate,CirNum,ErtNum
    FirstDate = GetWeekdayMonthStartsOn(Y,M)
    MonthDate = GetDaysInMonth(Y,M)
    ErtNum = FirstDate + MonthDate
    Temp = ""
    TDstyle = " "
    if (ErtNum > 35){
        CirNum = 42
    }else if (ErtNum == 28){
        CirNum = 28
    }else{
        CirNum = 35
    }
    j=1

    for (i = 1; i <= CirNum; i++){
        if (i == 1){
            Temp += "<table><tr><th>日</th><th>六</th><th>五</th><th>四</th><th>三</th><th>二</th><th>一</th></tr><tr>"
        }
        if (i < FirstDate + 1 || i > ErtNum){
            Temp += "<td></td>"
        }else{
            Temp += (SY == Y && SM == M && SD == j ? "<td class='now'>" : "<td>") + j +"</td>"
            j = j + 1
        }
        if (i % 7 == 0 && i < ErtNum){
            Temp += "</tr><tr>"
        }
        if (i == CirNum){
            Temp += "</tr></table>"
        }
    }
    document.getElementById("DayAll").innerHTML = Temp
}
function GetDaysInMonth(Y,M){				//'寰楀埌璇ユ湀鐨勬€诲ぉ鏁?
    if (M==1||M==3||M==5||M==7||M==8||M==10||M==12)
        return 31;
    else if (M==4||M==6||M==9||M==11)
        return 30;
    else if (M==2)
        if((Y%4==0 && Y%100!=0)||(Y%100==0 && Y%400==0))
            return 29;
        else
            return 28;
    else
        return 28;
}
function GetWeekdayMonthStartsOn(Y,M){
    var date = new Date(Y,M-1,1)
    return date.getDay()
}