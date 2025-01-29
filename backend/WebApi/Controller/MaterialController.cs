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
using API_ClinicStock.DTOs.Material;
using System.Diagnostics.CodeAnalysis;

namespace API_ClinicStock.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MaterialController : ControllerBase
    {
        private readonly StockContext _context;
        private readonly IConnectionMultiplexer _cache;

        public MaterialController(StockContext context, IConnectionMultiplexer cache)
        {   
            _context = context;
            _cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateMaterialDTO input)
        {
            try
            {
                if (input.Amount <0)
                {
                    return BadRequest("A quantidade não pode ser negativa!");
                }

                Material material = new Material();
                material.Name = input.Name;
                material.Packaging = input.Packaging;
                material.Amount = input.Amount;
                material.CreateDate = DateTime.UtcNow;
                material.LastUpdateDate = DateTime.UtcNow;

                _context.Add(material);
                await _context.SaveChangesAsync();

                var dbCache = _cache.GetDatabase();
                var materialSerialized = JsonSerializer.Serialize<Material>(material);
                var cacheKey = $"Material:{material.Id}";

                await dbCache.StringSetAsync(cacheKey, materialSerialized, TimeSpan.FromMinutes(10));
                return Ok(material);
            }
            catch (Exception)
            {
                 return StatusCode(500, "01X35 - Ocorreu um erro interno ao processar sua solicitação");  
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
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
            catch (Exception)
            {
                return StatusCode(500, "01X36 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

        [HttpGet("name")]
        public async Task<IActionResult> GetByName (string name)
        {
            try
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
            catch (Exception)
            {
                return StatusCode(500,"01X37 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var materialsDb = await _context.Materials.AsNoTracking().ToListAsync();
                return Ok(materialsDb);
            }
            catch (Exception)
            {
                return StatusCode(500, "01X38 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
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
            catch (Exception)
            {
                return StatusCode(500, "01X39 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateMaterialDTO input)
        {
            try
            {
                var materialDb = await _context.Materials.FirstOrDefaultAsync(x => x.Id == id);

                if (materialDb == null)
                {
                    return NotFound("Esse material não existe no estoque! ");
                }

                else if (input.Amount <0)
                {
                    return BadRequest("A quantidade não pode ser negativa!");
                }

                materialDb.Name = input.Name;
                materialDb.Packaging = input.Packaging;
                materialDb.LastUpdateDate = DateTime.UtcNow;
                materialDb.Amount = input.Amount;

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
            catch (Exception)
            {
                return StatusCode(500,"01X40 - Ocorreu um erro interno ao processar sua solicitação");
            }
        }

    }
}