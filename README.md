# Birthday Gallery 
A simple web application to display a gallery of birthday image moments.

## Features
- Upload and display birthday images
- Responsive design
- Easy to use interface
- Image gallery with thumbnails

## Technologies Used
- React
- Node.js
- Express
- MongoDB
- Bootstrap

```mermaid 
graph TD
    A[Start] --> B{User Type?}
    B -->|Regular User| C[User Login]
    B -->|Admin| D[Admin Login]
    
    %% Regular User Flow
    C --> E{Authenticated?}
    E -->|No| F[Display Login Form]
    F --> G[Enter Email]
    G --> H[Submit Login]
    H --> E
    
    E -->|Yes| I[User Dashboard]
    I --> J[View Gallery]
    I --> K[Upload Media]
    
    %% Upload Flow
    K --> L[Fill Upload Form]
    L --> L1[Enter Title]
    L --> L2[Enter Caption]
    L --> L3[Upload Media]
    L3 --> L3a[Show Preview]
    L --> L4[Enter Poster Name]
    L1 & L2 & L3a & L4 --> M[Submit Media]
    M --> N[Show Upload Progress]
    N --> O{Upload Complete?}
    O -->|Yes| P[Success Message]
    O -->|No| Q[Error Message]
    Q --> L
    P --> J
    
    %% Gallery View Flow
    J --> R[Browse Media Grid]
    R --> S[View Media Details]
    S --> T[Return to Gallery]
    T --> R
    
    %% Admin Flow
    D --> U{Authenticated as Admin?}
    U -->|No| F
    U -->|Yes| V[Admin Dashboard]
    V --> W[View All Uploads]
    W --> X[Review Content]
    X --> Y{Decision?}
    Y -->|Approve| Z[Mark as Approved]
    Y -->|Delete| AA[Remove Content]
    Z & AA --> W
    
    %% Mobile Responsiveness
    subgraph Mobile View
    AB[Responsive Layout]
    AC[Adjusted Touch Targets]
    AD[Optimized Media Display]
    end
    
    I -.-> AB
    V -.-> AB