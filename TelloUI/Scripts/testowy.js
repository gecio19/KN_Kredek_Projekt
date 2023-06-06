async function getDetail(url = "", path = "") {
    const response = await fetch(url, {
      method: "GET", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "path": path,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer"
    });
    return response; 
  } 

  async function getAllBlobsNames(url = "") {
    const response = await fetch(url, {
      method: "GET", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer"
    });
    return response; 
  } 


/*
function Test()
{
    const myImage = document.querySelector("img");
   
    var _body = $("#bodyTest")[0];
    console.log(_body);

    const url_getBlob = "https://localhost:7084/api/BlobStoreg/ListBlobs";    //Kolejna łopatologia
    let uri = "https://telloobiektowe.blob.core.windows.net/blobcontainertello/";



    getAllBlobsNames(url_getBlob).then((response) => response.json())
    .then((myBlob) => {
        myBlob.forEach(element => 
            {
            getDetail(url_getBlob,uri+element)
                .then((response) => response.blob())
                .then((myBlob) => 
                        {
                        const objectURL = URL.createObjectURL(myBlob);
                        imgtemp = '<img class="img" src="'+objectURL+'" >';
                        console.log(imgtemp);

                        var _body = $("#bodyTest")[0];
                        $(_body).append(imgtemp);
                        });
            });
    });

}
*/


function container()
{

    const objectURL = URL.createObjectURL(myBlob);
    console.log(objectURL);


    imgtemp = '<img class="img" src="'+objectURL+'" >';
    console.log(imgtemp);
    var _body = $("#bodyTest")[0];
    $(_body).append(imgtemp);

    myImage.src = objectURL;


}


function Test()
{

const url_getBlobNames = "https://localhost:7084/api/BlobStoreg/ListBlobs";

getAllBlobsNames(url_getBlobNames).then((response) => response.json())
.then((myBlob) => {
    myBlob.forEach(element => 
        {
            TestV2(element);
        });
});

}






function TestV2(x)
{

    const url_getBlob = "https://localhost:7084/api/BlobStoreg/GetBlobFile";
    let uri = "https://telloobiektowe.blob.core.windows.net/blobcontainertello/";
    getDetail(url_getBlob,uri+x)
    .then((response) => response.blob())
    .then((myBlob) => 
                {
                const objectURL = URL.createObjectURL(myBlob);
                imgtemp = '<img class="img" src="'+objectURL+'" >';
                console.log(imgtemp);
                var _body = $("#bodyTest")[0];
                $(_body).append(imgtemp);
                });
}