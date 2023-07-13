import { urlEncoded } from "./utils";
import { universalURL } from "./config";

const form = document.querySelector("form")!;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const requestBody = urlEncoded(new FormData(form));
  // handle login
  try {
    const response = await fetch(`${universalURL}/admin/login`, {
      method: "post",
      mode: "cors",
      body: requestBody,
    });
    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("token", token);
    }
  } catch (error) {
    console.log("Error during fetch request");
  }
  ///////////////////
  window.location.href = "./src/posts_panel/index.html";
});
