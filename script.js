
"use strict";

function getValue(id) {
  const input = document.getElementById(id);

  if (!input) {
    throw new Error("Missing input: " + id);
  }

  const value = input.value.trim();

  if (value === "") {
    throw new Error("Please fill in all required fields.");
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error("Please enter valid numbers.");
  }

  return number;
}

function showResult(id, message) {
  const output = document.getElementById(id);

  if (output) {
    output.textContent = message;
  }
}

function money(value) {
  return "KSh " + value.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calculateSalary() {
  try {
    const salary = getValue("gross-salary");
    const deductions = getValue("salary-deductions");

    if (salary < 0 || deductions < 0) {
      throw new Error("Amounts cannot be negative.");
    }

    if (deductions > salary) {
      throw new Error("Deductions cannot exceed salary.");
    }

    showResult(
      "salary-result",
      "Take-home pay: " + money(salary - deductions)
    );
  } catch (error) {
    showResult("salary-result", error.message);
  }
}

function calculateLoan() {
  try {
    const principal = getValue("loan-amount");
    const annualRate = getValue("loan-rate");
    const years = getValue("loan-years");

    if (principal <= 0 || annualRate < 0 || years <= 0) {
      throw new Error("Enter a positive loan amount and term, and a non-negative interest rate.");
    }

    const months = Math.round(years * 12);
    const rate = annualRate / 1200;

    const payment = rate === 0
      ? principal / months
      : principal * rate * Math.pow(1 + rate, months) /
        (Math.pow(1 + rate, months) - 1);

    showResult(
      "loan-result",
      "Monthly payment: " + money(payment) +
      " | Total repayment: " + money(payment * months)
    );
  } catch (error) {
    showResult("loan-result", error.message);
  }
}

function calculateDiscount() {
  try {
    const price = getValue("original-price");
    const discount = getValue("discount-rate");

    if (price < 0 || discount < 0 || discount > 100) {
      throw new Error("Price must be non-negative and discount must be 0–100%.");
    }

    const savings = price * discount / 100;

    showResult(
      "discount-result",
      "Final price: " + money(price - savings) +
      " | You save: " + money(savings)
    );
  } catch (error) {
    showResult("discount-result", error.message);
  }
}

function calculatePercentage() {
  try {
    const percentage = getValue("percent");
    const number = getValue("number");

    showResult(
      "result",
      percentage + "% of " + number + " = " +
      (percentage / 100 * number).toLocaleString("en-KE")
    );
  } catch (error) {
    showResult("result", error.message);
  }
}

function updateTextCounts() {
  const input = document.getElementById("text-input");
  if (!input) return;

  const text = input.value.trim();
  const words = text ? text.split(/\s+/).length : 0;

  document.getElementById("word-count").textContent = words;
  document.getElementById("char-count").textContent =
    input.value.length;
}

function clearText() {
  const input = document.getElementById("text-input");
  if (!input) return;

  input.value = "";
  updateTextCounts();
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("text-input");

  if (input) {
    input.addEventListener("input", updateTextCounts);
  }

  updateTextCounts();
});

window.calculateSalary = calculateSalary;
window.calculateLoan = calculateLoan;
window.calculateDiscount = calculateDiscount;
window.calculatePercentage = calculatePercentage;
window.updateTextCounts = updateTextCounts;
window.clearText = clearText;

console.log("DailyUseful calculators loaded.");
