using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API___Clinica_Estoque.Context;
using API___Clinica_Estoque.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API___Clinica_Estoque.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MedicamentosController : ControllerBase
    {
        private readonly EstoqueContext _context;

        public MedicamentosController(EstoqueContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create (Medicamento medicamento)
        {
            _context.Medicamentos.Add(medicamento);
            _context.SaveChanges();
            return Ok(medicamento);
        }
        

        [HttpGet("{Id}")]
        public IActionResult  ObterPorId (int Id)
        {
            var medicamentoBanco = _context.Medicamentos.Find(Id);

            if (medicamentoBanco == null)
            {
                return NotFound("Esse medicamento não existe! ");
            }

            else
            {
                return Ok(medicamentoBanco);
            }
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete (int Id)
        {
            var medicamentoBanco = _context.Medicamentos.Find(Id);

            if (medicamentoBanco == null)
            {
                return NotFound("Esse medicamento não exite! ");


            }

            else
            {
                _context.Medicamentos.Remove(medicamentoBanco);
                _context.SaveChanges();
                return Ok("Medicamento foi deletado! ");
            } 
        }

        [HttpPut("{Id}")]
        public IActionResult Atualizar (int Id, Medicamento medicamento)
        {
            var medicamentoBanco = _context.Medicamentos.Find(Id);

            if (medicamentoBanco == null)
            {
                return NotFound("Esse medicamento não existe! ");
            }

            else
            {
                medicamentoBanco.Nome = medicamento.Nome;
                medicamento.Miligrama = medicamento.Miligrama;
                medicamento.Embalagem = medicamento.Embalagem;
                medicamento.Quantidade = medicamento.Quantidade;

                _context.SaveChanges();
                return Ok(medicamento);
            }
        }
    }
}