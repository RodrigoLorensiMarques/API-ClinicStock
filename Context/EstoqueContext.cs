using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_ClinicStock.Entities;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicStock.Context
{
    public class EstoqueContext : DbContext
    {
        public EstoqueContext (DbContextOptions<EstoqueContext> options) :base (options)
        {

        }

        public DbSet<Medicamento>Medicamentos { get; set; }
        public DbSet<Material> Materiais { get; set; }

    }
}