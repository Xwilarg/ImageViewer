let availableFolders = [];

let http = new XMLHttpRequest(); // Get all available folders
http.open("GET", "php/getAllFolders.php", true);
http.onreadystatechange = function ()
{
    if (this.readyState === 4 && this.status === 200) {
        JSON.parse(this.responseText).forEach(e => {
            availableFolders.push(e);
        });

        let dir = new URL(window.location.href).searchParams.get("dir");

        if (dir === null || !availableFolders.includes(dir)) // No dir parameter or an invalid one
        {
            let str = "";
            availableFolders.forEach(e => {
                str += '<a href="' + window.location.origin + '?dir=' + e + '">' + e + '</a><br/>';
            });
            document.getElementById("menu").innerHTML = str;
        }
        else
        {
            http = new XMLHttpRequest(); // Get all available files
            http.open("GET", "php/getAllImages.php?folder=" + dir, true);
            http.onreadystatechange = function ()
            {
                if (this.readyState === 4 && this.status === 200) {
                    let str = "";
                    JSON.parse(this.responseText).forEach(e => {
                        let image = window.location.origin + '/data/' + dir + '/' + e;
                        str += '<a data-lightbox="viewer" href="' + image + '"><img src="' + image + '"/></a>';
                    });
                    document.getElementById("menu").innerHTML = str;
                }
            };
            http.send(null);
        }
    }
};
http.send(null);