async function updateScreenAsync()
{
    let availableFolders = [];

    const resp = await fetch("php/getAllFolders.php");
    const folders = await resp.json();

    folders.forEach(e => {
        availableFolders.push(e);
    });
    availableFolders.sort();

    let dir = new URL(window.location.href).searchParams.get("dir");

    let html = dir === null || !availableFolders.includes(dir) ? getImageFolders(availableFolders) : await getImagesAsync(dir);
    document.getElementById("menu").innerHTML = html;
}

/// Get all the folders
function getImageFolders(availableFolders)
{
    let str = "";
    availableFolders.forEach(e => {
        str += '<a href="' + window.location.origin + '?dir=' + e + '">' + e + '</a><br/>';
    });
    return str;
}

/// Get all the images inside a folder
async function getImagesAsync(dir)
{
    // Get all images
    let resp = await fetch("php/getAllImages.php?folder=" + dir);
    const images = await resp.json();

    // Get information JSON
    resp = await fetch("php/getInfoJson.php?folder=" + dir);
    const tags = await resp.json();

    let str = "";
    images.forEach(e => {
        let filename = e.split('.')[0];

        let info = tags[filename];
        let imageInfo = "";
        if (info !== undefined) { // Information available about the image
            let isNsfw = info.isNsfw === true ? "nsfw" : "";
            let isMeme = info.isMeme === true ? "meme" : "";

            imageInfo = isNsfw + " " + isMeme;
        }
        let image = window.location.origin + '/data/' + dir + '/' + e;
        str += '<a data-lightbox="viewer" href="' + image + '"><img class="' + imageInfo + '" src="' + image + '"/></a>';
    });
    return str;
}

updateScreenAsync();