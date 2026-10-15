```javascript
"use strict";

// =====================================
// DAILYUSEFUL - MAIN JAVASCRIPT
// =====================================

// Read and validate numeric input.
function readNumber(id, label, options = {}) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error("A required calculator field could not be found.");
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
    throw new Error(`${label} cannot be less than ${options.min}.`);
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
  KES: { locale: "en-KE", name: "Kenyan shillings" },
  USD: { locale: "en-US", name: "US dollars" },
  GBP: { locale: "en-GB", name: "British pounds" },
  EUR: { locale: "en-IE", name: "euros" },
  TZS: { locale: "en-TZ", name: "Tanzanian shillings" },
  UGX: { locale: "en-UG", name: "Ugandan shillings" },
  NGN: { locale: "en-NG", name: "Nigerian naira" },
  ZAR: { locale: "en-ZA", name: "South African rand" },
  INR: { locale: "en-IN", name: "Indian rupees" },
  CAD: { locale: "en-CA", name: "Canadian dollars" },
  AUD: { locale: "en-AU", name: "Australian dollars" }
};

let selectedCurrency = "KES";

function money(value) {
  const currency = supportedCurrencies[selectedCurrency]
    ? selectedCurrency
    : "KES";

  const locale = supportedCurrencies[currency].locale;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch (error) {
    return `${currency} ${Number(value).toFixed(2)}`;
  }
}


// Update the display currency when the visitor changes the selector.
// This changes formatting only. It does not convert exchange rates.
function setupCurrencySelector() {
  const selector = document.getElementById("currency-select");

  if (!selector) return;

  selector.value = selectedCurrency;

  selector.addEventListener("change", function () {
    if (supportedCurrencies[selector.value]) {
      selectedCurrency = selector.value;
    }
  });
}


// =====================================
// RESULTS
// =====================================

function showResult(id, message) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = message;
  }
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
// 2. LOAN REPAYMENT CALCULATOR
// =====================================

// Uses a fixed annual interest rate converted to a monthly rate,
// with equal monthly repayments over the loan term.

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
      "the loan term",
      { min: 0.1, max: 100 }
    );

    const months = Math.round(years * 12);

    if (months < 1) {
      throw new Error(
        "The loan term must be at least one month."
      );
    }

    const monthlyRate = annualRate / 100 / 12;

    let payment;

    if (monthlyRate === 0) {
      payment = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      payment =
        principal *
        (monthlyRate * factor) /
        (factor - 1);
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
    const percent = readNumber(
      "percent",
      "the percentage"
    );

    const number = readNumber(
      "number",
      "the number"
    );

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

const textInput = document.getElementById("text-input");

if (textInput) {
  textInput.addEventListener("input", updateTextCounts);
}

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
    wordCount.textContent =
      words.toLocaleString("en-KE");
  }

  if (charCount) {
    charCount.textContent =
      value.length.toLocaleString("en-KE");
  }
}

function clearText() {
  if (!textInput) return;

  textInput.value = "";
  updateTextCounts();
}


// =====================================
// INITIALISE THE WEBSITE
// =====================================

document.addEventListener("DOMContentLoaded", function () {
  setupCurrencySelector();
  updateTextCounts();
});
```
