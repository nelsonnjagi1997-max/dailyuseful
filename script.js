
"use strict";

function readNumber(id, label, options = {}) {
  const element = document.getElementById(id);
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

function money(value) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function showResult(id, message) {
  document.getElementById(id).textContent = message;
}

function calculateSalary() {
  try {
    const gross = readNumber("gross-salary", "your gross salary", {
      min: 0
    });

    const deductions = readNumber(
      "salary-deductions",
      "your total deductions",
      { min: 0 }
    );

    if (deductions > gross) {
      throw new Error("Deductions cannot exceed gross salary.");
    }

    const net = gross - deductions;

    showResult(
      "salary-result",
      `Estimated take-home pay: ${money(net)} per month. ` +
      `Annual estimate: ${money(net * 12)}.`
    );
  } catch (error) {
    showResult("salary-result", error.message);
  }
}

function calculateLoan() {
  try {
    const principal = readNumber("loan-amount", "the loan amount", {
      min: 0.01
    });

    const annualRate = readNumber(
      "loan-rate",
      "the annual interest rate",
      { min: 0, max: 1000 }
    );

    const years = readNumber("loan-years", "the loan term", {
      min: 0.1,
      max: 100
    });

    const months = Math.round(years * 12);

    if (months < 1) {
      throw new Error("The loan term must be at least one month.");
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
      `Estimated interest: ${money(totalInterest)}. ` +
      `Term: ${months} months.`
    );
  } catch (error) {
    showResult("loan-result", error.message);
  }
}

function calculateDiscount() {
  try {
    const price = readNumber("original-price", "the original price", {
      min: 0
    });

    const rate = readNumber("discount-rate", "the discount percentage", {
      min: 0,
      max: 100
    });

    const savings = price * rate / 100;
    const finalPrice = price - savings;

    showResult(
      "discount-result",
      `Sale price: ${money(finalPrice)}. ` +
      `You save: ${money(savings)} (${rate}%).`
    );
  } catch (error) {
    showResult("discount-result", error.message);
  }
}

function calculatePercentage() {
  try {
    const percent = readNumber("percent", "the percentage");
    const number = readNumber("number", "the number");

    const answer = percent / 100 * number;

    showResult(
      "result",
      `${percent}% of ${number} = ` +
      answer.toLocaleString("en-KE", {
        maximumFractionDigits: 8
      })
    );
  } catch (error) {
    showResult("result", error.message);
  }
}

const textInput = document.getElementById("text-input");

textInput.addEventListener("input", function () {
  const value = textInput.value;
  const trimmed = value.trim();

  const words = trimmed === ""
    ? 0
    : trimmed.split(/\s+/).length;

  document.getElementById("word-count").textContent =
    words.toLocaleString("en-KE");

  document.getElementById("char-count").textContent =
    value.length.toLocaleString("en-KE");
});

function clearText() {
  textInput.value = "";
  textInput.dispatchEvent(new Event("input"));
}
