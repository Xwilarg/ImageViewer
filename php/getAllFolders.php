<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$allDirs = array();
$dir = new DirectoryIterator("../data");
foreach ($dir as $fileinfo) {
    if ($fileinfo->isDir() && !$fileinfo->isDot()) {
        array_push($allDirs, $fileinfo->getFilename());
    }
}
echo(json_encode($allDirs));