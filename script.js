```javascript
"use strict";

// =====================================
// DAILYUSEFUL - MAIN JAVASCRIPT
// =====================================

// Safely read and validate numeric inputs.
function readNumber(id, label, options = {}) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(
      `Input field "${id}" was not found. Check its HTML ID.`
    );
  }

  const raw = element.value.trim();

  if (raw === "") {
    throw new Error(`Please enter ${label}.`);
  }

  const value = Number(raw);

  if (!Number.isFinite(value)) {
    throw new Error(`Please enter a valid ${label}.`);
  }

  if (options.min !== undefined && value < options.min) {
    throw new Error(`${label} must be at least ${options.min}.`);
  }

  if (options.max !== undefined && value > options.max) {
    throw new Error(`${label} cannot exceed ${options.max}.`);
  }

  return value;
}

// =====================================
// CURRENCY SETTINGS
// =====================================

const supportedCurrencies = {
  KES: "en-KE",
  USD: "en-US",
  GBP: "en-GB",
  EUR: "en-IE",
  TZS: "en-TZ",
  UGX: "en-UG",
  NGN: "en-NG",
  ZAR: "en-ZA",
  INR: "en-IN",
  CAD: "en-CA",
  AUD: "en-AU"
};

let selectedCurrency = "KES";

function money(value) {
  const currency = supportedCurrencies[selectedCurrency]
    ? selectedCurrency
    : "KES";

  try {
    return new Intl.NumberFormat(
      supportedCurrencies[currency],
      {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    ).format(value);
  } catch (error) {
    return `${currency} ${Number(value).toFixed(2)}`;
  }
}

function setupCurrencySelector() {
  const selector = document.getElementById("currency-select");

  if (!selector) {
    console.warn('Currency selector "#currency-select" was not found.');
    return;
  }

  if (supportedCurrencies[selector.value]) {
    selectedCurrency = selector.value;
  } else {
    selector.value = selectedCurrency;
  }

  selector.addEventListener("change", function () {
    if (supportedCurrencies[selector.value]) {
      selectedCurrency = selector.value;
    }
  });
}

// =====================================
// DISPLAY RESULTS
// =====================================

function showResult(id, message) {
  const element = document.getElementById(id);

  if (!element) {
    console.error(`Result element "#${id}" was not found.`);
    return;
  }

  element.textContent = message;
}

// =====================================
// 1. SALARY CALCULATOR
// =====================================

function calculateSalary() {
  try {
    const gross = readNumber(
      "gross-salary",
      "your gross salary",
      { min: 0 }
    );

    const deductions = readNumber(
      "salary-deductions",
      "your total deductions",
      { min: 0 }
    );

    if (deductions > gross) {
      throw new Error(
        "Deductions cannot exceed your gross salary."
      );
    }

    const net = gross - deductions;
    const annualNet = net * 12;

    showResult(
      "salary-result",
      `Estimated monthly take-home pay: ${money(net)}. ` +
      `Estimated annual take-home pay: ${money(annualNet)}.`
    );
  } catch (error) {
    showResult("salary-result", error.message);
  }
}

// =====================================
// 2. LOAN CALCULATOR
// =====================================

function calculateLoan() {
  try {
    const principal = readNumber(
      "loan-amount",
      "the loan amount",
      { min: 0.01 }
    );

    const annualRate = readNumber(
      "loan-rate",
      "the annual interest rate",
      { min: 0, max: 1000 }
    );

    const years = readNumber(
      "loan-years",
      "the loan term in years",
      { min: 0.1, max: 100 }
    );

    const months = Math.round(years * 12);

    if (months < 1) {
      throw new Error("The loan term must be at least one month.");
    }

    const monthlyRate = annualRate / 1200;
    let payment;

    if (monthlyRate === 0) {
      payment = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      payment =
        principal * monthlyRate * factor / (factor - 1);
    }

    if (!Number.isFinite(payment)) {
      throw new Error("Unable to calculate the repayment. Check your inputs.");
    }

    const totalPaid = payment * months;
    const totalInterest = totalPaid - principal;

    showResult(
      "loan-result",
      `Estimated monthly payment: ${money(payment)}. ` +
      `Total repayment: ${money(totalPaid)}. ` +
      `Estimated total interest: ${money(totalInterest)}. ` +
      `Loan term: ${months} months.`
    );
  } catch (error) {
    showResult("loan-result", error.message);
  }
}

// =====================================
// 3. DISCOUNT CALCULATOR
// =====================================

function calculateDiscount() {
  try {
    const price = readNumber(
      "original-price",
      "the original price",
      { min: 0 }
    );

    const rate = readNumber(
      "discount-rate",
      "the discount percentage",
      { min: 0, max: 100 }
    );

    const savings = price * rate / 100;
    const finalPrice = price - savings;

    showResult(
      "discount-result",
      `Original price: ${money(price)}. ` +
      `Discount: ${rate}%. ` +
      `You save: ${money(savings)}. ` +
      `Final sale price: ${money(finalPrice)}.`
    );
  } catch (error) {
    showResult("discount-result", error.message);
  }
}

// =====================================
// 4. PERCENTAGE CALCULATOR
// =====================================

function calculatePercentage() {
  try {
    const percent = readNumber("percent", "the percentage");
    const number = readNumber("number", "the number");

    const answer = percent / 100 * number;

    showResult(
      "result",
      `${percent}% of ${number.toLocaleString("en-KE")} = ` +
      answer.toLocaleString("en-KE", {
        maximumFractionDigits: 8
      })
    );
  } catch (error) {
    showResult("result", error.message);
  }
}

// =====================================
// 5. WORD AND CHARACTER COUNTER
// =====================================

let textInput = null;

function updateTextCounts() {
  if (!textInput) return;

  const value = textInput.value;
  const trimmed = value.trim();

  const words = trimmed === ""
    ? 0
    : trimmed.split(/\s+/u).length;

  const wordCount = document.getElementById("word-count");
  const charCount = document.getElementById("char-count");

  if (wordCount) {
    wordCount.textContent = words.toLocaleString("en-KE");
  }

  if (charCount) {
    charCount.textContent = value.length.toLocaleString("en-KE");
  }
}

function clearText() {
  if (!textInput) {
    textInput = document.getElementById("text-input");
  }

  if (!textInput) {
    console.error('Text area "#text-input" was not found.');
    return;
  }

  textInput.value = "";
  updateTextCounts();
}

// =====================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =====================================

// This supports buttons using onclick="calculateSalary()",
// onclick="calculateLoan()", and similar HTML attributes.
window.calculateSalary = calculateSalary;
window.calculateLoan = calculateLoan;
window.calculateDiscount = calculateDiscount;
window.calculatePercentage = calculatePercentage;
window.updateTextCounts = updateTextCounts;
window.clearText = clearText;

// =====================================
// INITIALISE AFTER THE PAGE LOADS
// =====================================

function initialiseDailyUseful() {
  setupCurrencySelector();

  textInput = document.getElementById("text-input");

  if (textInput) {
    textInput.addEventListener("input", updateTextCounts);
  } else {
    console.warn('Text area "#text-input" was not found.');
  }

  updateTextCounts();

  console.log("DailyUseful JavaScript loaded successfully.");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialiseDailyUseful,
    { once: true }
  );
} else {
  initialiseDailyUseful();
}
```
