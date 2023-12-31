import { urlEncoded } from "../utils/utilities";
import { apiURL } from "../utils/config ";

const form = document.querySelector("form")!;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const requestBody = urlEncoded(new FormData(form));
  // handle login
  try {
    const response = await fetch(`${apiURL}/admin/login`, {
      method: "post",
      mode: "cors",
      body: requestBody,
    });
    if (response.ok) {
      const token = await response.text();
      sessionStorage.setItem("token", token);
      window.location.href = "./src/pages/posts-panel.html";
    } else {
      throw Error();
    }
  } catch (error) {
    console.log("Error during fetch request");
    alert("error with login process");
  }
});
