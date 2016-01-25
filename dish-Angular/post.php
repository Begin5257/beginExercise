<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods:POST,GET');
//下面这个允许的请求头是必须要加的
header('Access-Control-Allow-Headers: x-requested-with,content-type');
//header('Content-Type: application/json');

$content_type_args = explode(';', $_SERVER['CONTENT_TYPE']);
if ($content_type_args[0] == 'application/json'){
    $dish  = json_decode(file_get_contents('php://input'),true);

    $dsn = 'mysql:host=localhost;dbname=myapp';
    $username ='root';
    $password = '';
    try{
        $conn = new PDO($dsn,$username,$password);
        $conn->query('set names utf8;');
        $conn ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo 'Connection failed:'.$e->getMessage();
    }
    $conn->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
    $name = $dish['name'];
    $category = $dish['category'];
    $price = $dish['price'];
    $url = $dish['url'];
    $query = "INSERT INTO rigoudish (name,category,price,url) VALUES ('{$name}','{$category}','{$price}','{$url}')";
    $conn->query($query);

    $conn = null;

}


?>
