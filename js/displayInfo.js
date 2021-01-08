let availableFolders = [];

let http = new XMLHttpRequest(); // Get all available folders
http.open("GET", "php/getAllFolders.php", false);
http.onreadystatechange = function ()
{
    if (this.readyState === 4 && this.status === 200) {
        JSON.parse(this.responseText).forEach(e => {
            availableFolders.push(e);
        });
    }  
};
http.send(null);
let dir = new URL(window.location.href).searchParams.get("dir");

if (dir === null || !availableFolders.includes(dir)) // No dir parameter or an invalid one
{
    let str = "";
    availableFolders.forEach(e => {
        str += '<a href="' + window.location.origin + '?dir=' + e + '">' + e + '</a><br/>';
    });
    document.getElementById("menu").innerHTML = str;
}