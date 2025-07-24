# Documentación API del Planificador de Comidas

## Resumen
Planificador Semanal de Comidas - Una aplicación web del lado del cliente para planificar comidas durante una semana con autenticación de usuario, gestión de comidas y generación de listas de compras.

**Versión:** 1.0.0  
**URL Base:** Sistema de Archivos Local (Solo del lado del cliente)  
**Autenticación:** Usuario/Contraseña con localStorage

---

## Autenticación

### POST /authenticate
Autenticar usuario o crear nueva cuenta

**Parámetros:**
```json
{
  "username": "string (mín: 3, máx: 50)",
  "password": "string (mín: 8, requiere: mayúscula, minúscula, número)",
  "confirmPassword": "string (requerido para nuevas cuentas)"
}
```

**Respuesta:**
```json
{
  "success": true,
  "user": "username",
  "sessionStart": "timestamp"
}
```

**Errores:**
- `400` - Credenciales inválidas
- `429` - Demasiados intentos de inicio de sesión (5 por 15 minutos)

### POST /logout
Cerrar sesión del usuario actual

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario desconectado"
}
```

---

## Comidas

### GET /meals
Obtener todas las comidas del usuario actual

**Respuesta:**
```json
{
  "meals": [
    {
      "name": "string",
      "mealType": "desayuno|almuerzo|cena",
      "category": "americana|italiana|mexicana|asiática|vegetariana|vegana|mediterránea",
      "cookTime": "number (minutos)",
      "servings": "number",
      "calories": "number",
      "cost": "number",
      "instructions": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "string",
          "cost": "number"
        }
      ],
      "photo": "string (URL)",
      "dateAdded": "ISO string",
      "userId": "string"
    }
  ]
}
```

### POST /meals
Crear nueva comida

**Parámetros:**
```json
{
  "name": "string (requerido)",
  "mealType": "desayuno|almuerzo|cena (requerido)",
  "category": "string",
  "cookTime": "number (0-600)",
  "servings": "number (1-20)",
  "calories": "number (0-5000)",
  "cost": "number (0-1000)",
  "instructions": "string",
  "ingredients": [
    {
      "name": "string (requerido)",
      "amount": "string (requerido)",
      "cost": "number (0-100)"
    }
  ],
  "photo": "File (máx: 5MB, tipo: image/*)"
}
```

---

## Planificación Semanal

### GET /week-plan
Obtener plan de comidas de la semana actual

**Respuesta:**
```json
{
  "weekPlan": {
    "lunes": {
      "desayuno": { /* objeto comida */ },
      "almuerzo": { /* objeto comida */ },
      "cena": { /* objeto comida */ }
    },
    "martes": { /* ... */ }
  }
}
```

---

## Listas de Compras

### GET /grocery-list
Generar lista de compras del plan semanal actual

**Respuesta:**
```json
{
  "groceryList": [
    {
      "name": "string",
      "amount": "string",
      "cost": "number",
      "checked": "boolean"
    }
  ],
  "totalCost": "number"
}
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Solicitud Incorrecta - Datos de entrada inválidos |
| 401 | No Autorizado - Credenciales inválidas |
| 403 | Prohibido - Sesión expirada |
| 404 | No Encontrado - Recurso no encontrado |
| 429 | Demasiadas Solicitudes - Límite de velocidad excedido |
| 500 | Error Interno del Servidor |

---

## Características de Seguridad

- Hash de contraseñas con sal (1000 rondas)
- Sanitización de entrada (protección XSS)
- Gestión de sesiones con expiración
- Limitación de velocidad en autenticación
- Validación de tipo y tamaño de archivo
- Aislamiento de datos por usuario