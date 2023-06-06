const url_loadTable = "https://localhost:7084/api/Card/";

const url_deleteTable = "https://localhost:7084/api/Workspace/";

let number = "";

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      LoadTableTheme();
      LoadTables();
      var TableName = localStorage.getItem("ActualTable");
     document.querySelector("body > div > div.fixed-div > h2 > textarea").textContent = TableName;
    
      }
}






//#region HttpMethods_ASync
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

  async function asynDeleteTable(url = "", userId = "") {
    const response = await fetch(url, {
      method: "Delete", 
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

  async function createCard(url = "", userId = "",data = {}) {
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

  async function asynDeleteCard(url = "", cardId = "") {
    const response = await fetch(url, {
      method: "Delete", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "cardId": cardId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
    });
    return response; 
  } 
  async function asynCreateDetail(url = "", cardId = "",data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "cardId": cardId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response.json(); 
  } 

  async function getListlength(url = "") {
    const response = await fetch(url, {
      method: "GET", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
    });
    return response; 
  }  

  async function asynEditTask(url = "", cardId = "",data = {}) {
    const response = await fetch(url, {
      method: "PUT", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "cardId": cardId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response.json(); 
  } 

  async function getDetail(url = "", cardId = "",data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "cardId": cardId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response; 
  } 

  async function asynDeleteTask(url = "", cardId = "",data = {}) {
    const response = await fetch(url, {
      method: "DELETE", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "cardId": cardId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response; 
  } 

  async function asynRenameTable(url = "",data = {}) {
    const response = await fetch(url, {
      method: "PUT", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response.json(); 
  } 

  async function asynUpdateTableBack(url = "", tableId = "",data = "") {
    const response = await fetch(url, {
      method: "PUT", 
      mode: "cors",
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "tableId": tableId,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    return response; 
  } 
  
  async function asyntableDetail(url = "", userId = "") {
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
      referrerPolicy: "no-referrer"
    });
    return response; 
  } 


//#endregion



//#region HttpHelpers

function createCardHelper(x)
{
const url_createCard = "https://localhost:7084/api/Card/";

    var _url = window.location.search.split("=");
    var _tableId = _url[1];
    var _cookies = document.cookie.split('=');
    var _userId = _cookies[0];
    var bodyContent = x;
  console.log(x);

   let cos = createCard(url_createCard+_tableId+'/NewCard',_userId,
    {
      "Name": bodyContent
    }
    ).then((response) => {
      console.log(response.body);
      return response.json();
    }).then((json) =>{
      var sortdiv = $('#sortablelist')[0];  //Łopatologia
      var sortdivLength = $(sortdiv).children().length;
      var rElement =  $(sortdiv).children()[sortdivLength-2];
      $(rElement).attr("id", json);


    }); 
}

function deleteCardHelper(x)
{
const url_DeleteCard = "https://localhost:7084/api/Card/DeleteCard";

asynDeleteCard(url_DeleteCard,x);
}
function createDetailHelper(cardId,detailName)
{
  const url_CreateDetail = "https://localhost:7084/api/Card/NewCardDetail";

asynCreateDetail(url_CreateDetail,cardId,
  {
    "Name": detailName,
  })
}






//#endregion



//#region Functions

function NewCard(x)
{
taskTemp = '<div class="portlet" onclick="Modal_POP_Task(this)">'+
'<div class="portlet-header">'+
  '<h5>'+
    x.value+
  '</h5>'+
  '</div>'+
'</div>';

NewTaskTemp = '<textarea placeholder="Nowa karta" style="border: none;  resize: none; border-radius: 8px;" onchange="NewCard(this)"></textarea>'
var ActualCard = $(x).parent()[0];
//Dodanie 

var cardId = $(ActualCard)[0].id;
createDetailHelper(cardId,x.value);
$(ActualCard).append(NewTaskTemp);
$(x).replaceWith(taskTemp);

}
function deleteCard(x)
{
  var elemToDelete = $(x).closest('div')[0];
  console.log(elemToDelete.id);
  deleteCardHelper(elemToDelete.id);
  $(elemToDelete).remove();


}
  function LoadTables()
  {
        var _url = window.location.search.split("=");
        var _tableId = _url[1];
        var _cookies = document.cookie.split('=');
        var _userId = _cookies[0];

        console.log(url_loadTable+_tableId+"/GetAll");

        getData(url_loadTable+_tableId+"/GetAll",
            _userId
        ).then((response)=>{
          console.log(response);

          response.forEach(element => {
              
            var result =  
                        '<div class="card column card-body m-2" style="max-width: 5rem;"' + "id=" +element.id + '>'+
                            '<h2>'+
                              '<textarea style="resize: none ;max-width: 17rem  ;border: none; background-color: rgb(241, 242, 244)" spellcheck="false" onchange="changeCardName(this)">'+element.name +'</textarea>'+
                            '</h2>'+
           '<svg  id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"        xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear cardIcon" viewBox="0 0 16 16" >'+
                            '<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>'+
                            '<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>'+
                          '</svg>'+
                            '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">'+
                                '<li><a class="dropdown-item" onclick="deleteCard(this)" href="#!">Usuń Kartę</a></li>'+
                            '</ul>';
          
                  element.details.forEach(subelement => {
                      result += 
                                '<div class="portlet" onclick="Modal_POP_Task(this)">'+
                                '<div class="portlet-header">'+
                                    '<h5>'+
                                    subelement.name +
                                    '</h5>'+
                                '</div>'+
                              '</div>';
                      });

                   result +='<textarea placeholder="Nowa karta" style="border: none;  resize: none; border-radius: 8px;" onchange="NewCard(this)"></textarea>'+
                    ' </div>';
                $("#sortablelist").append(result);
                MakeSortAble();
          });
          NewEmptyListTemp();
        });
}
new Sortable(sortablelist, {
  animation: 150,
  ghostClass: 'sortable-ghost'
});
  function MakeSortAble() {
    ///Drag-Drop
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      cancel: ".portlet-toggle",
      placeholder: "portlet-placeholder ui-corner-all"
    });
 
    $( ".portlet")
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
      .find( ".portlet-header")
      .addClass( "ui-widget-header ui-corner-all")

    $( ".portlet-toggle").click(function(){
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });
  };
  function DeleteTable()
  {
    var _url = window.location.search.split("=");
    var _tableId = _url[1];
    var _cookies = document.cookie.split('=');
    var _userId = _cookies[0];

    console.log(url_deleteTable+_tableId);

    asynDeleteTable(url_deleteTable+_tableId,_userId);
    window.location = '/Pages/Workspace.html';



  }
function NewList(x)
  {
    listName = x.children[0].children[0].children[0].value;

    let cos = createCardHelper(listName);


    listTemp = '<div class="card column card-body m-2" style="max-width: 5rem;">'+
    '<h2>'+
      '<textarea style="resize: none ;max-width: 17rem  ;border: none; background-color: rgb(241, 242, 244)" spellcheck="false" onchange="changeCardName(this)">' + listName + '</textarea>'+
    '</h2>'+
    '<svg  id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"        xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear cardIcon" viewBox="0 0 16 16" >'+
                  '<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>'+
                  '<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>'+
                '</svg>'+
                  '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">'+
                      '<li><a class="dropdown-item" onclick="deleteCard(this)" href="#!">Usuń Kartę</a></li>'+
                  '</ul>'+
    '<textarea placeholder="Nowa karta" style="border: none;  resize: none; border-radius: 8px;" onchange="NewCard(this)"></textarea>'+
  '</div>';
 
$(x).replaceWith(listTemp);
NewEmptyListTemp();





  }
function NewEmptyListTemp()
{
  newListTamplate = 
  '<div class="portle" onchange="NewList(this)">'+
  '<div class="portlet-header">'+
    '<h5>'+
      '<textarea style="resize: none ;max-width: 17rem  ;border: none; background-color: rgb(255, 255, 255)" spellcheck="false" placeholder="Nowa Lista"></textarea>'+
    '</h5>'+
    '</div>'+
  '</div>';

    var elem  = $('#sortablelist')[0];
    $(elem).append(newListTamplate);
    MakeSortAble();
}
//#endregion

//#region  Update Functions

function UpdateTask(x)
{
let cardId = $(x).attr("cardId")
var taskName = $("#TaskModalName").val();
var oldName = $("#TaskModalName").attr("placeholder")
var taskDes = $("#TaskModalDes").val();

$("#TaskModalName").attr("placeholder",taskName)


const url_CreateDetail = "https://localhost:7084/api/Card/UpdateTask";

asynEditTask(url_CreateDetail,cardId,
  {
      "oldName": oldName,
      "taskName": taskName,
      "taskDesc": taskDes
  })

}

function DeleteTask(x)
{
  let cardId = $('#TaskModal').attr("cardId")
  var oldName = $("#TaskModalName").attr("placeholder")

  console.log(cardId);
  const url_DeleteDetail = "https://localhost:7084/api/Card/TaskDelete";

  asynDeleteTask(url_DeleteDetail,cardId,
    {
      "oldName": oldName,
    });
    window.location.reload();
}

function changeTableName(x)
{
  var newTableName = x.value;
  var _url = window.location.search.split("=");
  var _tableId = _url[1];

  const url_changeTableName = "https://localhost:7084/api/Card/";

  asynRenameTable(url_changeTableName+_tableId+"/UpdateTableName",
    newTableName)
    
    localStorage.setItem("ActualTable", newTableName);
}


function changeCardName(x)
{
  var oldName = x.textContent;
  console.log(oldName);
  var newName = $(x).val();
  console.log(newName);

  var newTableName = x.value;
  var _url = window.location.search.split("=");
  var _tableId = _url[1];

  const url_changeCardName = "https://localhost:7084/api/Card/";
  
  asynRenameTable(url_changeCardName+_tableId+"/UpdateCardName",
  {
    "oldName": oldName,
    "newName": newName
  });
  
}




function LoadTableTheme()
{
        var _url = window.location.search.split("=");
        var _tableId = _url[1];
        var _cookies = document.cookie.split('=');
        var _userId = _cookies[0];
        let url_tableDetail = "https://localhost:7084/api/Workspace/";



        asyntableDetail(url_tableDetail+_tableId, _userId)
        .then((response) => response.json())
        .then((json) => 
        {
          console.log(json.theme);

          let url_getBlob = "https://localhost:7084/api/BlobStoreg/GetBlobFile";
          let uri = "https://telloobiektowe.blob.core.windows.net/blobcontainertello/";
          getDetail_Blob(url_getBlob,uri+json.theme)
          .then((response) => response.blob())
          .then((myBlob) => 
                      {
                      const objectURL = URL.createObjectURL(myBlob);
                      
                      $("#bodyBackGround").css("background-image", "url(" + objectURL + ")");
      
                      });
        });
}



//#endregion




//#region modal function:

function Modal_POP()
{


    $('#myModal').modal('show');
}
function Hide_Modal()
{
    $('#myModal').modal('hide');;

}
function Modal_POP_Task(x)
{

//Dodanie id karty do modala

var task = $(x).parent()[0];
var cardID = $(task).attr("id");



//Wyświetlanie nazwy taska w modalu
    var element = $(x).children()[0];
    var taskHeader = $(element).children()[0];
    var taskName = $(taskHeader).text();
    var TaskModalName = $("#TaskModalName")[0];
    $(TaskModalName).val(taskName);
    $(TaskModalName).attr("placeholder", taskName);
    $('#TaskModal').attr("cardId", cardID);

    //Pobranie des z bazy i wprowadzenie do Text Area
    const url_taskDetail = "https://localhost:7084/api/Card/TaskDetail";
    var oldName = $("#TaskModalName").attr("placeholder")

    
    getDetail(url_taskDetail,cardID,
      {
        "oldName": oldName
      }
    ).then(response=>response.text())
    .then(data=>
      {
        console.log(data); 
        $('#TaskModalDes').val(data);
      })

    $('#TaskModal').modal('show');
}
function Hide_Modal_Task()
{
    $('#TaskModal').modal('hide');
    window.location.reload();
}




function ModalBackGround_POP()
{
  let modalchilds = document.getElementById("modal_background-body").children.length;
  
  if(modalchilds == 0)
  {
   BlobRepeat();
  }




  $('#BackgroundModal').modal('show');

}




function changeBackground(x)
{
var bg_source = x.src;

const url_deleteTable = "https://localhost:7084/api/Workspace/UpdateTableTheme";

var _url = window.location.search.split("=");
var _tableId = _url[1];
asynUpdateTableBack(url_deleteTable, _tableId, x.name);
$("#bodyBackGround").css("background-image", "url(" + bg_source + ")");

}




//#endregion




//#region  Blobs Operation


async function getDetail_Blob(url = "", path = "") {
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



function BlobRepeat()
{
const url_getBlobNames = "https://localhost:7084/api/BlobStoreg/ListBlobs";
getAllBlobsNames(url_getBlobNames).then((response) => response.json())
.then((myBlob) => {
    myBlob.forEach(element => 
        {
          GetSingleBlob(element);
        });
});
}



function GetSingleBlob(name)
{
    const url_getBlob = "https://localhost:7084/api/BlobStoreg/GetBlobFile";
    let uri = "https://telloobiektowe.blob.core.windows.net/blobcontainertello/";
    getDetail_Blob(url_getBlob,uri+name)
    .then((response) => response.blob())
    .then((myBlob) => 
                {
                const objectURL = URL.createObjectURL(myBlob);

                imgtemp = 
                '<button type="submit" style="border: none; ">'+
                '<img src="'+ objectURL+'" style="width: 15rem; height: 10rem;" alt="buttonpng" onclick="changeBackground(this)" name="'+ name + '" />'+
              '</button>';

                _imgtemp = '<img class="img" src="'+objectURL+'" >';

                console.log(imgtemp);
                var _body = $("#modal_background-body")[0];
                $(_body).append(imgtemp);
                });
}













//#endregion