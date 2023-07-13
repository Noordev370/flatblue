import { PostElement } from "../components/post-component";
import { universalURL } from "../config";

// init
const button = document.querySelector("button")!;
const mainElement = document.querySelector("main")!;
type Data = {
  id: number;
  level: string;
  gender: string;
  date: string;
  content: string;
};

async function makeTransaction(idList: number[]) {
  try {
    const requestBody = JSON.stringify(idList);
    const response = await fetch(`${universalURL}/admin/posts/transaction`, {
      method: "post",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if(response.ok){
      mainElement.innerHTML = "<h1>Done</h1>";
      document.body.removeChild(button);
    }
  } catch (error) {
    console.log("Error during making transaction");
  }
}
function getAcceptedPostsIDS() {
  const acceptElements:NodeListOf<PostElement> = document.querySelectorAll(".accepted");
  const idList:number[] = [];
  acceptElements.forEach(element => {
    idList.push(element.postID);
  });
  return idList;

}

async function showPosts() {
  try {
    const response = await fetch(`${universalURL}/admin/posts`, {
      method: "get",
      mode: "cors",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result: Data[] | [] = await response.json();
    if (result.length === 0) {
      mainElement.innerHTML = "<h1>no posts yet</h1>";
    } else {
      result.forEach((obj) => {
        const postElement = document.createElement("post-element");
        postElement.postID = obj.id;
        postElement.data = obj;
        mainElement.appendChild(postElement);
      });
    }
  } catch (error) {
   console.log("Error with showposts function");
  }
}

async function main() {
  button.addEventListener("click", async () => {
    try {
      await makeTransaction(getAcceptedPostsIDS());
    } catch (error) {
      console.log("error");
    }
  });

  showPosts();
}

await main();
