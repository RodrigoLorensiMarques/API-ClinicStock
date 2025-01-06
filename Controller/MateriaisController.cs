using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API___Clinica_Estoque.Context;
using Microsoft.AspNetCore.Mvc;
using API___Clinica_Estoque.Entities;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace API___Clinica_Estoque.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MateriaisController : ControllerBase
    {
        private readonly EstoqueContext _context;
        private readonly IConnectionMultiplexer _cache;

        public MateriaisController(EstoqueContext context, IConnectionMultiplexer cache)
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
        public async Task<IActionResult> ObterPorId(int id)
        {
            var dbCache = _cache.GetDatabase();

            var cacheKey = $"material:{id}";
            var materialCache = await dbCache.StringGetAsync(cacheKey);

            if (!materialCache.IsNullOrEmpty)
            {
                var material = JsonSerializer.Deserialize<Material>(materialCache);
                return Ok(material);
            }

            var materialBanco = await _context.Materiais.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

            if (materialBanco == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            var serializedMaterial = JsonSerializer.Serialize<Material>(materialBanco);
            await dbCache.StringSetAsync(cacheKey, serializedMaterial, TimeSpan.FromMinutes(10));
            return Ok(materialBanco);
        }

        [HttpGet("nome")]
        public async Task<IActionResult> ObterPorNome (string nome)
        {
            var dbCache = _cache.GetDatabase();
            var cacheName = $"Material:{nome}";

            var materialCache = await dbCache.StringGetAsync(cacheName);

            if (!materialCache.IsNullOrEmpty)
            {
                var material = JsonSerializer.Deserialize<Material>(materialCache);
                return Ok(material);
            }

            var materiaisBanco = await _context.Materiais.AsNoTracking().Where(x => x.Nome.Contains(nome)).ToListAsync();
            Console.WriteLine(materiaisBanco);

            
            if (materiaisBanco.IsNullOrEmpty())
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            var serializedMaterial = JsonSerializer.Serialize<List<Material>>(materiaisBanco);
            await dbCache.StringSetAsync(cacheName, serializedMaterial, TimeSpan.FromMinutes(10));
            return Ok(materiaisBanco);
        }

        [HttpGet("ObterTodos")]
        public async Task<IActionResult> ObterTodos ()
        {
            var materiaisBanco = await _context.Materiais.AsNoTracking().Where(x => x.Nome.Contains("")).ToListAsync();

            return Ok(materiaisBanco);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete (int id)
        {
            var materialBanco = await _context.Materiais.FirstOrDefaultAsync(x => x.Id == id);

            if (materialBanco == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            _context.Materiais.Remove(materialBanco);
            await _context.SaveChangesAsync();

            var dbCache = _cache.GetDatabase();
            var cacheKey = $"material:{id}";
            await dbCache.KeyDeleteAsync(cacheKey);

            return Ok("Material foi excluido do estoque! ");    
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, Material material)
        {
            var materialBanco = await _context.Materiais.FirstOrDefaultAsync(x => x.Id == id);

            if (materialBanco == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            materialBanco.Nome = material.Nome;
            materialBanco.Embalagem = material.Embalagem;
            materialBanco.Quantidade = material.Quantidade;

            _context.Materiais.Update(materialBanco);
            await _context.SaveChangesAsync();

            var materialSerialized = JsonSerializer.Serialize<Material>(materialBanco);

            var dbCache = _cache.GetDatabase();
            var cacheKey = $"material:{id}";

            var materialCache = await dbCache.StringGetAsync(cacheKey);

            if (!materialCache.IsNullOrEmpty)
            {
                await dbCache.KeyDeleteAsync(cacheKey);
                await dbCache.StringSetAsync(cacheKey, materialSerialized, TimeSpan.FromMinutes(10));
                return Ok(materialBanco);
            }

            await dbCache.StringSetAsync(cacheKey, materialSerialized, TimeSpan.FromMinutes(10));
            return Ok(materialBanco);
        }

    }
}