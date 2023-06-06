using Microsoft.EntityFrameworkCore;
using Tello.Models;

namespace Tello.Entity
{
    public class TelloDbContext: DbContext
    {
        public TelloDbContext(DbContextOptions<TelloDbContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Relacje jeden do wielu
            modelBuilder.Entity<User>()
                .HasMany(c => c.Tables)
                .WithOne(e => e.User);

            modelBuilder.Entity<Table>()
                .HasMany(c => c.Cards)
                .WithOne(e => e.Table);

            modelBuilder.Entity<Card>()
                .HasMany(c => c.Details)
                .WithOne(e => e.Card);
        }


        public DbSet<Detail> Details { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Image> Images{ get; set; }
    }
}
