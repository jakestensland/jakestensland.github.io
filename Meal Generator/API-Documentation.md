# Meal Planner API Documentation

## Overview
Weekly Meal Planner - A client-side web application for planning meals across a week with user authentication, meal management, and grocery list generation.

**Version:** 1.0.0  
**Base URL:** Local File System (Client-side only)  
**Authentication:** Username/Password with localStorage

---

## Authentication

### POST /authenticate
Authenticate user or create new account

**Parameters:**
```json
{
  "username": "string (min: 3, max: 50)",
  "password": "string (min: 8, requires: uppercase, lowercase, number)",
  "confirmPassword": "string (required for new accounts)"
}
```

**Response:**
```json
{
  "success": true,
  "user": "username",
  "sessionStart": "timestamp"
}
```

**Errors:**
- `400` - Invalid credentials
- `429` - Too many login attempts (5 per 15 minutes)

### POST /logout
Log out current user

**Response:**
```json
{
  "success": true,
  "message": "User logged out"
}
```

---

## Meals

### GET /meals
Get all meals for current user

**Response:**
```json
{
  "meals": [
    {
      "name": "string",
      "mealType": "breakfast|lunch|dinner",
      "category": "american|italian|mexican|asian|vegetarian|vegan|mediterranean",
      "cookTime": "number (minutes)",
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
Create new meal

**Parameters:**
```json
{
  "name": "string (required)",
  "mealType": "breakfast|lunch|dinner (required)",
  "category": "string",
  "cookTime": "number (0-600)",
  "servings": "number (1-20)",
  "calories": "number (0-5000)",
  "cost": "number (0-1000)",
  "instructions": "string",
  "ingredients": [
    {
      "name": "string (required)",
      "amount": "string (required)",
      "cost": "number (0-100)"
    }
  ],
  "photo": "File (max: 5MB, type: image/*)"
}
```

**Response:**
```json
{
  "success": true,
  "meal": { /* meal object */ }
}
```

### GET /meals/suggestions
Get suggested meals (100 pre-loaded meals)

**Query Parameters:**
- `search`: string - Search by name or ingredient
- `category`: string - Filter by category
- `maxTime`: number - Filter by max cook time

**Response:**
```json
{
  "suggestions": [
    { /* meal objects */ }
  ]
}
```

---

## Week Planning

### GET /week-plan
Get current week meal plan

**Response:**
```json
{
  "weekPlan": {
    "monday": {
      "breakfast": { /* meal object */ },
      "lunch": { /* meal object */ },
      "dinner": { /* meal object */ }
    },
    "tuesday": { /* ... */ }
  }
}
```

### PUT /week-plan/{day}/{mealType}
Assign meal to specific day/time slot

**Parameters:**
- `day`: monday|tuesday|wednesday|thursday|friday|saturday|sunday
- `mealType`: breakfast|lunch|dinner

**Body:**
```json
{
  "meal": { /* meal object */ },
  "portionScale": "number (default: 1)"
}
```

**Response:**
```json
{
  "success": true,
  "assignment": {
    "day": "string",
    "mealType": "string",
    "meal": { /* scaled meal object */ }
  }
}
```

### DELETE /week-plan
Clear entire week plan

**Response:**
```json
{
  "success": true,
  "message": "Week plan cleared"
}
```

---

## Grocery Lists

### GET /grocery-list
Generate grocery list from current week plan

**Response:**
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

### GET /grocery-list/export
Export grocery list as text file

**Response:**
```
Content-Type: text/plain
Content-Disposition: attachment; filename="grocery-list.txt"

Grocery List

○ Ingredient 1 - 2 cups - $3.00
✓ Ingredient 2 - 1 lb - $5.00

Total: $8.00
```

---

## Analytics

### GET /analytics
Get meal planning analytics

**Response:**
```json
{
  "analytics": {
    "totalMeals": "number",
    "uniqueMeals": "number",
    "avgCookTime": "number",
    "totalCost": "number",
    "avgCalories": "number",
    "favoriteCategory": "string",
    "categoryStats": {
      "american": "number",
      "italian": "number"
    }
  }
}
```

---

## Data Management

### GET /export
Export all user data

**Response:**
```
Content-Type: application/json
Content-Disposition: attachment; filename="meal-planner-data.json"

{
  "meals": [],
  "weekPlan": {},
  "mealHistory": [],
  "exportDate": "ISO string"
}
```

### POST /import
Import user data from file

**Parameters:**
```json
{
  "file": "File (JSON format)"
}
```

**Response:**
```json
{
  "success": true,
  "imported": {
    "meals": "number",
    "weekPlan": "object",
    "mealHistory": "number"
  }
}
```

---

## Data Models

### Meal Object
```json
{
  "name": "string",
  "mealType": "breakfast|lunch|dinner",
  "category": "string",
  "cookTime": "number",
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
  "photo": "string",
  "dateAdded": "string",
  "userId": "string"
}
```

### User Object
```json
{
  "username": "string",
  "password": "string (hashed)",
  "salt": "string",
  "created": "timestamp"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid credentials |
| 403 | Forbidden - Session expired |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limits

- **Authentication**: 5 attempts per 15 minutes per username
- **Session Duration**: 24 hours
- **File Upload**: 5MB max per file

---

## Security Features

- Password hashing with salt (1000 rounds)
- Input sanitization (XSS protection)
- Session management with expiration
- Rate limiting on authentication
- File type and size validation
- Per-user data isolation

---

## Browser Compatibility

- **Storage**: localStorage (all modern browsers)
- **File API**: File upload and download
- **ES6+**: Modern JavaScript features required
- **Responsive**: Mobile and desktop optimized

---

## Local Storage Schema

```javascript
// User data
users: {
  "username": {
    "password": "hashed_password",
    "salt": "random_salt",
    "created": timestamp
  }
}

// Per-user data (prefixed with username)
meals_username: [meal_objects]
weekPlan_username: {day: {mealType: meal}}
mealHistory_username: [history_entries]
favorites_username: [meal_names]
preferences_username: {settings}

// Session data
currentUser: "username"
sessionStart: "timestamp"
```