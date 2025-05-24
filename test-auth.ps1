# Script para testar a API de autenticação

Write-Host "=== TESTANDO API DE AUTENTICAÇÃO ===" -ForegroundColor Green

# 1. Registrar um usuário médico
Write-Host "`n1. Registrando usuário médico..." -ForegroundColor Yellow
$medicoBody = @{
    nome = "Dr. João Silva"
    email = "joao@hospital.com"  
    senha = "123456"
    role = "medico"
} | ConvertTo-Json

try {
    $medicoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body $medicoBody
    Write-Host "✅ Médico registrado com sucesso!" -ForegroundColor Green
    $medicoResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Erro ao registrar médico: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Registrar um usuário farmacêutico
Write-Host "`n2. Registrando usuário farmacêutico..." -ForegroundColor Yellow
$farmaceuticoBody = @{
    nome = "Ana Santos"
    email = "ana@farmacia.com"
    senha = "123456"
    role = "farmaceutico"
} | ConvertTo-Json

try {
    $farmaceuticoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body $farmaceuticoBody
    Write-Host "✅ Farmacêutico registrado com sucesso!" -ForegroundColor Green
    $farmaceuticoResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Erro ao registrar farmacêutico: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Registrar um usuário paciente
Write-Host "`n3. Registrando usuário paciente..." -ForegroundColor Yellow
$pacienteBody = @{
    nome = "Maria Oliveira"
    email = "maria@email.com"
    senha = "123456"
    role = "paciente"
} | ConvertTo-Json

try {
    $pacienteResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body $pacienteBody
    Write-Host "✅ Paciente registrado com sucesso!" -ForegroundColor Green
    $pacienteResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Erro ao registrar paciente: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Fazer login com o médico
Write-Host "`n4. Fazendo login com médico..." -ForegroundColor Yellow
$loginMedicoBody = @{
    email = "joao@hospital.com"
    senha = "123456"
} | ConvertTo-Json

try {
    $loginMedicoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body $loginMedicoBody
    Write-Host "✅ Login médico realizado com sucesso!" -ForegroundColor Green
    $tokenMedico = $loginMedicoResponse.token
    Write-Host "Token médico: $tokenMedico" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erro no login do médico: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Fazer login com o farmacêutico
Write-Host "`n5. Fazendo login com farmacêutico..." -ForegroundColor Yellow
$loginFarmaceuticoBody = @{
    email = "ana@farmacia.com"
    senha = "123456"
} | ConvertTo-Json

try {
    $loginFarmaceuticoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body $loginFarmaceuticoBody
    Write-Host "✅ Login farmacêutico realizado com sucesso!" -ForegroundColor Green
    $tokenFarmaceutico = $loginFarmaceuticoResponse.token
    Write-Host "Token farmacêutico: $tokenFarmaceutico" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erro no login do farmacêutico: $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Testar rota protegida para médico
if ($tokenMedico) {
    Write-Host "`n6. Testando rota protegida para médico..." -ForegroundColor Yellow
    $headers = @{
        "Authorization" = "Bearer $tokenMedico"
        "Content-Type" = "application/json"
    }
    
    try {
        $medicoProtegidoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/protected/medico" -Method GET -Headers $headers
        Write-Host "✅ Rota médico acessada com sucesso!" -ForegroundColor Green
        $medicoProtegidoResponse | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Erro ao acessar rota médico: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 7. Testar rota protegida para farmacêutico
if ($tokenFarmaceutico) {
    Write-Host "`n7. Testando rota protegida para farmacêutico..." -ForegroundColor Yellow
    $headers = @{
        "Authorization" = "Bearer $tokenFarmaceutico"
        "Content-Type" = "application/json"
    }
    
    try {
        $farmaceuticoProtegidoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/protected/farmaceutico" -Method GET -Headers $headers
        Write-Host "✅ Rota farmacêutico acessada com sucesso!" -ForegroundColor Green
        $farmaceuticoProtegidoResponse | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Erro ao acessar rota farmacêutico: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 8. Testar acesso negado (farmacêutico tentando acessar área médica)
if ($tokenFarmaceutico) {
    Write-Host "`n8. Testando acesso negado (farmacêutico → área médica)..." -ForegroundColor Yellow
    $headers = @{
        "Authorization" = "Bearer $tokenFarmaceutico"
        "Content-Type" = "application/json"
    }
    
    try {
        $acessoNegadoResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/protected/medico" -Method GET -Headers $headers
        Write-Host "❌ ERRO: Farmacêutico não deveria ter acesso à área médica!" -ForegroundColor Red
    } catch {
        Write-Host "✅ Acesso negado corretamente!" -ForegroundColor Green
        Write-Host "Erro esperado: $($_.Exception.Message)" -ForegroundColor Gray
    }
}

Write-Host "`n=== TESTES CONCLUÍDOS ===" -ForegroundColor Green 