using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // This exposes a DbSet<Book> which maps to the Books table in SQLite
        public DbSet<Book> Books { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // (Optional) Seed some initial data
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    Title = "The Pragmatic Programmer",
                    Author = "Andy Hunt, Dave Thomas",
                    Genre = "Software",
                    PublishedDate = new DateTime(1999, 10, 30),
                    Rating = 5
                }
            );
        }
    }
}
