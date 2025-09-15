### Source

```
│   middleware.ts
│
├───app
│   │   favicon.ico
│   │   globals.css
│   │   layout.tsx
│   │   page.tsx
│   │
│   ├───api
│   │   └───users
│   │       ├───(auth)
│   │       │   ├───login
│   │       │   │       route.ts
│   │       │   │
│   │       │   ├───logout
│   │       │   │       route.ts
│   │       │   │
│   │       │   ├───signup
│   │       │   │       route.ts
│   │       │   │
│   │       │   └───verifyemail
│   │       │           route.ts
│   │       │
│   │       ├───(resetPassword)
│   │       │   ├───resetPasswd
│   │       │   │       route.ts
│   │       │   │
│   │       │   └───sendResetEmail
│   │       │           route.ts
│   │       │
│   │       └───me
│   │               route.ts
│   │
│   ├───login
│   │       page.tsx
│   │
│   ├───profile
│   │   │   page.tsx
│   │   │
│   │   └───[id]
│   │           page.tsx
│   │
│   ├───resetPassword
│   │       page.tsx
│   │
│   ├───signup
│   │       page.tsx
│   │
│   └───verifyEmail
│           page.tsx
│
├───dbConfig
│       dbConfig.ts
│
├───helpers
│       getDataFromToken.ts
│       mailer.ts
│
└───models
        userModel.js
```
