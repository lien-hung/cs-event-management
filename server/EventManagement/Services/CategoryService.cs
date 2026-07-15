using EventManagement.DTOs;
using EventManagement.Mappers;
using EventManagement.Models;
using EventManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Services;

public interface ICategoryService
{
    Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
    Task<CategoryDto?> GetCategoryByIdAsync(int id);
    Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    Task UpdateCategoryAsync(int id, UpdateCategoryDto dto);
    Task DeleteCategoryAsync(int id);
}

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
    {
        var category = Category.Create(dto.Name, dto.Slug);

        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();

        return category.ToDto();
    }

    public async Task DeleteCategoryAsync(int id)
    {
        var toDelete = await _context.Categories.FindAsync(id);
        if (toDelete is not null)
        {
            _context.Categories.Remove(toDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        return await _context.Categories
            .AsNoTracking()
            .Select(category => category.ToDto())
            .ToListAsync();
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _context.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

        return category?.ToDto();
    }

    public async Task UpdateCategoryAsync(int id, UpdateCategoryDto dto)
    {
        var toUpdate = await _context.Categories.FindAsync(id) ?? throw new Exception($"Category with ID {id} not found");
        toUpdate.Update(dto.Name, dto.Slug);
        await _context.SaveChangesAsync();
    }
}