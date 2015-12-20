/**
 * Created by 83916 on 2015/12/17.
 */
function eyeBright(){
    $("#eye").animate({opacity : '0'});
    $("#eye").animate({opacity : '1'});
}
setInterval(function(){
    eyeBright();
},500);

