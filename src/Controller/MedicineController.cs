using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API_ClinicStock.Context;
using API_ClinicStock.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;

namespace Api_ClinicStock.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MedicineController : ControllerBase
    {
        private readonly StockContext _context;
        private readonly IConnectionMultiplexer _cache;

        public MedicineController(StockContext context, IConnectionMultiplexer cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> Create (Medicine medicine)
        {
            try
            {
                if (medicine.Amount <0)
                {
                    return BadRequest("A quantidade não pode ser negativa!");
                }

                medicine.CreateDate = DateTime.UtcNow;
                _context.Medicines.Add(medicine);
                await _context.SaveChangesAsync();

                var dbCache = _cache.GetDatabase();
                var cacheKey = $"Medicine:{medicine.Id}";
                var medicineSerialized = JsonSerializer.Serialize<Medicine>(medicine);
                await dbCache.StringSetAsync(cacheKey,medicineSerialized,TimeSpan.FromMinutes(10));

                return Ok(medicine);
            }
            catch (Exception)
            {
                return StatusCode(500, "01X50 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }
        
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById (int Id)
        {
            try
            {
                var dbCache = _cache.GetDatabase();
                var cacheKey = $"Medicine:{Id}";

                var medicineCache = await dbCache.StringGetAsync(cacheKey);

                if (!medicineCache.IsNullOrEmpty)
                {
                    var medicine = JsonSerializer.Deserialize<Medicine>(medicineCache);
                    return Ok(medicine);
                }

                var medicineDb = await _context.Medicines.FirstOrDefaultAsync(x => x.Id == Id);

                if (medicineDb == null)
                {
                    return NotFound("Esse medicamento não existe no estoque! ");
                }

                var medicineSerialized = JsonSerializer.Serialize<Medicine>(medicineDb);
                await dbCache.StringSetAsync(cacheKey, medicineSerialized, TimeSpan.FromMinutes(10));
                return Ok(medicineDb);
            }
            catch (Exception)
            {
                return StatusCode(500,"01X51 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

        [HttpGet("name")]
        public async Task<IActionResult> GetByName(string name)
        {
             try
             {
                var dbCache = _cache.GetDatabase();
                var cacheKey = $"Madicine:{name}";

                var medicineCache = await dbCache.StringGetAsync(cacheKey);

                if (!medicineCache.IsNullOrEmpty)
                {
                    var medicine = JsonSerializer.Deserialize<List<Medicine>>(medicineCache);
                    return Ok(medicine);
                }

                var medicineDb = await _context.Medicines.Where(x => x.Name.Contains(name)).ToListAsync();

                if (medicineDb.IsNullOrEmpty())
                {
                    return NotFound("Esse medicamento não existe no estoque! ");
                }

                var medicineSerialized = JsonSerializer.Serialize<List<Medicine>>(medicineDb);
                await dbCache.StringSetAsync(cacheKey, medicineSerialized, TimeSpan.FromMinutes(10));
                return Ok(medicineDb);
            }
            catch (Exception)
            {
                 return StatusCode(500, "01X52 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }
        
        [HttpGet ("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var medicinesDb = await _context.Medicines.ToListAsync();
                return Ok(medicinesDb);
            }
            catch (Exception)
            {
                return StatusCode(500,"01X53 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete (int Id)
        {
            try
            {
                var medicineDb = await _context.Medicines.FirstOrDefaultAsync(x => x.Id == Id);

                if (medicineDb == null)
                {
                    return NotFound("Esse medicamento não existe no estoque! ");
                }

                _context.Medicines.Remove(medicineDb);
                await _context.SaveChangesAsync();

                var dbCache = _cache.GetDatabase();
                var cacheKey = $"Medicine:{Id}";
                await dbCache.KeyDeleteAsync(cacheKey);

                return Ok("Medicamento foi deletado do estoque! ");
            }
            catch (Exception)
            {
                return StatusCode(500, "01X54 - Ocorreu um erro interno ao processar sua solicitação");
            }
            
        }

        [HttpPut]
        public async Task<IActionResult> Update (int Id, Medicine medicine)
        {
            try
            {
                var medicineDb = await _context.Medicines.FirstOrDefaultAsync(x => x.Id == Id);

                if (medicineDb == null)
                {
                    return NotFound("Esse medicamento não existe no estoque! ");
                }

                medicineDb.Name = medicine.Name;
                medicineDb.Milligram = medicine.Milligram;
                medicineDb.Packaging = medicine.Packaging;
                medicineDb.LastUpdateDate = DateTime.UtcNow;

                if (medicine.Amount <0)
                {
                    return BadRequest("A quantidade não pode ser negativa!");
                }
                
                medicineDb.Amount = medicine.Amount;

                _context.Medicines.Update(medicineDb);
                await _context.SaveChangesAsync();

                var medicineSerialized = JsonSerializer.Serialize<Medicine>(medicineDb);

                var dbCache = _cache.GetDatabase();
                var cacheKey = $"Medicine:{Id}";
                var medicineCache = await dbCache.StringGetAsync(cacheKey);
                
                if (!medicineCache.IsNullOrEmpty)
                {   
                    await dbCache.KeyDeleteAsync(cacheKey);
                    await dbCache.StringSetAsync(cacheKey,medicineSerialized,TimeSpan.FromMinutes(10));
                    return Ok(medicineDb);
                }

                await dbCache.StringSetAsync(cacheKey,medicineSerialized,TimeSpan.FromMinutes(10));
                return Ok(medicineDb);  
            }
            catch (Exception)
            {
                return StatusCode(500,"01X55 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }
    }
}