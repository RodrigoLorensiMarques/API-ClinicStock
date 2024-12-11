using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API___Clinica_Estoque.Context;
using Microsoft.AspNetCore.Mvc;
using API___Clinica_Estoque.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API___Clinica_Estoque.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MateriaisController : ControllerBase
    {
        private readonly EstoqueContext _context;

        public MateriaisController(EstoqueContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create(Material material)
        {
            _context.Add(material);
            _context.SaveChanges();
            return Ok(material);
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var materialBanco = _context.Materiais.Find(id);

            if (materialBanco == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            else
            {
                return Ok(materialBanco);
            }
        }

        [HttpGet("nome")]
        public IActionResult ObterPorNome (string nome)
        {
            var materiaisBanco = _context.Materiais.Where(x => x.Nome.Contains(nome));

            
            if (materiaisBanco.IsNullOrEmpty())
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            else 
            {
                return Ok(materiaisBanco);
            }
        }

        [HttpGet("ObterTodos")]
        public IActionResult ObterTodos ()
        {
            var materiaisBanco = _context.Materiais.Where(x => x.Nome.Contains(""));

            return Ok(materiaisBanco);
        }



        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            var materialBanco = _context.Materiais.Find(id);

            if (materialBanco == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            else
            {
                _context.Materiais.Remove(materialBanco);
                _context.SaveChanges();
                return Ok("Material foi excluido do estoque! ");
            }
        }

        [HttpPut]
        public IActionResult Update(int id, Material material)
        {
            var materialBanco = _context.Materiais.Find(id);

            if (materialBanco == null)
            {
                return NotFound("Esse material não existe no estoque! ");
            }

            else 
            {
                materialBanco.Nome = material.Nome;
                materialBanco.Embalagem = material.Embalagem;
                materialBanco.Quantidade = material.Quantidade;


                _context.Materiais.Update(materialBanco);
                _context.SaveChanges();
                return Ok(materialBanco);
            }
        }

    }
}