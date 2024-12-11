using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API___Clinica_Estoque.Entities
{
    public class Medicamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Miligrama { get; set; }
        public string Embalagem { get; set; }
        public int Quantidade { get; set; }
    }
}