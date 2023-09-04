import { getPaginatedPostsIDs } from "../api";

// initialize
let currentOffset = 0;
const showmoreButton = document.querySelector("#showmore") as HTMLButtonElement;
showmoreButton.addEventListener("click", showNextPosts);
window.addEventListener("openCommentEditor", (event) => {
  const element = document.createElement("comment-editor");
  element.post_id = (event as CustomEvent).detail.post_id;
  document.body.append(element);
});
window.addEventListener("closeCommentEditor", () => {
  const element = document.querySelector("comment-editor")!;
  document.body.removeChild(element);
});

async function getNextIDs(offset: number) {
  const idList = await getPaginatedPostsIDs(offset);
  if (idList === "error") {
    return "error";
  }
  if (idList.length === 0) return "noMoreContent";
  // update the offset
  const lastID = idList.slice(-1)[0];
  currentOffset = lastID;
  return idList;
}

function showPosts(idList: number[]) {
  const main = document.querySelector("main")!;
  idList.forEach((id) => {
    const element = document.createElement("post-element");
    element.post_id = id;
    main.append(element);
  });
}

async function showNextPosts() {
  const idList = await getNextIDs(currentOffset);
  if (idList === "error") {
    throw new Error("error with showNextPosts");
  }
  if (idList === "noMoreContent") {
    showmoreButton.style.display = "none";
    if (currentOffset === 0) { // only show this message when there is no posts in the DB
      const mainElement = document.querySelector("main")!;
      mainElement.innerHTML = "<h2>no posts to show</h2>";
    }
    return;
  }
  showPosts(idList);
}
/////////////

showNextPosts(); // call for the first time to load the first 5 posts and then
//  proceed with show more button
