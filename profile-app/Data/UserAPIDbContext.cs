using profile_app.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace profile_app.Data
{
    public class UserAPIDbContext : DbContext
    {
        public UserAPIDbContext(DbContextOptions<UserAPIDbContext> options) : base(options)
        {
        }

        public DbSet<User> tbl_user { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.userid);
        }
    }
}
