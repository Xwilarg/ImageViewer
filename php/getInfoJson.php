<?php
if (strpos($_GET['folder'], "..") !== false)
{
    http_response_code(400);
}
else
{
    echo(file_get_contents("../data/" . $_GET['folder'] . "/info.json"));
}