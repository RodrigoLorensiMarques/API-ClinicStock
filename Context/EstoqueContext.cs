using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API___Clinica_Estoque.Entities;
using Microsoft.EntityFrameworkCore;

namespace API___Clinica_Estoque.Context
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