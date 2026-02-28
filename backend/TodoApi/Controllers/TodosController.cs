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

        [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TodoItem updatedTodo)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return NotFound();

        todo.Title = updatedTodo.Title;
        todo.IsCompleted = updatedTodo.IsCompleted;
        await _context.SaveChangesAsync();
        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return NotFound();

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}