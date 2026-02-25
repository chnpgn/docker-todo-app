using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

[ApiController]
[Route("api/todos")]
public class TodosController : ControllerBase
{
    private readonly TodoContext _context;
    public TodosController(TodoContext context) => _context = context;

    [HttpGet]
    public async Task<IEnumerable<TodoItem>> Get() =>
        await _context.Todos.ToListAsync();

    [HttpPost]
    public async Task<IActionResult> Create(TodoItem todo)
    {
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return Ok(todo);
    }
}