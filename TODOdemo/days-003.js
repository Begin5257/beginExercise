/**
 * Created by 83916 on 2015/12/2.
 */
function emptyAll(){
    document.getElementsByTagName("input").innerHTML="";
}

function save(){
    var lable=document.getElementById("lable");
    var para=document.createElement("li");
    var node=document.createTextNode("lable.innerHTML");

    para.appendChild(node);

    var element=document.getElementById("ul");
    element.appendChild(para);

    alert(lable);
}