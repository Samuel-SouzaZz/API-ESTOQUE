# Teste simples da API
Write-Host "Testando API..." -ForegroundColor Green

# Teste 1: Verificar se servidor está rodando
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/" -Method GET
    Write-Host "✅ Servidor está rodando!" -ForegroundColor Green
    Write-Host "Resposta: $response" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Servidor não está rodando: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Teste 2: Registrar usuário
Write-Host "`nRegistrando usuário..." -ForegroundColor Yellow
$body = '{"nome": "Dr. João", "email": "joao@test.com", "senha": "123456", "role": "medico"}'

try {
    $registerResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body $body
    Write-Host "✅ Usuário registrado!" -ForegroundColor Green
    Write-Host ($registerResponse | ConvertTo-Json)
} catch {
    Write-Host "❌ Erro no registro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTeste concluído!" -ForegroundColor Green 