# 🚀 Amazon Clone - Quick Start Guide

## ⚠️ IMPORTANT: Pehle Ye Steps Follow Karo

### Step 1: Dependencies Install Karo
```bash
npm install
```
**Ya double-click on:** `fix-and-run.bat`

### Step 2: App Start Karo
```bash
npm start
```

### Step 3: Browser Mein Open Karo
App automatically open hoga at: **http://localhost:3000**

---

## 📍 Available Routes (URLs)

Jab app start ho jaye, ye URLs kaam karenge:

### Main Pages
- **Homepage**: http://localhost:3000/
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup
- **Cart**: http://localhost:3000/cart
- **Wishlist**: http://localhost:3000/wishlist
- **Checkout**: http://localhost:3000/checkout
- **Orders**: http://localhost:3000/orders
- **Profile**: http://localhost:3000/profile

### Product Pages
- **Product Detail**: http://localhost:3000/product/1
- **Search**: http://localhost:3000/search?q=phone
- **Category**: http://localhost:3000/category/electronics

---

## ❌ 404 Error Kyu Aa Raha Hai?

### Reason 1: App Start Nahi Hua
✅ **Solution**: Terminal mein `npm start` run karo

### Reason 2: Wrong URL
✅ **Solution**: Sirf `http://localhost:3000` use karo, file path nahi

### Reason 3: Dependencies Install Nahi Hui
✅ **Solution**: Pehle `npm install` run karo

---

## 🔍 Check Karo

### App Chal Raha Hai Ya Nahi?
Terminal mein ye dikhna chahiye:
```
Compiled successfully!

You can now view amazon-clone in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Browser Mein Kya Dikhna Chahiye?
- ✅ Amazon-style navbar with search bar
- ✅ Category sections
- ✅ Product cards
- ✅ Footer

### Agar Kuch Nahi Dikh Raha?
1. Terminal check karo - koi error hai?
2. Browser console check karo (F12 press karo)
3. `npm start` dubara run karo

---

## 🆘 Common Problems & Solutions

### Problem 1: "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem 2: Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Then run
npm start
```

### Problem 3: App not loading
```bash
# Clear cache and restart
npm cache clean --force
npm install
npm start
```

---

## ✅ Correct Way to Run

1. Open terminal in project folder
2. Run: `npm install` (first time only)
3. Run: `npm start`
4. Wait for "Compiled successfully!"
5. Browser automatically opens at http://localhost:3000
6. Enjoy! 🎉

---

## 📝 Notes

- **NEVER** open HTML files directly in browser
- **ALWAYS** use http://localhost:3000
- **App must be running** in terminal
- **Port 3000** should be free

---

## 🎯 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

**Bhai, bas `npm start` run karo aur http://localhost:3000 pe jao. Sab kaam karega! 🚀**
