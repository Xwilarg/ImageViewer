<?php
$allDirs = array();
$dir = new DirectoryIterator("../data");
foreach ($dir as $fileinfo) {
    if ($fileinfo->isDir() // Remove everything that isn't a directory
    && $fileinfo->getFilename()[0] !== '.') // Remove all hidden folders
    {
        array_push($allDirs, $fileinfo->getFilename());
    }
}
echo(json_encode($allDirs));