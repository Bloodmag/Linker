using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linker.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        //public DbSet<Link> Links { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            :base(options)
        {
            Database.EnsureCreated();
        }
        
    }
}
