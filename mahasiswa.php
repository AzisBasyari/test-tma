<?php

require_once "koneksi.php";

header('Access-Control-Allow-Origin: *');

if (function_exists($_GET['function'])) {
    $_GET['function']();
}

function list_mahasiswa()
{
    global $mysqli;

    $query = "CALL listMahasiswa()";

    // $data = array();

    $hasil = $mysqli->query($query);
    while ($row = mysqli_fetch_object($hasil)) {
        $data[] = $row;
    }
    $response = array(
        'status' => 1,
        'message' => 'Success',
        'data' => $data
    );
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>