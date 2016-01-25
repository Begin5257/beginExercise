/**
 * Created by Beginning on 2015/12/4.
 */
//清除表单中所有内容
function emptyAll(){
    document.getElementById("form1").reset();
}
//点击按钮时将数据添加到localStorage并添加li标签进行显示
btn = document.getElementById("btn");
btn.onclick = function(){
    var lable = document.getElementById("newLable").value;
    var time = document.getElementById("newTime").value;
    var content = document.getElementById("content").value;
    if(lable===""||time===""||content===""){
        if (lable ==="") {
            alert("please enter");
            document.getElementById("newLable").style.border = "1px solid red";
            return false;
        } else {
            document.getElementById("newLable").style.border = "1px solid #3C82C0";
        }
        if (time === "") {
            alert("please enter");
            document.getElementById("newTime").style.border = "1px solid red";
            return false;
        } else {
            document.getElementById("newTime").style.border = "1px solid #3C82C0";
        }
        if (content === "") {
            alert("please enter");
            document.getElementById("content").style.border = "1px solid red";
            return false;
        } else {
            document.getElementById("content").style.border = "1px solid #3C82C0";
        }
    }else{
        var addli = document.createElement("li");
        addli.innerText=time+'-'+lable;
        document.getElementById('add').appendChild(addli);


        var js  = [];
        var contentFormLS = JSON.parse(localStorage.getItem("key"));
        if(contentFormLS != null){
            js = contentFormLS;
        }
        var addJSON={
            lable: document.getElementById("newLable").value,
            time: document.getElementById("newTime").value,
            content: document.getElementById("content").value
        };
        //此处不需要讲addArr再序列化
        //var addArr = JSON.stringify(addJSON);
        liStatus();
        console.log(addJSON);
        console.log(js);
        //将addArr push到js
        js.push(addJSON);
        var json = JSON.stringify(js);
        localStorage.setItem("key",json);
    }

};
//点击li标签将li标签详细内容显示在表格中
function showContent(){
    var li = document.getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
        li[i].index = i;
        li[i].onclick = function () {
            //var content = document.getElementById('contenter');
            //content.innerText = this.innerText;
            //content.style.display = "inline";
            var str = document.getElementsByTagName('li')[this.index].innerText;
            var arr = str.split("-");
            var time = arr[0];
            var lable1 = arr[1];

            var Str = localStorage.getItem("key");
            var Arr = JSON.parse(Str);
            document.getElementById('content').value = Arr[this.index].content;
            document.getElementById("newLable").value=lable1;
            document.getElementById("newTime").value=time;
        };
    }
}

//加载页面时将localStorage中内容显示出来
function load(){
    var storage = localStorage.getItem("key");
    var storageArr = JSON.parse(storage);
    console.log(storageArr);
    //使用storageArr[i].time时对象应该是对象
    for (var i = 0; i < storageArr.length; i++) {
        var hiLable = storageArr[i].time+"-"+storageArr[i].lable;
        console.log(storageArr[i]);
        var newLable = document.createElement("li");
        var node = document.createTextNode(hiLable);
        newLable.appendChild(node);

        var element = document.getElementById("add");
        element.appendChild(newLable);
    }
}
load();
showContent();
var li = document.getElementsByTagName("li");
var parent = document.getElementById("add");
//清空全部localStorage中全部记录
function removeAll(){
    var li = document.getElementsByTagName("li");
    var parent = document.getElementById("add");
    var k = li.length;
    console.log(k);
    localStorage.clear();
    //清空li标签时i的控制参数不能使用动态的li.length
    //k值增大时逐渐从最下面开始删除元素
    for(var i= k-1; i >= 0 ; i--){
        parent.removeChild(li[i]);
    }
    //var parent = document.getElementById("TODO");
    //var child = document.getElementById("add");
    //parent.removeChild(child);
}
function removeOne() {
    var k = li.length;
    var storage = localStorage.getItem("key");
    var storageArr = JSON.parse(storage);
    storageArr.pop();
    var storageStr = JSON.stringify(storageArr);
    console.log(storageArr.length);
    localStorage.setItem("key", storageStr);
    parent.removeChild(li[k - 1]);
}
function liStatus(){
    var li = document.getElementsByTagName("li");
    for (var i =li.length-1; i>0;i--) {
        li[i].index = i;
        li[i].onclick = function () {

            li[this.index].style.color = "red";
            li[this.index].selected = true;
            var k = this.index;

            for (var j =li.length-1; j>0;j--) {
                if(j !== k) {
                    li[j].style.color="#777";
                    li[j].selected = false;
                }
            }
        }
    }
}
liStatus();
function selectRemove() {
    //当li被选中时,改变字体颜色和状态
    //调查一下表单状态
    //liStatus();
    var li = document.getElementsByTagName("li");
    var storage = JSON.parse(localStorage.getItem("key"));
    for (var j = li.length-1; j >0; j--) {
        if (li[j].selected) {
            parent.removeChild(li[j]);
            //在i-1的位置删除一个元素
            storage.splice(j-1, 1);
            //再一次循环之前再次检查状态
            liStatus();
        }
    }
    console.log(storage);
    //再把str存入localStorage
    var str = JSON.stringify(storage);
    localStorage.setItem("key", str);
}
selectRemove();

