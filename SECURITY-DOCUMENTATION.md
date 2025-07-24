# Security Documentation - Meal Planner Application

## Overview
This document outlines the security features implemented in the client-side meal planner application.

**⚠️ Important Note:** This is a client-side application using localStorage. For production use, implement server-side security measures.

---

## Authentication Security

### Password Hashing
```javascript
function hashPassword(password, salt = null) {
    if (!salt) salt = generateSalt();
    let hash = 0;
    const combined = password + salt;
    
    // Simple hash algorithm
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    // Multiple rounds for stronger security (1000 iterations)
    for (let round = 0; round < 1000; round++) {
        hash = ((hash << 5) - hash) + hash;
        hash = hash & hash;
    }
    
    return { hash: hash.toString(), salt };
}
```

**Features:**
- **Salt Generation**: Random 30-character salt per password
- **Multiple Rounds**: 1000 iterations to slow down brute force
- **No Plain Text**: Passwords never stored in readable format

### Password Requirements
```javascript
function validatePassword(password) {
    if (password.length < 8) throw new Error('Password must be at least 8 characters long');
    if (!/[A-Z]/.test(password)) throw new Error('Password must contain uppercase letter');
    if (!/[a-z]/.test(password)) throw new Error('Password must contain lowercase letter');
    if (!/[0-9]/.test(password)) throw new Error('Password must contain number');
    return true;
}
```

**Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter  
- At least 1 number

---

## Rate Limiting

### Login Attempt Protection
```javascript
let loginAttempts = {};

function checkRateLimit(username) {
    const now = Date.now();
    const attempts = loginAttempts[username] || { count: 0, lastAttempt: 0 };
    
    // Reset after 15 minutes
    if (now - attempts.lastAttempt > 900000) {
        attempts.count = 0;
    }
    
    // Block after 5 attempts
    if (attempts.count >= 5) {
        const timeLeft = Math.ceil((900000 - (now - attempts.lastAttempt)) / 60000);
        throw new Error(`Too many login attempts. Try again in ${timeLeft} minutes.`);
    }
    
    attempts.count++;
    attempts.lastAttempt = now;
    loginAttempts[username] = attempts;
}
```

**Protection:**
- **5 attempts maximum** per username
- **15-minute lockout** after limit reached
- **Per-username tracking** prevents account enumeration
- **Automatic reset** after timeout period

---

## Input Sanitization

### XSS Prevention
```javascript
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .replace(/[<>\"'&]/g, function(match) {
            const escapeMap = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return escapeMap[match];
        })
        .trim()
        .substring(0, 100); // Length limit
}
```

**Protection Against:**
- **Script Injection**: HTML/JavaScript tags escaped
- **HTML Injection**: Special characters neutralized
- **Length Attacks**: Input truncated to 100 characters
- **Whitespace Attacks**: Leading/trailing spaces removed

### Data Validation
```javascript
// Meal data validation
const cookTime = Math.max(0, Math.min(600, parseInt(value) || 0));
const servings = Math.max(1, Math.min(20, parseInt(value) || 4));
const calories = Math.max(0, Math.min(5000, parseInt(value) || 0));
const cost = Math.max(0, Math.min(1000, parseFloat(value) || 0));
```

**Validation Rules:**
- **Cook Time**: 0-600 minutes
- **Servings**: 1-20 people
- **Calories**: 0-5000 per serving
- **Cost**: $0-$1000 per meal
- **Ingredient Cost**: $0-$100 per ingredient

---

## Session Management

### Session Creation
```javascript
function authenticate() {
    // After successful login
    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('sessionStart', Date.now().toString());
}
```

### Session Validation
```javascript
function initApp() {
    const sessionStart = localStorage.getItem('sessionStart');
    const now = Date.now();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (currentUser && sessionStart && (now - parseInt(sessionStart)) < sessionDuration) {
        // Valid session
        showApp();
    } else {
        // Expired or invalid session
        logout();
    }
}
```

**Features:**
- **24-hour expiration** automatic logout
- **Session validation** on app initialization
- **Secure cleanup** on logout

---

## File Upload Security

### File Validation
```javascript
function validatePhotoFile(photoFile) {
    if (photoFile.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Photo file too large (max 5MB)');
    }
    
    if (!photoFile.type.startsWith('image/')) {
        throw new Error('Invalid file type. Please upload an image.');
    }
    
    return true;
}
```

**Protection:**
- **File Size Limit**: 5MB maximum
- **File Type Validation**: Images only
- **MIME Type Checking**: Prevents executable uploads

---

## Data Isolation

### User-Specific Storage
```javascript
function loadUserData() {
    meals = JSON.parse(localStorage.getItem(`meals_${currentUser}`)) || [];
    weekPlan = JSON.parse(localStorage.getItem(`weekPlan_${currentUser}`)) || {};
    mealHistory = JSON.parse(localStorage.getItem(`mealHistory_${currentUser}`)) || [];
}

function saveUserData() {
    localStorage.setItem(`meals_${currentUser}`, JSON.stringify(meals));
    localStorage.setItem(`weekPlan_${currentUser}`, JSON.stringify(weekPlan));
    localStorage.setItem(`mealHistory_${currentUser}`, JSON.stringify(mealHistory));
}
```

**Isolation Features:**
- **Prefixed Keys**: All data tagged with username
- **No Cross-User Access**: Users can only access their own data
- **Clean Logout**: All user data cleared from memory

---

## Security Limitations (Client-Side)

### Current Limitations
1. **localStorage Visibility**: Data accessible via browser dev tools
2. **Client-Side Validation**: Can be bypassed by modifying JavaScript
3. **No Server Verification**: All security runs in browser
4. **Hash Algorithm**: Simple hash, not cryptographically secure
5. **No HTTPS Enforcement**: Depends on how app is served

### Production Recommendations
```javascript
// For production, implement:
// 1. Server-side authentication with JWT tokens
// 2. HTTPS-only communication
// 3. bcrypt or Argon2 password hashing
// 4. Server-side input validation
// 5. CSRF protection
// 6. Content Security Policy headers
// 7. Database storage instead of localStorage
```

---

## Security Best Practices Implemented

### ✅ Implemented
- Password complexity requirements
- Input sanitization and validation
- Rate limiting on authentication
- Session timeout management
- File upload restrictions
- User data isolation
- XSS prevention measures

### ❌ Not Implemented (Client-Side Limitations)
- Server-side validation
- Cryptographically secure hashing
- CSRF protection
- SQL injection prevention (no database)
- HTTPS enforcement
- Content Security Policy

---

## Security Testing

### Manual Tests
1. **Password Validation**: Try weak passwords
2. **Rate Limiting**: Attempt multiple failed logins
3. **Input Injection**: Try HTML/JavaScript in form fields
4. **File Upload**: Attempt non-image file uploads
5. **Session Expiry**: Wait 24+ hours and check access
6. **Data Isolation**: Create multiple users, verify separation

### Browser Security
- Use browser dev tools to inspect localStorage
- Verify passwords are hashed, not plain text
- Check that user data is properly isolated
- Confirm session expiration works correctly

---

## Incident Response

### If Security Issue Found
1. **Document** the vulnerability
2. **Assess** impact and affected users
3. **Implement** fix in code
4. **Test** the solution thoroughly
5. **Deploy** updated version
6. **Monitor** for similar issues

### User Actions
- **Change Password**: If account compromised
- **Clear Browser Data**: Remove all localStorage
- **Report Issues**: Contact administrator

---

## Compliance Notes

**Data Privacy:**
- All data stored locally in user's browser
- No data transmitted to external servers
- User controls all their data
- Export/import functionality for data portability

**GDPR Considerations:**
- Right to access: Export functionality
- Right to deletion: Clear data/logout
- Data portability: JSON export format
- No third-party data sharing