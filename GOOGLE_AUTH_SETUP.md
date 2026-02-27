# Google Authentication Implementation Guide

## Overview
Google OAuth has been integrated into all login and register pages for users, vendors, and riders. This guide explains the frontend implementation and required backend setup.

## Frontend Implementation Summary

### Changes Made:

1. **Dependencies Added**
   - `@react-oauth/google` - Official Google OAuth library for React

2. **New Files Created**
   - `src/utils/googleAuth.js` - Utility functions for decoding and extracting Google user data
   - `src/components/GoogleLoginButton.jsx` - Reusable Google login button component
   - `src/components/GoogleLoginButton.css` - Styling for Google button

3. **Modified Files**
   - `frontend/src/api/authApi.js` - Added `googleRegister()` and `googleLogin()` methods
   - `src/pages/Login.jsx` - Added Google login button and handler
   - `src/pages/Register.jsx` - Added Google register button and handler
   - `src/pages/VendorLogin.jsx` - Added Google login button and handler
   - `src/pages/VendorRegister.jsx` - Added Google register button and handler
   - `src/pages/RiderLogin.jsx` - Added Google login button and handler
   - `src/pages/RiderRegister.jsx` - Added Google register button and handler
   - `src/App.js` - Wrapped app with GoogleOAuthProvider

## Frontend Setup

### 1. Environment Configuration

Create or update `.env` file in the frontend directory:

```env
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

### 2. Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Select "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for local development)
   - Your frontend production URL
7. Add authorized redirect URIs:
   - `http://localhost:3000/login`
   - `http://localhost:3000/register`
   - Your production URLs
8. Copy the Client ID and paste it in `.env`

### 3. Install Dependencies

```bash
cd frontend
npm install
```

## Backend Implementation Required

### 1. Add Dependencies (Java/Spring Boot)

Add to `backend/pom.xml`:

```xml
<!-- Google JWT verification -->
<dependency>
    <groupId>com.google.auth</groupId>
    <artifactId>google-auth-library-oauth2-http</artifactId>
    <version>1.11.1</version>
</dependency>

<!-- JWT processing -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>
```

### 2. Create Google OAuth Service

Create `AuthService` with Google authentication methods:

```java
package com.mealmate.service;

import com.google.auth.oauth2.TokenVerifier;
import com.google.auth.oauth2.GoogleIdToken;
import org.springframework.stereotype.Service;

@Service
public class GoogleAuthService {
    
    private static final String GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
    
    public GoogleIdToken.Payload verifyToken(String token) throws Exception {
        TokenVerifier verifier = GoogleIdToken.getTokenVerifier();
        GoogleIdToken idToken = verifier.verify(token, GOOGLE_CLIENT_ID);
        return idToken.getPayload();
    }
}
```

### 3. Create Google OAuth Controller Endpoints

Create endpoints in your authentication controller:

```java
@PostMapping("/auth/google/login")
public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
    try {
        // Verify the Google token
        GoogleIdToken.Payload payload = googleAuthService.verifyToken(request.getToken());
        
        String email = payload.getEmail();
        String googleId = payload.getSubject();
        String fullName = (String) payload.get("name");
        
        // Find or create user
        User user = userRepository.findByEmail(email)
            .orElse(null);
        
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setFullName(fullName);
            user.setGoogleId(googleId);
            user.setRole(request.getRole());
            userRepository.save(user);
        }
        
        // Generate JWT token
        String jwtToken = jwtTokenProvider.generateToken(user);
        
        return ResponseEntity.ok(new AuthResponse(jwtToken, user, "Login successful"));
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid Google token"));
    }
}

@PostMapping("/auth/google/register")
public ResponseEntity<?> googleRegister(@RequestBody GoogleRegisterRequest request) {
    try {
        // Verify the Google token
        GoogleIdToken.Payload payload = googleAuthService.verifyToken(request.getToken());
        
        String email = payload.getEmail();
        
        // Check if user already exists
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("User already exists with this email"));
        }
        
        // Create new user
        User user = new User();
        user.setEmail(email);
        user.setFullName(request.getFullName());
        user.setGoogleId(request.getGoogleId());
        user.setPassword(generateRandomPassword()); // Google users don't have passwords
        user.setRole(request.getRole());
        
        userRepository.save(user);
        
        // Generate JWT token
        String jwtToken = jwtTokenProvider.generateToken(user);
        
        return ResponseEntity.ok(new AuthResponse(jwtToken, user, "Registration successful"));
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid Google token"));
    }
}
```

### 4. Request/Response DTOs

```java
@Data
public class GoogleLoginRequest {
    private String email;
    private String googleId;
    private String role; // 'user', 'vendor', or 'rider'
}

@Data
public class GoogleRegisterRequest {
    private String email;
    private String fullName;
    private String googleId;
    private String picture;
    private String role;
    private String token;
}

@Data
public class AuthResponse {
    private String token;
    private UserDTO user;
    private String message;
}
```

### 5. Update User Entity

Add Google-related fields to your User entity:

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String email;
    
    private String fullName;
    
    @Column(unique = true)
    private String googleId;
    
    private String password;
    
    private String picture;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    // getters and setters
}
```

### 6. Update application.properties

Add Google configuration:

```properties
# Google OAuth
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
spring.security.oauth2.client.registration.google.redirect-uri={baseUrl}/login/oauth2/code/google
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://accounts.google.com
```

## Frontend API Calls

The frontend now makes these API calls:

### Google Login (All Roles)
```
POST /auth/google/login
{
  "email": "user@example.com",
  "googleId": "123456789",
  "role": "user|vendor|rider"
}
```

### Google Register (All Roles)
```
POST /auth/google/register
{
  "email": "user@example.com",
  "fullName": "User Name",
  "googleId": "123456789",
  "picture": "https://example.com/pic.jpg",
  "role": "user|vendor|rider",
  "token": "google_jwt_token"
}
```

## Security Considerations

1. **Token Verification**: Always verify the Google JWT token on the backend
2. **HTTPS**: Use HTTPS in production
3. **Client ID Security**: Never expose your Google OAuth client secret
4. **CORS**: Configure CORS properly to allow Google OAuth requests
5. **Rate Limiting**: Implement rate limiting on auth endpoints
6. **Database**: Use unique constraints on email and googleId fields

## Testing

### Local Development
1. Set `REACT_APP_GOOGLE_CLIENT_ID` in `.env`
2. Run frontend: `npm start`
3. Run backend: `mvn spring-boot:run`
4. Test Google login/register buttons on:
   - http://localhost:3000/login
   - http://localhost:3000/register
   - http://localhost:3000/vendor-login
   - http://localhost:3000/vendor-register
   - http://localhost:3000/rider-login
   - http://localhost:3000/rider-register

### Troubleshooting

**"Google Maps API is not available"**: Check if Google Client ID is set correctly in `.env`

**"Invalid token"**: Ensure backend is verifying tokens correctly

**"CORS error"**: Add your frontend URL to Google Cloud Console authorized URIs

**"User already exists"**: Clear browser session storage or use a different Google account

## Production Deployment

1. Update Google Cloud Console with production URLs
2. Set environment variables on your hosting platform:
   - `REACT_APP_GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_ID` (backend)
   - `GOOGLE_CLIENT_SECRET` (backend)
3. Use HTTPS for all redirects
4. Test thoroughly before deploying

## Files Modified Summary

### Frontend Files
- `package.json` - Added @react-oauth/google dependency
- `src/App.js` - Added GoogleOAuthProvider wrapper
- `src/api/authApi.js` - Added Google auth methods
- `src/utils/googleAuth.js` - Created utility functions
- `src/components/GoogleLoginButton.jsx` - Created reusable button
- `src/components/GoogleLoginButton.css` - Created styling
- `src/pages/Login.jsx` - Added Google button
- `src/pages/Register.jsx` - Added Google button
- `src/pages/VendorLogin.jsx` - Added Google button
- `src/pages/VendorRegister.jsx` - Added Google button
- `src/pages/RiderLogin.jsx` - Added Google button
- `src/pages/RiderRegister.jsx` - Added Google button

### Backend Files (To be created)
- `GoogleAuthService.java` - JWT verification service
- `GoogleAuthController.java` - REST endpoints
- `GoogleLoginRequest.java` - DTO for login
- `GoogleRegisterRequest.java` - DTO for registration
- Update existing `User.java` entity
- Update existing authentication controller

## Next Steps

1. **Implement Backend**: Follow the backend implementation guide above
2. **Test Integration**: Test Google login/register flows
3. **Error Handling**: Handle edge cases (existing users, token expiration, etc.)
4. **User Verification**: Consider email verification for new accounts
5. **Profile Completion**: For vendors/riders, prompt for additional information after Google auth

## References

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Spring Security OAuth2](https://spring.io/projects/spring-security-oauth)
