using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ClinicStock.Entities
{
    public class Material
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Embalagem { get; set; }
        public int Quantidade { get; set; }
    }
}