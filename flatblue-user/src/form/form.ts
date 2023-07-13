import { universalURL } from "../config";
import { urlEncoded } from "../utils";

function resizeTextArea() {
  const textareaElement = document.querySelector("textarea")!;
  textareaElement.addEventListener("input", () => {
    const scrollHeight = textareaElement.scrollHeight;
    textareaElement.style.height = Math.max(scrollHeight, 80) + "px";
  });
}

function showSuccess() {
  alert("post sent successfully 😊");
}

function showFailure() {
  alert("post wasn't sent 😢");
}

async function handleFormDataSending(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const requestBody = urlEncoded(new FormData(form));

  try {
    const response = await fetch(`${universalURL}/user/posts/add/`, {
      method: "post",
      mode: "cors",
      body: requestBody,
    });
    if (response.ok) {
      showSuccess();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("Error during sending form data");
    showFailure();
  }
}

function main() {
  resizeTextArea();

  const form = document.querySelector("form")!;
  form.addEventListener("submit", handleFormDataSending);
}
main();