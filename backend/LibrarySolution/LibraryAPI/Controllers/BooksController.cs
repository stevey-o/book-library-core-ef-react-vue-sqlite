using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;


        public BooksController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.OrderBy(b => b.Title).ToListAsync();
        }


        // GET: api/books/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();
            return book;
        }


        // GET: api/books/stats
        [HttpGet("stats")]
        public async Task<ActionResult> GetStats()
        {
            var stats = await _context.Books
            .GroupBy(b => b.Genre ?? "Unknown")
            .Select(g => new { Genre = g.Key, Count = g.Count() })
            .ToListAsync();


            return Ok(stats);
        }


        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook([FromBody] Book book)
        {
            book.Id = Guid.NewGuid();
            _context.Books.Add(book);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }


        // PUT: api/books/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, [FromBody] Book updated)
        {
            var existing = await _context.Books.FindAsync(id);
            if (existing == null) return NotFound();

            // update fields
            existing.Title = updated.Title;
            existing.Author = updated.Author;
            existing.Genre = updated.Genre;
            existing.PublishedDate = updated.PublishedDate;
            existing.Rating = updated.Rating;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/books/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            var existing = await _context.Books.FindAsync(id);
            if (existing == null) return NotFound();


            _context.Books.Remove(existing);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}