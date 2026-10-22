var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Permite servir o ficheiro index.html e os ficheiros estáticos da pasta wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

// Conjunto de registos de vendas em memória
var vendas = new[]
{
    new { Produto = "Notebook", Categoria = "Tecnologia", Valor = 3500m },
    new { Produto = "Mouse", Categoria = "Tecnologia", Valor = 100m },
    new { Produto = "Cadeira", Categoria = "Móveis", Valor = 600m },
    new { Produto = "Mesa", Categoria = "Móveis", Valor = 900m },
    new { Produto = "Monitor", Categoria = "Tecnologia", Valor = 1200m }
};

// Rota GET para listar todas as vendas em JSON
app.MapGet("/api/vendas", () => vendas);

// Rota GET para calcular e retornar os indicadores
app.MapGet("/api/indicadores", () =>
{
    var receitaTotal = vendas.Sum(v => v.Valor);
    var totalVendas = vendas.Length;
    var ticketMedio = totalVendas == 0 ? 0 : receitaTotal / totalVendas;

    return new { receitaTotal, totalVendas, ticketMedio };
});

app.Run();