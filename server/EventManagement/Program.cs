using EventManagement.Controllers;
using EventManagement.Persistence;
using EventManagement.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<IAttendanceRecordService, AttendanceRecordService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IEventFeedbackService, EventFeedbackService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IScorecardService, ScorecardService>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

app.MapAttendanceRecordEndpoints();
app.MapCategoryEndpoints();
app.MapEventFeedbackEndpoints();
app.MapEventEndpoints();
app.MapScorecardEndpoints();
app.MapUserEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.Run();