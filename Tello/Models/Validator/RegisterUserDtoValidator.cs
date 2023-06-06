using FluentValidation;
using Tello.Entity;

namespace Tello.Models.Validator
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {

        public RegisterUserDtoValidator(TelloDbContext dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(6);

            RuleFor(x => x.ConfirmPassword).Equal(e => e.Password);

            RuleFor(x => x.Email)
                .Custom((value, context) =>             /// 2 argumenty (wartosc z pola email, kontekst walidacji)
                {
                    var emailInUse = dbContext.Users.Any(u => u.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });
        }






    }
}
