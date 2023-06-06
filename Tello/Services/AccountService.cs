using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tello.Entity;
using Tello.Models;

namespace Tello.Services;

public class AccountService : IAccountService
{
    private readonly TelloDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AccountService(TelloDbContext context, IPasswordHasher<User> passwordHasher)
	{
		_context = context;
        _passwordHasher = passwordHasher;
    }

    public void RegisterUser(RegisterUserDto dto)
    {
        var newUser = new User()
        {
            Email = dto.Email,
            RoleId = 1
            //RoleId = dto.RoleId,
        };

        var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
        newUser.PasswordHash = hashedPassword;

        _context.Users.Add(newUser);
        _context.SaveChanges();
    }

    public int LoginUser(LoginDto dto)
    {
        var user = _context.Users
            .Include(u => u.Role)
            .FirstOrDefault(u => u.Email == dto.Email);
        if (user is null)
        {
            return 0;
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

        if (result == PasswordVerificationResult.Failed)
        {
            return 0;
        }
        return user.Id;
    }







}







public interface IAccountService
{
    public void RegisterUser(RegisterUserDto dto);
    public int LoginUser(LoginDto dto);


}