import asyncHandler from "express-async-handler";
import Account from "../models/Account.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { sendEmail } from "../utils/emailService.js";
import Notification from "../models/Notification.js";
import { io } from "../server.js";

// ✅ Get account details (Only for the account owner)
export const getAccountDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const account = await Account.findOne({ user: user._id });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  res.status(200).json(account);
});
export const getAccountDetailsall = asyncHandler(async (req, res) => {
  //  const users = await User.find().select("-password"); // Exclude password
  //  res.status(200).json(users);
  const users = await User.find().select("-password");
  const accounts = await Account.find().select("-password");

  res.status(200).json({ users, accounts });
});

// ✅ Deposit money (Only the account owner can deposit)
export const depositMoney = asyncHandler(async (req, res) => {
  const { amount, accountNumber } = req.body;
  const accountId = req.params.id;

  const account = await Account.findOne({ accountNumber });

  const user = await User.findById(req.user._id);
  const userId = user._id;

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Invalid deposit amount");
  }

  account.balance += parseInt(amount);
  await account.save();

   const transaction = await Transaction.create({
     sender: account,
     receiver: account,
     amount,
     type: "deposit",
     status: "success",
   });

   await transaction.save();

   if (transaction) {
     console.log("Deposit-transaction saved successfully");
   } else {
     console.log("Deposit-transaction not saved successfully");
   }

  const depositNotification = new Notification({
    user: user._id,
    message: `You have successfully deposited $${amount} to your account.`,
    type: "transaction",
  });

  const notification = await depositNotification.save();

  if (notification) {
    console.log("Notification saved successfully");

    // Emit event to frontend in real-time
    io.to(userId.toString()).emit("newNotification", notification);
  }

  const email = user.email;

  sendEmail(
    email,
    "Deposit Notification",
    `You have successfully deposited $${amount}.`
  );

 

  res.status(200).json({
    message: `$${amount} deposited successfully`,
    balance: account.balance,
  });
});

// ✅ Withdraw money (Only if user has enough balance)
export const withdrawMoney = asyncHandler(async (req, res) => {
  const { amount, accountNumber } = req.body;
  const account = await Account.findOne({ accountNumber });
  const user = await User.findById(req.user._id);

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Invalid withdrawal amount");
  }

  if (account.balance < amount) {
    res.status(400);
    throw new Error("Insufficient funds for withdrawal");
  }

  account.balance = account.balance - parseInt(amount);
  await account.save();

  const transaction = await Transaction.create({
    sender: account,
    receiver: null,
    amount,
    type: "withdraw",
    status: "success",
  });

  await transaction.save();

  if(transaction){
    console.log("Withdraw-transaction saved successfully");
  }else{
    console.log("Withdraw-transaction not saved successfully");
  }


  const withdrawNotification = new Notification({
    user: user._id,
    message: `You have successfully withdrawn $${amount} from your account.`,
    type: "transaction",
  });

  const notification = await withdrawNotification.save();
  const userId = user._id;
  if (notification) {
    console.log("Notification saved successfully");

    // Emit event to frontend in real-time
    io.to(userId.toString()).emit("newNotification", notification);
  }

  const email = user.email;

  sendEmail(
    email,
    "Deposit Notification",
    ` You have successfully withdrawn $${amount} from your account.`
  );

  

  res.status(200).json({
    message: `₹${amount} withdrawn successfully`,
    balance: account.balance,
  });
});

// ✅ Transfer money (User can transfer to another account)
export const transferMoney = asyncHandler(async (req, res) => {
  const { amount, receiverAccountNumber } = req.body;

  const senderUser = await User.findById(req.user._id);

  const senderAccountId = senderUser.accountId;
  const senderAccount = await Account.findById(senderAccountId);

  const receiverAccount = await Account.findOne({
    accountNumber: receiverAccountNumber,
  });

  const receiverUser = await User.findOne({ accountId: receiverAccount._id });

  if (!senderAccount) {
    res.status(404);
    throw new Error("Sender account not found");
  }

  if (!receiverAccount) {
    res.status(404);
    throw new Error("Receiver account not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Invalid transfer amount");
  }

  if (senderAccount.balance < amount) {
    res.status(400);
    throw new Error("Insufficient funds for transfer");
  }

  senderAccount.balance -= parseInt(amount);
  receiverAccount.balance += parseInt(amount);

  await senderAccount.save();
  await receiverAccount.save();

  // Log transaction
  const transaction = await Transaction.create({
    sender: senderAccount._id,
    receiver: receiverAccount._id,
    amount,
    type: "transfer",
    status: "success",
    
  });

  await transaction.save();

  //sender get's notification
  const sentMoneyNotification = new Notification({
    user: senderUser._id,
    message: `You have successfully sent $${amount} to account:name -${receiverUser.name}, account number- ${receiverAccount.accountNumber}.`,
    type: "transaction",
  });

  const notification1 = await sentMoneyNotification.save();

  if (notification1) {
    console.log(
      "Sending notification to senderUser :",
      senderUser._id.toString()
    );
    // Emit event to frontend in real-time
    io.to(senderUser._id.toString()).emit("newNotification", notification1);
  }

  //receiver get's notification
  const receivedMoneyNotification = new Notification({
    user: receiverUser._id,
    message: `Your account has received $${amount} from account:name -${senderUser.name}, account number- ${senderAccount.accountNumber}.`,
    type: "transaction",
  });

  const notification2 = await receivedMoneyNotification.save();

  if (notification2) {
    console.log(
      "Sending notification to receiverUser:",
      receiverUser._id.toString()
    );

    // Emit event to frontend in real-time
    io.to(receiverUser._id.toString()).emit("newNotification", notification2);
  }

  ///email

  const senderEmail = senderUser.email;
  console.log("senderEmail:", senderEmail);
  const receiverEmail = receiverUser.email;

  sendEmail(
    senderEmail,
    "Successful Transfer",
    `You have successfully transferred $${amount} to account:name -${receiverUser.name}, account number- ${receiverAccount.accountNumber}.`
  );

  sendEmail(
    receiverEmail,
    "Money Received",
    `You have received $${amount} from account:name -${senderUser.name}, account number- ${senderAccount.accountNumber}.`
  );

  res.json({
    message:
      "Amount $" +
      amount +
      " Transfered successfully to this account :" +
      receiverAccount.accountNumber,
    senderBalance: senderAccount.balance,
  });

});


export const getTransaction = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userAccount = await Account.findOne({ user: user._id });
  
    if (!userAccount) {
      return res.status(404).json({ message: "User account not found" });
    }
  
    const transactions = await Transaction.find({
      $or: [
        { sender: userAccount._id },
        { receiver: userAccount._id },
        { type: "deposit", sender: user._id },
        { type: "withdraw", sender: user._id },
      ],
    })
      .populate({
        path: "sender",
        populate: { path: "user", select: "name email" },
      })
      .populate({
        path: "receiver",
        populate: { path: "user", select: "name email" },
      })
      .sort({ createdAt: -1 }); // Sort by latest transactions first
  
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Delete an account (Admin only)
export const deleteAccount = asyncHandler(async (req, res) => {
  const { accountNumber, email } = req.body;
  const account = await Account.findByOne({ accountNumber });
  const user = await User.findByOne({ email });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  await account.deleteOne();
  await user.deleteOne();
  res.status(200).json({ message: "Account deleted successfully" });
});
