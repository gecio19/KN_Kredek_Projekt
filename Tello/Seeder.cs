using Tello.Entity;

namespace Tello
{
    public static class Seeder
    {
        public static void Initialize(TelloDbContext context)
        {
            context.Database.EnsureCreated();
            //your seeding data here
            var Seeder = new TelloSeeder(context);
            Seeder.Seed();

            context.SaveChanges();

        }
    }
}
