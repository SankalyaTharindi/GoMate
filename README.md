# GoMate – Smart Travel Companion App  

GoMate is a **React Native mobile application** built to make travel planning simple and intuitive.  
Users can explore destinations, view transport routes, save favourites, and manage profiles — all with a modern, mobile-first design.

This repository contains both:
- **Mobile App Source Code** (in the `/app` folder)
- **Mock REST API** (JSON Server hosted via GitHub on the `destinations` branch)

## Features  

### **User Management**
- Create account & log in using local storage (AsyncStorage)
- Persistent login state between sessions
- Personalized profile view with username display
- Logout functionality with redirect to sign-in screen

### **Favourites System**
- Add/remove destinations from favourites instantly  
- Each user has a separate favourites list  
- Data persists locally per user using AsyncStorage  

### **Destinations & Route Info**
- Explore destinations retrieved from a mock REST API  
- Detailed route information including:
  - Transport type (bus/train)
  - Duration
  - Estimated fare  
- “Most Convenient” route highlighted in details view  

### **Dark & Light Mode**
- Toggle between dark and light themes  
- User preference is saved for seamless experience  

### **Modern UI/UX**
- Splash screen with animated logo  
- Custom app icon  
- Clean and responsive card-based layout  
- Smooth navigation between screens  
