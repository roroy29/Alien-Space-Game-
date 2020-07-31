<?php

$db_user = 'ror29';
$db_pass = 'rj1997';

$db_driver = 'pgsql';
$db_host = 'db.dcs.aber.ac.uk';
$db_name = 'cs25320_19_20_ror29';


$data_source_name = "$db_driver:host=$db_host;dbname=$db_name";


try{
    $myPDO = new PDO($data_source_name, $db_user, $db_pass);

//    echo " connected to database ";

    $getdata = $myPDO -> prepare('SELECT * FROM game_table');
    $getdata-> execute();
    $row = $getdata->fetchAll();
//    echo '<h2>High Scores</h2>
//<table class="table-responsive" width ="70%" border="1" cellpadding="5" cellspacing="5">
//                <tr>
//                <th>Name</th>
//                <th>Score</th>
//                </tr>
//                ';
    if ($row) {
        echo "High Scores ";
//        echo ' ';
        foreach ($row as $user) {
            echo "Name:- ", $user["name1"], " " , "Score:- ", $user["score1"];
            break;
        }
    }
}catch(PDOException $e) {
    echo "something wrong";
    echo $e -> getMessage();
    return NULL;
}
