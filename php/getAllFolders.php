<?php
$allDirs = array();
$dir = new DirectoryIterator("../data");
foreach ($dir as $fileinfo) {
    if ($fileinfo->isDir() && !$fileinfo->isDot()) {
        array_push($allDirs, $fileinfo->getFilename());
    }
}
echo(json_encode($allDirs));