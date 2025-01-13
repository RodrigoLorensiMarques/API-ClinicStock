using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ClinicStock.DTOs.Material
{
    public class UpdateMaterialDTO
    {
        public string Name { get; set; }
        public string Packaging { get; set; }
        public int Amount { get; set; }
    }
}