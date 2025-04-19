# **MERN Bank System** 🏦🚀  
A **secure, full-stack banking system** built with **React.js, Tailwind CSS, Node.js, Express.js, and MongoDB**, featuring **user authentication, account management, transactions, loans, and notifications**.

**[LIVE HERE](https://mern-bank-system.onrender.com)**


  (Live Link : https://mern-bank-system.onrender.com)
---

## **🔹 Features**  

### **1️⃣ User Authentication & Role Management** 🔐  
- **JWT-based authentication** for security.  
- **Role-based access** for users (`user` & `admin`).  
- **Secure login system** with email notifications for login attempts.  
- **Encrypted passwords** using `bcryptjs`.  

### **2️⃣ Account Management** 💰  
- Users can **deposit, withdraw, and transfer money** securely.  
- Each user is assigned a **unique account number** upon registration.  
- **Admin panel** to manage all user accounts.  

### **3️⃣ Transaction History & Statements** 📜  
- Users can **track their deposits, withdrawals, and transfers**.  
- **Detailed transaction records** stored in MongoDB.  

### **4️⃣ Loan Management System** 🏦  
- Users can **apply for loans**, specifying loan amounts.  
- **Admins can approve or reject** loan applications.  
- **Loan status tracking** for users.  

### **5️⃣ Real-Time Notifications** 📩  
- Users receive **notifications for transactions, login attempts, and loan approvals**.  
- **Email notifications** sent using Nodemailer.  

### **6️⃣ Profile System with Default Avatar** 🖼  
- Users have a **profile photo option** stored in the database.  
- Default profile pictures are generated using **[DiceBear Avatars](https://www.dicebear.com/)**.  

### **7️⃣ Secure API & Authorization** 🔒  
- API routes **protected with authentication middleware**.  
- Secure cookie-based authentication using **HTTP-only cookies**.  

### **8️⃣ Modern UI with Tailwind CSS** 🎨  
- Responsive and sleek **user interface** with **Tailwind CSS**.  
- Intuitive **admin dashboard** for account & loan management.  

### **9️⃣ QR Code-Based Transactions** 📲  
- Users can **generate & scan QR codes** for seamless transactions.  
- Faster money transfers using QR-based authentication.  

---

## **💻 Tech Stack**  

### **Frontend (Client)** 🖥  
- **React.js** - Component-based UI development.  
- **Tailwind CSS** - Modern and responsive UI styling.  

### **Backend (Server)** ⚙️  
- **Node.js & Express.js** - API development.  
- **MongoDB & Mongoose** - Database management.  
- **JWT & Bcrypt.js** - Secure authentication.  
- **Nodemailer** - Email notifications.  

---

## **🚀 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/sarveshbhoyar22/MERN-BANK-SYSTEM.git
cd MERN-BANK-SYSTEM
```

### **2️⃣ Install Dependencies**  
#### **Backend (Server)**
```bash
npm install
```
#### **Frontend (Client)**
```bash
cd frontend
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the **server** directory and add:  
```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### **4️⃣ Run the Application**  
#### **Start Backend**  
```bash
cd server
npm run dev
```
#### **Start Frontend**  
```bash
cd client
npm start
```

---

## **📌 API Endpoints**  

| Endpoint               | Method | Description                         |
|------------------------|--------|-------------------------------------|
| `/api/auth/register`   | POST   | Register a new user.               |
| `/api/auth/login`      | POST   | Login user and return JWT.         |
| `/api/auth/profile`    | GET    | Get logged-in user profile.        |
| `/api/accounts/deposit`| POST   | Deposit money into an account.     |
| `/api/accounts/withdraw` | POST | Withdraw money from an account.    |
| `/api/accounts/transfer` | POST | Transfer money between accounts.   |
| `/api/loans/apply`     | POST   | Apply for a loan.                  |
| `/api/loans/approve/:id` | PATCH | Approve a loan (Admin only).      |
 

🚀 **Feel free to contribute!**  
⭐ If you like this project, **give it a star on GitHub!** 🌟  

🔗 **GitHub Repository:** [MERN-BANK-SYSTEM](https://github.com/sarveshbhoyar22/MERN-BANK-SYSTEM)
