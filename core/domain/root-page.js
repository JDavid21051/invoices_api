export const ROOT_PAGE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API</title>
    <style>
        * {
            font-family: Roboto, Helvetica, sans-serif;
        }
    </style>
</head>
<body style="width: 100%; height: 100%; margin: 0; padding: 0; background: #f0efe2; display: flex; justify-content: space-between">
<div
        style="width: 48%; height: 100%; padding-inline: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
    <div style="width: 100%">
    <h1 style="font-weight: bold; border-bottom: 2px solid gray; width: 100%">Pagina no enccontrada - API</h1>
    </div>   
    <h2 style="color: #404040">API para gestión de gastos </h2>
    <div>
        <ul>
            <li>
                Listar entidades financieras
                <a href="/api/financial-entities">/api/financial-entities</a>
            </li>
            <li>
                Listar categorías
                <a href="/api/categories">/api/categories</a>
            </li>
            <li>
                Listar cuentas
                <a href="/api/accounts">/api/accounts</a>
            </li>
            <li>
                Listar ingresos
                <a href="/api/revenues">/api/revenues</a>
            </li>
        </ul>
    </div>
</div>
<span style="width: 2px; height: 100vh; background: rgb(3,115,156)">
</span>
<div
        style="width: 48%; height: 100%; padding-inline: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <div style="width: 100%">
    <h1 style="font-weight: bold; border-bottom: 2px solid gray; width: 100%">No found page - API</h1>
    </div>   
    <h2 style="color: #404040">Manage expenses API</h2>
    <div>
        <ul>
            <li>
                List financial entities
                <a href="/api/financial-entities">/api/financial-entities</a>
            </li>
            <li>
                List expenses categories
                <a href="/api/categories">/api/categories</a>
            </li>
            <li>
                List accounts
                <a href="/api/accounts">/api/accounts</a>
            </li>
            <li>
                List revenues
                <a href="/api/revenues">/api/revenues</a>
            </li>

        </ul>
    </div>
</div>
</body>
</html>

`