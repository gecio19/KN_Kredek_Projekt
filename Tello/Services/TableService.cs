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

            result.Add(_table);
        }


        return result;
    }
}


public interface ITableService
{
    public int Create(int id, TableDto table);

    public IEnumerable<TableDto> GetAll(int id);


}