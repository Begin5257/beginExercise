/**
 * Created by Beginning on 2015/12/4.
 */
//���������������
function emptyAll(){
    document.getElementById("form1").reset();
}
//�����ťʱ��������ӵ�localStorage�����li��ǩ������ʾ
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
        //�˴�����Ҫ��addArr�����л�
        //var addArr = JSON.stringify(addJSON);
        liStatus();
        console.log(addJSON);
        console.log(js);
        //��addArr push��js
        js.push(addJSON);
        var json = JSON.stringify(js);
        localStorage.setItem("key",json);
    }

};
//���li��ǩ��li��ǩ��ϸ������ʾ�ڱ����
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

//����ҳ��ʱ��localStorage��������ʾ����
function load(){
    var storage = localStorage.getItem("key");
    var storageArr = JSON.parse(storage);
    console.log(storageArr);
    //ʹ��storageArr[i].timeʱ����Ӧ���Ƕ���
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
//���ȫ��localStorage��ȫ����¼
function removeAll(){
    var li = document.getElementsByTagName("li");
    var parent = document.getElementById("add");
    var k = li.length;
    console.log(k);
    localStorage.clear();
    //���li��ǩʱi�Ŀ��Ʋ�������ʹ�ö�̬��li.length
    //kֵ����ʱ�𽥴������濪ʼɾ��Ԫ��
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
    //��li��ѡ��ʱ,�ı�������ɫ��״̬
    //����һ�±�״̬
    //liStatus();
    var li = document.getElementsByTagName("li");
    var storage = JSON.parse(localStorage.getItem("key"));
    for (var j = li.length-1; j >0; j--) {
        if (li[j].selected) {
            parent.removeChild(li[j]);
            //��i-1��λ��ɾ��һ��Ԫ��
            storage.splice(j-1, 1);
            //��һ��ѭ��֮ǰ�ٴμ��״̬
            liStatus();
        }
    }
    console.log(storage);
    //�ٰ�str����localStorage
    var str = JSON.stringify(storage);
    localStorage.setItem("key", str);
}
selectRemove();

