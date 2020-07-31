<?php

$name1 = $_POST['name1'];
$score1 = $_POST['score1'];
$db_user = 'ror29';
$db_pass = 'rj1997';

$db_driver = 'pgsql';
$db_host = 'db.dcs.aber.ac.uk';
$db_name = 'cs25320_19_20_ror29';

$data_source_name = "$db_driver:host=$db_host;dbname=$db_name";


    try{
        $myPDO = new PDO($data_source_name, $db_user, $db_pass);
        $myPDO -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        echo " connected to database ";
      $insert = "INSERT INTO game_table (name1, score1 ) VALUES (?,?)";
      $result = $myPDO -> prepare($insert);
      $exe = $result -> execute([$name1, $score1]);

      if($exe){
          echo "data inserted";
      }else{
          "data not inserted";
      }

}catch(PDOException $e) {
    echo "something wrong";
    echo $e -> getMessage();
    return NULL;
    }
