
"use strict";

const DailyUseful = {
  currency: "KES",

  getNumber(id) {
    const input = document.getElementById(id);

    if (!input) {
      throw new Error("A required input field is missing: " + id);
    }

    const raw = input.value.trim();

    if (raw === "") {
      throw new Error("Please fill in all required fields.");
    }

    const value = Number(raw);

    if (!Number.isFinite(value)) {
      throw new Error("Please enter a valid number.");
    }

    return value;
  },

  formatNumber(value) {
    return new Intl.NumberFormat("en-KE", {
      maximumFractionDigits: 2
    }).format(value);
  },

  money(value) {
    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: this.currency,
        maximumFractionDigits: 2
      }).format(value);
    } catch (error) {
      return this.currency + " " + this.formatNumber(value);
    }
  },

  showResult(id, message, isError = false) {
    const output = document.getElementById(id);

    if (!output) {
      console.error("Missing result element:", id);
      return;
    }

    output.textContent = message;
    output.classList.toggle("error", isError);
    output.classList.toggle("success", !isError);
  },

  runSafely(resultId, calculation) {
    try {
      calculation();
    } catch (error) {
      console.error("Calculator error:", error);
      this.showResult(
        resultId,
        error.message || "Something went wrong. Please try again.",
        true
      );
    }
  },

  calculateSalary() {
    this.runSafely("salary-result", () => {
      const salary = this.getNumber("gross-salary");
      const deductions = this.getNumber("salary-deductions");

      if (salary < 0 || deductions < 0) {
        throw new Error("Salary and deductions cannot be negative.");
      }

      if (deductions > salary) {
        throw new Error("Deductions cannot exceed the gross salary.");
      }

      const netPay = salary - deductions;

      this.showResult(
        "salary-result",
        "Take-home pay: " + this.money(netPay)
      );
    });
  },

  calculateLoan() {
    this.runSafely("loan-result", () => {
      const principal = this.getNumber("loan-amount");
      const annualRate = this.getNumber("loan-rate");
      const years = this.getNumber("loan-years");

      if (principal <= 0) {
        throw new Error("Loan amount must be greater than zero.");
      }

      if (annualRate < 0 || annualRate > 1000) {
        throw new Error("Interest rate must be between 0 and 1000%.");
      }

      if (years <= 0 || years > 100) {
        throw new Error("Loan term must be greater than zero and no more than 100 years.");
      }

      const months = Math.round(years * 12);

      if (months < 1 || months > 1200) {
        throw new Error("Please enter a valid loan term.");
      }

      const monthlyRate = annualRate / 1200;
      let monthlyPayment;

      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        const factor = Math.pow(1 + monthlyRate, months);

        monthlyPayment =
          principal * monthlyRate * factor / (factor - 1);
      }

      const totalPaid = monthlyPayment * months;
      const totalInterest = totalPaid - principal;

      this.showResult(
        "loan-result",
        "Monthly payment: " + this.money(monthlyPayment) +
        " | Total repayment: " + this.money(totalPaid) +
        " | Total interest: " + this.money(totalInterest)
      );
    });
  },

  calculateDiscount() {
    this.runSafely("discount-result", () => {
      const price = this.getNumber("original-price");
      const discount = this.getNumber("discount-rate");

      if (price < 0) {
        throw new Error("Original price cannot be negative.");
      }

      if (discount < 0 || discount > 100) {
        throw new Error("Discount must be between 0% and 100%.");
      }

      const savings = price * discount / 100;
      const finalPrice = price - savings;

      this.showResult(
        "discount-result",
        "Final price: " + this.money(finalPrice) +
        " | You save: " + this.money(savings)
      );
    });
  },

  calculatePercentage() {
    this.runSafely("result", () => {
      const percentage = this.getNumber("percent");
      const number = this.getNumber("number");
      const answer = percentage / 100 * number;

      this.showResult(
        "result",
        this.formatNumber(percentage) + "% of " +
        this.formatNumber(number) + " = " +
        this.formatNumber(answer)
      );
    });
  },

  updateTextCounts() {
    const input = document.getElementById("text-input");
    const wordsOutput = document.getElementById("word-count");
    const charactersOutput = document.getElementById("char-count");

    if (!input || !wordsOutput || !charactersOutput) {
      console.error("Word counter HTML elements are missing.");
      return;
    }

    const value = input.value;
    const trimmed = value.trim();
    const words = trimmed ? trimmed.split(/\s+/u).length : 0;
    const characters = [...value].length;

    wordsOutput.textContent = this.formatNumber(words);
    charactersOutput.textContent = this.formatNumber(characters);
  },

  clearText() {
    const input = document.getElementById("text-input");

    if (!input) {
      console.error("Text input was not found.");
      return;
    }

    input.value = "";
    this.updateTextCounts();
    input.focus();
  },

  setupCurrency() {
    const selector = document.getElementById("currency-select");

    if (!selector) {
      console.error("Currency selector was not found.");
      return;
    }

    this.currency = selector.value || "KES";

    selector.addEventListener("change", () => {
      this.currency = selector.value;
      this.refreshResults();
    });
  },

  refreshResults() {
    // Recalculate results after the display currency changes,
    // but only when the relevant input fields have values.
    const forms = [
      {
        inputs: ["gross-salary", "salary-deductions"],
        calculate: () => this.calculateSalary()
      },
      {
        inputs: ["loan-amount", "loan-rate", "loan-years"],
        calculate: () => this.calculateLoan()
      },
      {
        inputs: ["original-price", "discount-rate"],
        calculate: () => this.calculateDiscount()
      }
    ];

    for (const item of forms) {
      const elements = item.inputs.map(id => document.getElementById(id));

      if (elements.every(el => el && el.value.trim() !== "")) {
        item.calculate();
      }
    }
  },

  initialise() {
    this.setupCurrency();

    const forms = [
      ["salary-form", () => this.calculateSalary()],
      ["loan-form", () => this.calculateLoan()],
      ["discount-form", () => this.calculateDiscount()],
      ["percentage-form", () => this.calculatePercentage()]
    ];

    for (const [formId, callback] of forms) {
      const form = document.getElementById(formId);

      if (!form) {
        console.error("Form not found:", formId);
        continue;
      }

      form.addEventListener("submit", event => {
        event.preventDefault();
        callback();
      });
    }

    const textInput = document.getElementById("text-input");

    if (textInput) {
      textInput.addEventListener("input", () => this.updateTextCounts());
    }

    const clearButton = document.getElementById("clear-text");

    if (clearButton) {
      clearButton.addEventListener("click", () => this.clearText());
    }

    const year = document.getElementById("current-year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    this.updateTextCounts();
    console.info("DailyUseful initialized successfully.");
  }
};

// Keep these functions available for browser testing.
window.calculateSalary = () => DailyUseful.calculateSalary();
window.calculateLoan = () => DailyUseful.calculateLoan();
window.calculateDiscount = () => DailyUseful.calculateDiscount();
window.calculatePercentage = () => DailyUseful.calculatePercentage();
window.updateTextCounts = () => DailyUseful.updateTextCounts();
window.clearText = () => DailyUseful.clearText();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => DailyUseful.initialise(),
    { once: true }
  );
} else {
  DailyUseful.initialise();
}
