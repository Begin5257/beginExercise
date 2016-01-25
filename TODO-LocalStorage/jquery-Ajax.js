/**
 * Created by 83916 on 2015/12/11.
 */
/**
 * Created by 83916 on 2015/12/11.
 */
/**
 * Created by Beginning on 2015/12/4.
 */
//清除表单中所有内容
function emptyAll(){
    document.getElementById("form1").reset();
}
//点击按钮时将数据添加到localStorage并添加li标签进行显示
btn = document.getElementById("btn");
btn.onclick = function() {
    var title = document.getElementById("newLable").value;
    var time = document.getElementById("newTime").value;
    var content = document.getElementById("content").value;
    if (title === "" || time === "" || content === "") {
        if (title === "") {
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
    } else {
        var addli = document.createElement("li");
        addli.innerText = time + '-' + title;
        document.getElementById('add').appendChild(addli);
        addli.setAttribute("content", content);

        var form = document.getElementById("form1");

        // to takeover its submit event.
        form.addEventListener("submit", function (event) {
            event.preventDefault();
        });
        function sendData() {
            var XHR = new XMLHttpRequest();
            var data = new FormData();
            data.append("time","time");
            data.append("title","title");
            data.append("content","content");
            console.log(data);
            var TODOjson = JSON.stringify(data);
            console.log(TODOjson);
            // 定义数据成功发送并返回后执行的操作
            //XHR.addEventListener('load', function (event) {
            //    alert('Yeah! Data sent and response loaded.');
            //});
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4) {
                    console.log(XHR.status);
                }
            };
            // 定义发生错误时执行的操作
            XHR.addEventListener('error', function (event) {
                alert('Oups! Something goes wrong.');
            });

            // 设置请求地址和方法
            XHR.open('POST', 'http://192.168.16.11:3000/todo');
            //XHR.setRequestHeader("Content-Type","application/json");
            // 发送这个formData对象,HTTP请求头会自动设置
            XHR.send(TODOjson);
        }
    }
};
//加载页面时将localStorage中内容显示出来
function load() {
    $(function()
    {
        $("#buttonn").click(function () {
            $.get("http://192.168.16.11:3000/todo",{
                title:$("#newLable").val(),
                time:$("#newTime").val(),
                content:$("content").val()
            },function(data,textStatus){
                    var time = data.time;
                    var title = data.title;
                    var txtHTML = "<li>"+time+"-"+title+"</li>";
                    $("#add").html(txtHTML);
                },"json");
        });
    });
    //var arr = JSON.parse(xhr.responseText);
    //for (var i = 0; i < arr.length; i++) {
    //    var hiLable = arr[i].time + "-" + arr[i].title;
    //    var newLable = document.createElement("li");
    //    var node = document.createTextNode(hiLable);
    //    newLable.appendChild(node);
    //
    //    var element = document.getElementById("add");
    //    element.appendChild(newLable);
    //    newLable.setAttribute("content", arr[i].content);
    //}
    ////点击li标签可以在右边方框显示详细内容
    //var li = document.getElementsByTagName("li");
    //for (var j = 0; j < li.length; j++) {
    //    li[j].index = j;
    //    li[j].onclick = function () {
    //        var str = document.getElementsByTagName('li')[this.index].innerText;
    //        var arr = str.split("-");
    //        var time = arr[0];
    //        var lable1 = arr[1];
    //        var neirong = li[this.index].getAttribute("content");
    //
    //        document.getElementById('content').value = neirong;
    //        document.getElementById("newLable").value = lable1;
    //        document.getElementById("newTime").value = time;
    //    };
    //}
}

var li = document.getElementsByTagName("li");
var parent = document.getElementById("add");
load();
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
    //再把str存入localStorage
    var str = JSON.stringify(storage);
    localStorage.setItem("key", str);
}

