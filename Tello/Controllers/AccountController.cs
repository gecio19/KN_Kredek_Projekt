using Microsoft.AspNetCore.Mvc;
using Tello.Models;
using Tello.Services;

namespace Tello.Controllers
{

    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


        [HttpPost("register")]
        public ActionResult RegisterUser([FromBody] RegisterUserDto dto)
        {
            var czytrue = !ModelState.IsValid;
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ModelState);
            }


            _accountService.RegisterUser(dto);
            return Ok();
        }


        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginDto dto)
        {
            var check = _accountService.LoginUser(dto);

            if(check == 0) 
            {
                return StatusCode(StatusCodes.Status400BadRequest, ModelState);
            }

            return Ok(check);
        }



    }
}
