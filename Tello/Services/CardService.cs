using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Tello.Entity;
using Tello.Models;

namespace Tello.Services;

public class CardService : ICardService
{
    private readonly TelloDbContext _dbContext;

    public CardService(TelloDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public int AddCard(int tableId,int userId,CardDto card)
    {
        var user = _dbContext
            .Users
            .Include(c => c.Tables)
            .FirstOrDefault(u => u.Id == userId);

        if (user is null) return-1;
        var _table = user.Tables.FirstOrDefault(t => t.Id == tableId);
        Card _card = new Card();
       // _card.Id = card.Id;
        _card.Name = card.Name;
        _card.Table = _table;

        _dbContext.Cards.Add(_card);
        _dbContext.SaveChanges();
        return _card.Id;
    }

    public int AddCardDetail(int cardId, DetailDto card)
    {
        var _card = _dbContext
            .Cards
            .Include(c => c.Details)
            .FirstOrDefault(x => x.Id == cardId);
        if (_card is null) return -1;

        Detail _detail = new Detail();
        _detail.Card = _card;
        _detail.Name= card.Name;

        // Descritpion

        _dbContext.Details.Add(_detail);
        _dbContext.SaveChanges();
        return 1;
    }

    public int DeleteCard(int cardId)
    {
        var _card = _dbContext
            .Cards
            .Include(c=> c.Details)
            .FirstOrDefault(x => x.Id == cardId);

        if (_card is null) return -1;

        _dbContext.Remove(_card);
        _dbContext.SaveChanges();

        return 1;
    }

    public IEnumerable<Card> GetAll(int tableId, int userId)
    {
        var user = _dbContext
           .Users
           .FirstOrDefault(u => u.Id == userId);


        if (user != null)
        {
            var _card = _dbContext.Cards
                    .Include(c => c.Details)
                    .Where(u => u.Table.Id == tableId)
                    .ToList();

            return _card;
        }



        throw new NotImplementedException();
    }

   

    public string TaskDetail(int cardId, TaskUpdateDto _dto)
    {
        var card = _dbContext
         .Cards
         .Include(c => c.Details)
         .FirstOrDefault(u => u.Id == cardId);

        if (card is null) return string.Empty;

        var ActualTask = card.Details
            .Where(x => x.Name == _dto.oldName)
            .FirstOrDefault();

        if (ActualTask is null) return string.Empty;

        return ActualTask.Description;
    }

    public int TaskUpdate(int cardId, TaskUpdateDto _dto)
    {
        var card = _dbContext
          .Cards
          .Include(c => c.Details)
          .FirstOrDefault(u => u.Id == cardId);

        if(card is null) return -1;

        var ActualTask = card.Details
            .Where(x=> x.Name == _dto.oldName)
            .FirstOrDefault();

        if (ActualTask is null) return -1;

        ActualTask.Name = _dto.taskName;
        ActualTask.Description = _dto.taskDesc;

        _dbContext.SaveChanges();

        return 1;
    }


    public int TaskDelete(int cardId, TaskUpdateDto _dto)
    {
        var card = _dbContext
          .Cards
          .Include(c => c.Details)
          .FirstOrDefault(u => u.Id == cardId);

        if (card is null) return -1;

        var ActualTask = card.Details
            .Where(x => x.Name == _dto.oldName)
            .FirstOrDefault();

        if (ActualTask is null) return -1;

        _dbContext.Details.Remove(ActualTask);
        _dbContext.SaveChanges();

        return 1;
    }

    public int UpdateTableName(int tableId, string tableName)
    {
        var Table = _dbContext
          .Tables
          .FirstOrDefault(u => u.Id == tableId);

        if (Table is null) return -1;
        Table.Name = tableName;

        _dbContext.SaveChanges();
        return 1;
    }

    public int UpdateCardName(int tableId, CardUpdateDto dto)
    {
        var Table = _dbContext
          .Tables
          .Include(c=> c.Cards)
          .FirstOrDefault(u => u.Id == tableId);
        if (Table is null) return -1;

        var cardUpdate = Table
            .Cards
            .Where(x => x.Name == dto.oldName)
            .FirstOrDefault();

        cardUpdate.Name = dto.newName;

        _dbContext.SaveChanges();
        return 1;
    }
}

public interface ICardService
{
    public int AddCard( int tableId,  int userId, CardDto card);
    public IEnumerable<Card> GetAll( int tableId,  int userId);

    public int DeleteCard(int cardId);

    public int AddCardDetail(int cardId, DetailDto card);

    public string TaskDetail(int cardId, TaskUpdateDto _dto);

    public int TaskUpdate(int cardId, TaskUpdateDto _dto);


    public int TaskDelete(int cardId, TaskUpdateDto _dto);

    public int UpdateTableName(int tableId, string tableName);

    public int UpdateCardName(int tableId, CardUpdateDto dto);



}