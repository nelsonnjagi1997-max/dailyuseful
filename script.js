(() => {
  const form = document.getElementById("percentage-form");
  const percent = document.getElementById("percent");
  const number = document.getElementById("number");
  const result = document.getElementById("result");

  console.table({
    scriptLoaded: [...document.scripts].some(s => s.src.includes("script.js")),
    calculatorFunction: typeof window.calculatePercentage,
    formFound: !!form,
    percentInputFound: !!percent,
    numberInputFound: !!number,
    resultFound: !!result
  });

  if (!form || !percent || !number || !result) {
    console.error("The live HTML is missing a required calculator element.");
    return;
  }

  if (typeof window.calculatePercentage !== "function") {
    console.error("The calculator JavaScript function is not loaded.");
    return;
  }

  percent.value = "20";
  number.value = "500";
  window.calculatePercentage();

  console.log("Test result:", result.textContent);
})();
