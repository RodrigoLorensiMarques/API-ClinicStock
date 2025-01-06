using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_ClinicStock.Context;
using API_ClinicStock.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Api_ClinicStock.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MedicineController : ControllerBase
    {
        private readonly StockContext _context;

        public MedicineController(StockContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create (Medicine medicine)
        {
            _context.Medicines.Add(medicine);
            _context.SaveChanges();
            return Ok(medicine);
        }
        

        [HttpGet("{Id}")]
        public IActionResult  GetById (int Id)
        {
            var medicineDb = _context.Medicines.Find(Id);

            if (medicineDb == null)
            {
                return NotFound("Esse medicamento não existe no estoque! ");
            }

            else
            {
                return Ok(medicineDb);
            }
        }

        [HttpGet("name")]
        public IActionResult GetByName(string name)
        {
            var medicineDb = _context.Medicines.Where(x => x.Name.Contains(name));

            if (medicineDb.IsNullOrEmpty())
            {
                return NotFound("Esse medicamento não existe no estoque! ");
            }

            else 
            {
                return Ok(medicineDb);
            }
        }
        

        [HttpGet ("GetAll")]
        public IActionResult GetAll()
        {
            var medicinesDb = _context.Medicines.Where(x => x.Name.Contains(""));
            return Ok(medicinesDb);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete (int Id)
        {
            var medicineDb = _context.Medicines.Find(Id);

            if (medicineDb == null)
            {
                return NotFound("Esse medicamento não existe no estoque! ");
            }

            else
            {
                _context.Medicines.Remove(medicineDb);
                _context.SaveChanges();
                return Ok("Medicamento foi deletado do estoque! ");
            } 
        }

        [HttpPut]
        public IActionResult Update (int Id, Medicine medicine)
        {
            var medicineDb = _context.Medicines.Find(Id);

            if (medicineDb == null)
            {
                return NotFound("Esse medicamento não existe no estoque! ");
            }

            else
            {
                medicineDb.Name = medicine.Name;
                medicineDb.Milligram = medicine.Milligram;
                medicineDb.Packaging = medicine.Packaging;
                medicineDb.Amount = medicine.Amount;

                _context.SaveChanges();
                return Ok(medicineDb);
            }
        }
    }
}