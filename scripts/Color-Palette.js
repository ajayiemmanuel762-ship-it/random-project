const paletteContainer = document.querySelector("#palette-container");
const generateButton = document.querySelector("#generate-btn");
const copyBtn = document.querySelector(".copy-btn");

function createRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

function renderPalette() {
  const colors = Array.from({ length: 6 }, createRandomColor);

  paletteContainer.innerHTML = colors
    .map(
      (color) => `
				<div class="color-box">
					<div class="color" style="background-color: ${color}"></div>
					<div class="color-info">
						<span class="color-value">${color}</span>
						<i class="fas fa-copy copy-btn" title="Copy Color"></i>
					</div>
				</div>`,
    )
    .join("");
}

generateButton.addEventListener("click", renderPalette);

paletteContainer.addEventListener("click", async (event) => {
  const copyButton = event.target.closest(".copy-btn");

  if (!copyButton) {
    return;
  }

  const color = copyButton.previousElementSibling.textContent;
  await navigator.clipboard.writeText(color);
  copyButton.title = "Copied!";
  setTimeout(() => {
    copyButton.title = "Copy Color";
  }, 1200);
});
