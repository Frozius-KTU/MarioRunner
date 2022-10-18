using Microsoft.EntityFrameworkCore;

namespace GameAPI.Context;

public class MemoryDbContext : DbContext
{
    public MemoryDbContext(DbContextOptions<MemoryDbContext> options) : base(options)
    {

    }
    public DbSet<MemoryDbContext> Clients { get; set; }
}

