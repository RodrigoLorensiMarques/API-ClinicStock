using API_ClinicStock.Context;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<StockContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexaoPadrao")));

builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var configuration = builder.Configuration.GetSection("Redis:ConnectionString").Value;
    return ConnectionMultiplexer.Connect(configuration);
});



builder.Services.AddControllers();

builder.Services.AddCors();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseRouting();

app.UseCors( x =>
    {
        x.AllowAnyHeader();
        x.AllowAnyMethod();
        x.AllowAnyOrigin();
    });

app.UseAuthorization();

app.MapControllers(); 


app.Run();
