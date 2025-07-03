# 🔐 Password Strength & Breach Checker

> A real-time password strength checker designed to help users avoid weak or compromised passwords in the wake of the world’s biggest password breach.

---

## 🎯 Project Aim

This project is built to **verify password strength** and protect users from brute-force attacks and credential stuffing, especially due to commonly used or breached passwords found in public leaks like `rockyou.txt` and HaveIBeenPwned datasets.

🔒 **The core goal is to encourage strong password practices**, especially now, after the world has experienced one of the **largest-ever password breaches**.

---

## 🚀 Tech Stack Used

- **HTML5** – Page structure
- **CSS3** – Responsive design + Dark/Light mode
- **JavaScript (Vanilla)** – Core logic, validation, and API
- **Live Server** – Local development
- **HaveIBeenPwned API** – Secure breach check using SHA-1 & k-anonymity
- **rockyou.txt** (subset) – Common wordlist password checker

---

Output images

web-view : 
![Password Strength Checker Screenshot](https://github.com/your-username/password-checker/blob/main/images/web-view.png)

Mobile-View
![Password Strength Checker Screenshot](https://github.com/your-username/password-checker/blob/main/images/mobile-view.png)

Working : 
![Password Strength Checker Screenshot](https://github.com/your-username/password-checker/blob/main/images/working.png)



## ✨ Features

### 🔐 Security Focused
- ✅ **Password Length Check** (min 8, bonus for 12+)
- ✅ **Complexity Analysis** (uppercase, numbers, symbols)
- ✅ **SQL Injection Pattern Filter** to avoid risky character combinations
- ✅ **Wordlist Check** against commonly used passwords (`rockyou.txt`)
- ✅ **Breached Database Check** via HaveIBeenPwned API using SHA-1 hashing & privacy-safe querying
- ✅ **Real-time Feedback** as the user types

### 🎨 UI/UX Focused
- ✨ **Live Strength Meter** with color transitions
- ✨ **Modular Criteria Status** (length ✅, complexity ✅, breached ❌)
- ✨ **Dark & Light Theme Toggle** 🌗
- ✨ **Animated Slide-in Result Box**
- ✨ **Password Show/Hide Toggle** (👁️ / 🙈)
- ✨ **Mobile Responsive Design** – Fully functional across screen sizes

---

## 📦 How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/password-checker.git
   cd password-checker
