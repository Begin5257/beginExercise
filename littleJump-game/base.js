/**
 * Created by 83916 on 2015/12/6.
 */
//����ո�ʱͼ������20px
function jumpUp() {
    var drawing = document.getElementById("drawing");
    if (drawing.getContext) {
        var context = drawing.getContext("2d");
        //��ʼ·��
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


