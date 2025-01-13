using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_ClinicStock.DTOs.Medicine
{
    public class UpdateMedicineDTO
    {
        public string Name { get; set; }
        public decimal Milligram { get; set; }
        public string Packaging { get; set; }
        public int Amount { get; set; }
    }
}