<?php
if (strpos($_GET['folder'], "..") !== false)
{
    http_response_code(400);
}
else
{
    $allDirs = array();
    $dir = new DirectoryIterator("../data/" . $_GET['folder']);
    foreach ($dir as $fileinfo) {
        if (!$fileinfo->isDir() && !$fileinfo->isDot()) {
            array_push($allDirs, $fileinfo->getFilename());
        }
    }
    echo(json_encode($allDirs));
}