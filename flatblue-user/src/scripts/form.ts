import { apiURL } from "../utils/config";
import { urlEncoded } from "../utils/utilities";

function showSuccess() {
  document.body.innerHTML = `<h2>post sent successfully 😊</h2>`;
}

function showFailure() {
  document.body.innerHTML = `<h2>post wasn't sent 😢</h2>`;
}

async function handleFormDataSending(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const requestBody = urlEncoded(new FormData(form));

  try {
    const response = await fetch(`${apiURL}/user/posts/add/`, {
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
  const form = document.querySelector("form")!;
  form.addEventListener("submit", handleFormDataSending);
}
main();
