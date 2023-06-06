﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Tello.Models;
using Tello.Services;

namespace Tello.Controllers
{


    [Route("api/WorkSpace")]
    public class WorkSpaceController : ControllerBase
    {
        private readonly ITableService _tableService;

        public WorkSpaceController(ITableService tableService)
        {
            _tableService = tableService;
        }



        [HttpPost("NewTable")]
        public ActionResult CreateTable([FromHeader]int userId, [FromBody] TableDto table)
        {
            var result = _tableService.Create(userId, table);


            if(result == -1)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ModelState);
            }

            return Ok();
        }


        [HttpGet("GetAll")]
        public ActionResult GetAll([FromHeader] int userId)
        {
            var result = _tableService.GetAll(userId);

            return Ok(result);
        }







    }
}
