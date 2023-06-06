

const url_register = "https://localhost:7084/api/account/register";
const url_login = "https://localhost:7084/api/account/login";
const alert_showTime = 2500;

let Userid;

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
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
    return response; 
  }  





  function Register()
  {
  let form = document.forms["singUp-form"];
  let email = form[0].value;
  let password = form[1].value;
  let re_password = form[2].value;

  postData(url_register, 
    { 
      "Email": email,
      "Password": password,
      "ConfirmPassword": re_password
    }
  ).then((response) => {
    


      if(response.status == 400) // błąd
      {
        console.log("cos zle");
        Show_Error();
      }
      else // bez błędu
      {
       // window.location.href ="Workspace.html"
        console.log("GITARA");
        


      }
  });
}


function Login()
{
   let form = document.forms["Login-form"];
   let email = form[0].value;
   let password = form[1].value;

   postData(url_login, 
    { 
      "Email": email,
      "Password": password
    }
  ).then((response) => {


  




      if(response.status == 400) // błąd
      {
        console.log("cos zle");
        Show_Error();
      }
      else 
      {
        response.json().then(json => {
      
          console.log(json);
          document.cookie = json + "=User_Id";


        });

        window.location.href ="Workspace.html";
        console.log("GITARA");
      }
  });
}
  
 
function Show_Error()
{
       var _error = document.getElementById("Error_Alert");
       _error.style.visibility = "visible";
        console.log(_error);
       setTimeout(Hide_Error, alert_showTime);
}

function Hide_Error()
{
  var _error = document.getElementById("Error_Alert");
  _error.style.visibility = "hidden";
}