using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_ClinicStock.Data.Mappings;
using API_ClinicStock.Entities;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicStock.Context
{
    public class StockContext : DbContext
    {
        public StockContext (DbContextOptions<StockContext> options) :base (options)
        {

        }

        public DbSet<Medicine>Medicines { get; set; }
        public DbSet<Material> Materials { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MaterialMap());
            modelBuilder.ApplyConfiguration(new MedicineMap());
        }
    }
}