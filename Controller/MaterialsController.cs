using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API_ClinicStock.Context;
using Microsoft.AspNetCore.Mvc;
using API_ClinicStock.Entities;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicStock.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MaterialsController : ControllerBase
    {
        private readonly StockContext _context;
        private readonly IConnectionMultiplexer _cache;

        public MaterialsController(StockContext context, IConnectionMultiplexer cache)
        {   
            _context = context;
            _cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Material material)
        {
            _context.Add(material);
            await _context.SaveChangesAsync();

            var dbCache = _cache.GetDatabase();
            var materialSerialized = JsonSerializer.Serialize<Material>(material);
            var cacheKey = $"Material:{material.Id}";

            await dbCache.StringSetAsync(cacheKey, materialSerialized, TimeSpan.FromMinutes(10));
            return Ok(material);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var dbCache = _cache.GetDatabase();

            var cacheKey = $"material:{id}";
            var materialCache = await dbCache.StringGetAsync(cacheKey);

            if (!materialCache.IsNullOrEmpty)
            {
                var material = JsonSerializer.Deserialize<Material>(materialCache);
                return Ok(material);
            }

            var materialDb = await _context.Materials.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

            if (materialDb == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            var serializedMaterial = JsonSerializer.Serialize<Material>(materialDb);
            await dbCache.StringSetAsync(cacheKey, serializedMaterial, TimeSpan.FromMinutes(10));
            return Ok(materialDb);
        }

        [HttpGet("name")]
        public async Task<IActionResult> GetByName (string name)
        {
            var dbCache = _cache.GetDatabase();
            var cacheName = $"Material:{name}";

            var materialCache = await dbCache.StringGetAsync(cacheName);

            if (!materialCache.IsNullOrEmpty)
            {
                var material = JsonSerializer.Deserialize<Material>(materialCache);
                return Ok(material);
            }

            var materialDb = await _context.Materials.AsNoTracking().Where(x => x.Name.Contains(name)).ToListAsync();
            Console.WriteLine(materialDb);
            
            if (materialDb.IsNullOrEmpty())
            {
                return NotFound("Não existe material com esse nome no estoque! ");
            }

            var serializedMaterial = JsonSerializer.Serialize<List<Material>>(materialDb);
            await dbCache.StringSetAsync(cacheName, serializedMaterial, TimeSpan.FromMinutes(10));
            return Ok(materialDb);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll ()
        {
            var materialsDb = await _context.Materials.AsNoTracking().Where(x => x.Name.Contains("")).ToListAsync();

            return Ok(materialsDb);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete (int id)
        {
            var materialDb = await _context.Materials.FirstOrDefaultAsync(x => x.Id == id);

            if (materialDb == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            _context.Materials.Remove(materialDb);
            await _context.SaveChangesAsync();

            var dbCache = _cache.GetDatabase();
            var cacheKey = $"material:{id}";
            await dbCache.KeyDeleteAsync(cacheKey);

            return Ok("Material foi excluido do estoque! ");    
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, Material material)
        {
            var materialDb = await _context.Materials.FirstOrDefaultAsync(x => x.Id == id);

            if (materialDb == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            materialDb.Name = material.Name;
            materialDb.Packaging = material.Packaging;
            materialDb.Amount = material.Amount;

            _context.Materials.Update(materialDb);
            await _context.SaveChangesAsync();

            var materialSerialized = JsonSerializer.Serialize<Material>(materialDb);

            var dbCache = _cache.GetDatabase();
            var cacheKey = $"material:{id}";

            var materialCache = await dbCache.StringGetAsync(cacheKey);

            if (!materialCache.IsNullOrEmpty)
            {
                await dbCache.KeyDeleteAsync(cacheKey);
                await dbCache.StringSetAsync(cacheKey, materialSerialized, TimeSpan.FromMinutes(10));
                return Ok(materialDb);
            }

            await dbCache.StringSetAsync(cacheKey, materialSerialized, TimeSpan.FromMinutes(10));
            return Ok(materialDb);
        }

    }
}