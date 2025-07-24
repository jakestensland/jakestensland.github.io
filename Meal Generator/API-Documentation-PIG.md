# Eal-May Anner-Play API Ocumentation-Day

## Overview-way
Eekly-Way Eal-May Anner-Play - A ient-clay-ide-say eb-way application-way or-fay anning-play eals-may across-way a eek-way ith-way user-way authentication-way, eal-may anagement-may, and-way ocery-gray ist-lay eneration-gay.

**Ersion-Vay:** 1.0.0  
**Ase-Bay URL:** Ocal-Lay Ile-Fay Ystem-Say (Ient-Clay-ide-say only-way)  
**Authentication-way:** Username-way/Assword-Pay ith-way localStorage-way

---

## Authentication-way

### OST-Pay /authenticate-way
Authenticate-way user-way or-way eate-cray ew-nay account-way

**Arameters-Pay:**
```json
{
  "username": "ing-stray (in-may: 3, ax-may: 50)",
  "password": "ing-stray (in-may: 8, equires-ray: uppercase-way, owercase-lay, umber-nay)",
  "confirmPassword": "ing-stray (equired-ray or-fay ew-nay accounts-way)"
}
```

**Esponse-Ray:**
```json
{
  "success": true,
  "user": "username",
  "sessionStart": "imestamp-tay"
}
```

**Errors-way:**
- `400` - Invalid-way edentials-cray
- `429` - Oo-Tay any-may ogin-lay attempts-way (5 er-pay 15 inutes-may)

### OST-Pay /ogout-lay
Og-Lay out-way urrent-cay user-way

**Esponse-Ray:**
```json
{
  "success": true,
  "message": "User-way ogged-lay out-way"
}
```

---

## Eals-May

### ET-Gay /eals-may
Et-Gay all-way eals-may or-fay urrent-cay user-way

**Esponse-Ray:**
```json
{
  "meals": [
    {
      "name": "ing-stray",
      "mealType": "eakfast-bray|unch-lay|inner-day",
      "category": "american-way|italian-way|exican-may|asian-way|egetarian-vay|egan-vay|editerranean-may",
      "cookTime": "umber-nay (inutes-may)",
      "servings": "umber-nay",
      "calories": "umber-nay",
      "cost": "umber-nay",
      "instructions": "ing-stray",
      "ingredients": [
        {
          "name": "ing-stray",
          "amount": "ing-stray",
          "cost": "umber-nay"
        }
      ],
      "photo": "ing-stray (URL-way)",
      "dateAdded": "ISO-way ing-stray",
      "userId": "ing-stray"
    }
  ]
}
```

### OST-Pay /eals-may
Eate-Cray ew-nay eal-may

**Arameters-Pay:**
```json
{
  "name": "ing-stray (equired-ray)",
  "mealType": "eakfast-bray|unch-lay|inner-day (equired-ray)",
  "category": "ing-stray",
  "cookTime": "umber-nay (0-600)",
  "servings": "umber-nay (1-20)",
  "calories": "umber-nay (0-5000)",
  "cost": "umber-nay (0-1000)",
  "instructions": "ing-stray",
  "ingredients": [
    {
      "name": "ing-stray (equired-ray)",
      "amount": "ing-stray (equired-ray)",
      "cost": "umber-nay (0-100)"
    }
  ],
  "photo": "Ile-Fay (ax-may: 5MB-way, ype-tay: image-way/*)"
}
```

---

## Eek-Way Anning-Play

### ET-Gay /eek-way-an-play
Et-Gay urrent-cay eek-way eal-may an-play

**Esponse-Ray:**
```json
{
  "weekPlan": {
    "onday-may": {
      "eakfast-bray": { /* eal-may object-way */ },
      "unch-lay": { /* eal-may object-way */ },
      "inner-day": { /* eal-may object-way */ }
    },
    "uesday-tay": { /* ... */ }
  }
}
```

---

## Ocery-Gray Ists-Lay

### ET-Gay /ocery-gray-ist-lay
Enerate-Gay ocery-gray ist-lay om-fray urrent-cay eek-way an-play

**Esponse-Ray:**
```json
{
  "groceryList": [
    {
      "name": "ing-stray",
      "amount": "ing-stray",
      "cost": "umber-nay",
      "checked": "oolean-bay"
    }
  ],
  "totalCost": "umber-nay"
}
```

---

## Error-way Odes-Cay

| Ode-Cay | Escription-Day |
|---------|----------------|
| 400 | Ad-Bay Equest-Ray - Invalid-way input-way ata-day |
| 401 | Unauthorized-way - Invalid-way edentials-cray |
| 403 | Orbidden-Fay - Ession-Say expired-way |
| 404 | Ot-Nay Ound-Fay - Esource-Ray ot-nay ound-fay |
| 429 | Oo-Tay Any-May Equests-Ray - Ate-Ray imit-lay exceeded-way |
| 500 | Internal-way Erver-Say Error-way |

---

## Ecurity-Say Eatures-Fay

- Assword-Pay ashing-hay ith-way alt-say (1000 ounds-ray)
- Input-way anitization-say (XSS-way otection-pray)
- Ession-Say anagement-may ith-way expiration-way
- Ate-Ray imiting-lay on-way authentication-way
- Ile-Fay ype-tay and-way ize-say alidation-vay
- Er-Pay-user-way ata-day isolation-way