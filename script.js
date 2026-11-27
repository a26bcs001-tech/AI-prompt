
// Get HTML elements

const promptForm = document.getElementById("promptForm");

const roleInput = document.getElementById("role");
const taskInput = document.getElementById("task");
const contextInput = document.getElementById("context");
const constraintsInput = document.getElementById("constraints");
const formatInput = document.getElementById("format");

const outputText = document.getElementById("outputText");
const outputPlaceholder = document.getElementById("outputPlaceholder");

const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const statusMessage = document.getElementById("statusMessage");


// Generate Prompt Button

promptForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values

    const role = roleInput.value.trim();
    const task = taskInput.value.trim();
    const context = contextInput.value.trim();
    const constraints = constraintsInput.value.trim();
    const format = formatInput.value;

    // Check whether task is entered

    if (task === "") {
        alert("Please enter a task before generating your prompt.");
        taskInput.focus();
        return;
    }

    // Create the prompt

    let prompt = "";

    if (role !== "") {
        prompt += "Act as " + role + ".\n\n";
    }

    prompt += "Task:\n" + task + "\n\n";

    if (context !== "") {
        prompt += "Context:\n" + context + "\n\n";
    }

    if (constraints !== "") {
        prompt += "Constraints:\n" + constraints + "\n\n";
    }

    if (format !== "") {
        prompt += "Output Format:\n" + format + "\n\n";
    }

    prompt += "Please provide an accurate, clear, and helpful response.";

    // Display generated prompt

    showPrompt(prompt);

});


// Function to display the prompt

function showPrompt(prompt) {

    outputText.textContent = prompt;

    outputText.hidden = false;

    outputPlaceholder.hidden = true;

    copyBtn.disabled = false;

    statusMessage.textContent = "Your prompt is ready to copy.";

}


// Copy Prompt Button

copyBtn.addEventListener("click", async function() {

    const prompt = outputText.textContent;

    try {

        await navigator.clipboard.writeText(prompt);

        statusMessage.textContent = "✓ Prompt copied successfully!";

    } catch (error) {

        // Fallback for clipboard access

        const textArea = document.createElement("textarea");

        textArea.value = prompt;

        document.body.appendChild(textArea);

        textArea.select();

        document.execCommand("copy");

        textArea.remove();

        statusMessage.textContent = "✓ Prompt copied successfully!";

    }

});


// Clear All Button

clearBtn.addEventListener("click", function() {

    // Reset all input fields

    promptForm.reset();

    // Clear output

    outputText.textContent = "";

    outputText.hidden = true;

    outputPlaceholder.hidden = false;

    // Disable copy button

    copyBtn.disabled = true;

    statusMessage.textContent = "Your generated prompt stays in this browser.";

});


// Sample Prompt Button

sampleBtn.addEventListener("click", function() {

    // Fill sample values

    roleInput.value = "an experienced computer science teacher";

    taskInput.value =
        "Explain the concept of artificial intelligence and describe three real-world applications.";

    contextInput.value =
        "I am a first-year college student. I have basic computer knowledge and I am learning about AI for the first time.";

    constraintsInput.value =
        "Use simple beginner-friendly language. Avoid difficult technical terms. Include practical examples.";

    formatInput.value =
        "Explanation with headings and bullet points";

    // Generate the sample prompt

    promptForm.requestSubmit();

    // Scroll to output section

    document.querySelector(".output-section").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});
