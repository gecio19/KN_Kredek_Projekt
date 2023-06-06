const url_addTable = "https://localhost:7084/api/Workspace/NewTable";
const url_loadTable = "https://localhost:7084/api/Workspace/GetAll";



document.onreadystatechange = function () {
    if (document.readyState == "complete") {

        LoadTables();

        
  }
}

function AddTable()
{
var _name = document.getElementById('Table_Name').value;
var _cookies = document.cookie.split('=');
var _userId = _cookies[0];

console.log(_userId);
console.log(_name);


postData(url_addTable, 
    _userId,
    { 
        "name": _name
    }).then((response)=>
    {
        response.json().then(table_id => {
      
            RedirectToTable(table_id);
        });

    });




    
    Hide_Modal();



}



function NewTheme(fileName)
{
    console.log(fileName);
    const url_Upload = "https://localhost:7084/api/BlobStoreg/UploadBlobFile";
    postTheme(url_Upload,
        {
                "fileName": fileName
        });

}


function LogOut()
{
    deleteAllCookies();
    window.location = '/Pages/index.html';

}


function deleteAllCookies() {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }



function LoadTables()
{
    var _cookies = document.cookie.split('=');
    var _userId = _cookies[0];

    getData(url_loadTable,
        _userId
    ).then((response) =>
{
    response.forEach(element => {


        var result =   '<div class="col mb-5" onclick="">'+
        '<div class="card h-100"  id="' + element.id + '"  onclick="RedirectToTable(this)">'+
            '<div class="card-body p-4">'+
                '<div class="text-center">'+
                   ' <h5 class="fw-bolder">' + element.name  + '</h5>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
                        
               


        $("#TableContainer").append(result);

        console.log(element.name);
    });
console.log(response);
});
}





function RedirectToTable(x)
{
    var TableName = x.children[0].children[0].children[0].innerHTML;
    localStorage.setItem("ActualTable", TableName);

    window.location = '/Pages/Table.html?Id='+ x.id;
}







function Modal_POP()
{
    console.log("TEST");

    $('#myModal').modal('show');
}




function Hide_Modal()
{
    $('#myModal').modal('hide');;

}




async function postData(url = "", userId = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "userId": userId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response; 
  }  

  
  async function getData(url = "", userId = "") {
    const response = await fetch(url, {
      method: "GET", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "userId": userId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
    });
    return response.json(); 
  }  



  async function postTheme(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response; 
  }  