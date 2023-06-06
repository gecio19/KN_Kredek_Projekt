using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tello.Entity;
using Tello.Models;

namespace Tello.Services;

public class TableService : ITableService
{
    private readonly TelloDbContext _dbContext;

    public TableService(TelloDbContext dbContext)
	{
        _dbContext = dbContext;
    }



    public int Create(int id, TableDto table)
    {
        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id == id);

        if (user is null) return -1;

        Table _table = new Table();
        _table.User = user;
        _table.Name = table.Name;
        _table.Theme= table.Theme;

        _dbContext.Tables.Add(_table);
        _dbContext.SaveChanges();

        return _table.Id;
    }

    public int DeleteTable(int tableid, int userId)
    {
        var user = _dbContext
          .Users
          .Include(c => c.Tables)
          .FirstOrDefault(u => u.Id == userId);

        if (user is null) return -1;


        var tablicka = _dbContext.Tables.FirstOrDefault(x => x.Id == tableid);
        _dbContext.Tables.Remove(tablicka);
        _dbContext.SaveChanges();


        return 1;
    }

    public IEnumerable<TableDto> GetAll(int id)
    {
        var user = _dbContext
            .Users
            .Include(c=> c.Tables)
            .FirstOrDefault(u => u.Id == id);

        if (user is null) return new List<TableDto>();


        List<TableDto>  result = new List<TableDto>();

        foreach (var item in user.Tables)
        {
            TableDto _table = new TableDto();
            _table.Name = item.Name;
            _table.Theme = item.Theme;
            _table.Id= item.Id;
            result.Add(_table);
        }


        return result;
    }

    public TableDto GetSingle(int tableid, int userId)
    {
        var user = _dbContext
          .Users
          .Include(c => c.Tables)
          .FirstOrDefault(u => u.Id == userId);

        if (user is null) return new TableDto() ;
        else
        {
            var tablicka = _dbContext.Tables.FirstOrDefault(x => x.Id == tableid);

            TableDto result = new TableDto()
            {
                Name = tablicka.Name,
                Theme = tablicka.Theme
            };
            return result;

        }
    }





    public IEnumerable<Card> GetCards(int tableid , int userId)
    {
        var user = _dbContext
         .Users
         .Include(c => c.Tables)
         .FirstOrDefault(u => u.Id == userId);

        if (user is null) return new List<Card>();



        throw new NotImplementedException();
    }

   

    public int UpdateTableTheme(int tableid, string themName)
    {

        var table = _dbContext
         .Tables
         .FirstOrDefault(u => u.Id == tableid);
        if (table is null) return -1;

        table.Theme = themName;

        _dbContext.SaveChanges();

        return 1;
    }
}


public interface ITableService
{
    public int Create(int id, TableDto table);
    public TableDto GetSingle(int tableid, int userId);

    public IEnumerable<TableDto> GetAll(int id);

    public IEnumerable<Card> GetCards(int tableid, int userId);

    public int DeleteTable(int tableid, int userId);

    public int UpdateTableTheme(int tableid, string themName);

}