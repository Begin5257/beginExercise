/**
 * Created by 83916 on 2015/12/6.
 */
//点击空格时图像上移20px
function jumpUp() {
    var drawing = document.getElementById("drawing");
    if (drawing.getContext) {
        var context = drawing.getContext("2d");
        //开始路径
        context.beginPath();
        var image = document.images[0];
        context.drawImage(image, 50, 300, 200, 240);
    }
}
$("#drawing").keydown(function(){
        $("#image").animate({
            top:'150px'
        });
});


