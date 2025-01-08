using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ClinicStock.Entities
{
    public class Material
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Packaging { get; set; }
        public int Amount { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
    }
}