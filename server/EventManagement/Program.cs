using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Azure.Identity;
using EventManagement.Auth;
using EventManagement.Controllers;
using EventManagement.Persistence;
using EventManagement.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration.GetValue<string>("AzureAd:KeyVaultUrl")!),
    new DefaultAzureCredential()
);

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()!;

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("Data");
    options.UseSqlServer(connectionString);
});

builder.Services.AddDbContext<AuthDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("UserManager");
    options.UseSqlServer(connectionString);
});
builder.Services
    .AddIdentity<IdentityUser, IdentityRole>(options => options.User.RequireUniqueEmail = true)
    .AddEntityFrameworkStores<AuthDbContext>();

builder.Services.AddScoped<IAttendanceRecordService, AttendanceRecordService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IEventFeedbackService, EventFeedbackService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IScorecardService, ScorecardService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<ITokenService, TokenService>();

// JWT authentication
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
            ClockSkew = TimeSpan.Zero,
            NameClaimType = JwtRegisteredClaimNames.Name,
            RoleClaimType = "role"
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()
    )
);

var app = builder.Build();

await app.Services.SeedAdminAsync();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapAttendanceRecordEndpoints();
app.MapAuthEndpoints();
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