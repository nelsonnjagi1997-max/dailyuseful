
function calculatePercentage() {
    const percent = Number(document.getElementById("percent").value);
    const number = Number(document.getElementById("number").value);
    const result = document.getElementById("result");

    if (
        document.getElementById("percent").value === "" ||
        document.getElementById("number").value === ""
    ) {
        result.textContent = "Please enter both numbers.";
        return;
    }

    result.textContent = `${percent}% of ${number} = ${
        (percent / 100) * number
    }`;
}

const textInput = document.getElementById("text-input");

textInput.addEventListener("input", function () {
    const text = textInput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;

    document.getElementById("word-count").textContent = words;
    document.getElementById("char-count").textContent =
        textInput.value.length;
});
