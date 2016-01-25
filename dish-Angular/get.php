<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Headers: x-requested-with,content-type');


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
$rs = $conn->query("SELECT * FROM `rigoudish`");
$rs->setFetchMode(PDO::FETCH_ASSOC);
$result_arr = $rs->fetchAll();

$return_json=json_encode($result_arr);
print_r ($return_json);
?>
