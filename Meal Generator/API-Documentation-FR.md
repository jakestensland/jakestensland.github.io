# Documentation API du Planificateur de Repas

## Aperçu
Planificateur Hebdomadaire de Repas - Une application web côté client pour planifier les repas sur une semaine avec authentification utilisateur, gestion des repas et génération de listes de courses.

**Version:** 1.0.0  
**URL de Base:** Système de Fichiers Local (Côté client uniquement)  
**Authentification:** Nom d'utilisateur/Mot de passe avec localStorage

---

## Authentification

### POST /authenticate
Authentifier l'utilisateur ou créer un nouveau compte

**Paramètres:**
```json
{
  "username": "string (min: 3, max: 50)",
  "password": "string (min: 8, nécessite: majuscule, minuscule, chiffre)",
  "confirmPassword": "string (requis pour nouveaux comptes)"
}
```

**Réponse:**
```json
{
  "success": true,
  "user": "username",
  "sessionStart": "timestamp"
}
```

**Erreurs:**
- `400` - Identifiants invalides
- `429` - Trop de tentatives de connexion (5 par 15 minutes)

### POST /logout
Déconnecter l'utilisateur actuel

**Réponse:**
```json
{
  "success": true,
  "message": "Utilisateur déconnecté"
}
```

---

## Repas

### GET /meals
Obtenir tous les repas de l'utilisateur actuel

**Réponse:**
```json
{
  "meals": [
    {
      "name": "string",
      "mealType": "petit-déjeuner|déjeuner|dîner",
      "category": "américaine|italienne|mexicaine|asiatique|végétarienne|végétalienne|méditerranéenne",
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
Créer un nouveau repas

**Paramètres:**
```json
{
  "name": "string (requis)",
  "mealType": "petit-déjeuner|déjeuner|dîner (requis)",
  "category": "string",
  "cookTime": "number (0-600)",
  "servings": "number (1-20)",
  "calories": "number (0-5000)",
  "cost": "number (0-1000)",
  "instructions": "string",
  "ingredients": [
    {
      "name": "string (requis)",
      "amount": "string (requis)",
      "cost": "number (0-100)"
    }
  ],
  "photo": "File (max: 5MB, type: image/*)"
}
```

---

## Planification Hebdomadaire

### GET /week-plan
Obtenir le plan de repas de la semaine actuelle

**Réponse:**
```json
{
  "weekPlan": {
    "lundi": {
      "petit-déjeuner": { /* objet repas */ },
      "déjeuner": { /* objet repas */ },
      "dîner": { /* objet repas */ }
    },
    "mardi": { /* ... */ }
  }
}
```

---

## Listes de Courses

### GET /grocery-list
Générer une liste de courses à partir du plan hebdomadaire actuel

**Réponse:**
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

## Codes d'Erreur

| Code | Description |
|------|-------------|
| 400 | Mauvaise Requête - Données d'entrée invalides |
| 401 | Non Autorisé - Identifiants invalides |
| 403 | Interdit - Session expirée |
| 404 | Non Trouvé - Ressource non trouvée |
| 429 | Trop de Requêtes - Limite de débit dépassée |
| 500 | Erreur Interne du Serveur |

---

## Fonctionnalités de Sécurité

- Hachage des mots de passe avec sel (1000 tours)
- Assainissement des entrées (protection XSS)
- Gestion des sessions avec expiration
- Limitation du débit sur l'authentification
- Validation du type et de la taille des fichiers
- Isolation des données par utilisateur