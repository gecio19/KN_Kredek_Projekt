using Microsoft.AspNetCore.Mvc;
using Tello.Entity;
using Tello.Models;
using Tello.Services;

namespace Tello.Controllers;

[Route("api/Card/{tableid}")]
public class CardController : ControllerBase
{
    private readonly ICardService _cardService;

    public CardController(ICardService cardService)
    {
        _cardService = cardService;
    }

    [HttpPost("NewCard")]
    public ActionResult Create([FromRoute]int tableid, [FromHeader]int userId, [FromBody] CardDto card)
    {

        var result = _cardService.AddCard(tableid, userId, card);

        if (result == -1)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }

        return Ok(result);
    }

    [HttpPost("~/Api/Card/NewCardDetail")]
    public ActionResult CreateCardDetail([FromHeader] int cardId, [FromBody] DetailDto card)
    {

        var result = _cardService.AddCardDetail(cardId, card);

        if (result == -1)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }

        return Ok(result);
    }


    [HttpDelete("~/api/Card/DeleteCard")]
    public ActionResult Delete([FromHeader]int cardId)
    {

        var result = _cardService.DeleteCard(cardId);
        if (result == -1)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }

        return Ok(result);
    }

    [HttpGet("GetAll")]
    public ActionResult GetAll([FromRoute] int tableid, [FromHeader] int userId)
    {
        var result = _cardService.GetAll(tableid, userId);
        return Ok(result);
    }


    [HttpPut("~/api/Card/UpdateTask")]
    public ActionResult UpdateTask([FromHeader] int cardId,[FromBody] TaskUpdateDto _dto)
        {
        var result = _cardService.TaskUpdate(cardId, _dto);
        if (result == -1)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }
        return Ok(result);
    }


    [HttpPut("UpdateTableName")]
    public ActionResult UpdateTableName([FromRoute] int tableid, [FromBody] string newName)
    {
        var result = _cardService.UpdateTableName(tableid, newName);
        if (result == -1)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }
        return Ok(result);
    }


    [HttpPut("UpdateCardName")]
    public ActionResult UpdateCardName([FromRoute] int tableid, [FromBody] CardUpdateDto _dto)
    {
        var result = _cardService.UpdateCardName(tableid, _dto);
        if (result == -1)
        {
          return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }
        return Ok(result);
    }

    [HttpPost("~/api/Card/TaskDetail")]
    public string TaskDetail([FromHeader] int cardId, [FromBody] TaskUpdateDto _dto)
    {
        var result = _cardService.TaskDetail(cardId, _dto);

        if (result is null)
        {
            return string.Empty;
            //return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }
        return result;
    }


    [HttpDelete("~/api/Card/TaskDelete")]
    public ActionResult TaskDelete([FromHeader] int cardId, [FromBody] TaskUpdateDto _dto)
    {
        var result = _cardService.TaskDelete(cardId, _dto);
        if (result == -1)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ModelState);
        }
        return Ok();
    }

}
