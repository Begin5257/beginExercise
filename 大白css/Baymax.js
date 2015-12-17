/**
 * Created by 83916 on 2015/12/17.
 */
function eyeBright(){
    $("#eye").animate({opacity : '0'},"slow");
    $("#eye").animate({opacity : '1'},"slow");
}
setInterval(function(){
    eyeBright();
},1500);

