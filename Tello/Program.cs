using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Tello;
using Tello.Entity;
using Tello.Models;
using Tello.Models.Validator;
using Tello.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddFluentValidation();


builder.Services.AddDbContext<TelloDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("TelloDBContext")));


builder.Services.AddScoped<IAccountService,AccountService>();
builder.Services.AddScoped<ITableService,TableService>();

//Haszowanie
builder.Services.AddScoped<IPasswordHasher<User>,PasswordHasher<User>>();

//Validator
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();





// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(opt => opt.AddPolicy("CorsPolicy", builder =>
{
    builder.WithOrigins("http://localhost:5500") //3000
        .AllowAnyMethod()
        .AllowAnyHeader();
}));






var app = builder.Build();


///Sedder
using (var scope = app.Services.CreateScope())
    try
    {
        var scopedContext = scope.ServiceProvider.GetRequiredService<TelloDbContext>();
        Seeder.Initialize(scopedContext);
    }
    catch
    {
        throw;
    }






// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
