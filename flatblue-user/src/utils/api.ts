import { urlEncoded } from "./utilities";
import { apiURL } from "./config";

type PostData = {
  gender: string;
  level: string;
  date: string;
  content: string;
};

type CommentsData = { owner_name: string; content: string }[];

async function getPaginatedPostsIDs(
  offset: number
): Promise<number[] | "error"> {
  const url = `${apiURL}/user/posts/id_list/${offset}`;

  const response = await fetch(url, {
    method: "get",
    mode: "cors",
  });
  if (response.ok) {
    const result: { id: number }[] | [] = await response.json();
    if (result.length === 0) return []; // return empty array if the response is empty from ids
    const idList: number[] = [];
    result.forEach((element) => {
      idList.push(element.id);
    });
    return idList;
  } else {
    console.log("Error with getPaginatedPostsIDs");
    return "error";
  }
}

async function getPostByID(id: number) {
  const url = `${apiURL}/user/posts/${id}`;
  const response = await fetch(url, {
    method: "get",
    mode: "cors",
  });
  if (response.ok) {
    const result = await response.json();
    const data: PostData = result[0];
    return data;
  } else {
    console.log("Error with getPostByID");
    return "error";
  }
}

async function addComment(postID: number, owner_name: string, comment: string) {
  if (!owner_name) owner_name = "anonymous";
  const response = await fetch(`${apiURL}/user/comments/add`, {
    method: "post",
    mode: "cors",
    body: urlEncoded({ post_id: postID, owner_name, comment: comment }),
  });
  if (response.ok) {
    return "ok";
  } else {
    return "error";
  }
}

async function getCommentsByPostID(postID: number) {
  const url = `${apiURL}/user/comments/${postID}`;

  const response = await fetch(url, {
    method: "get",
    mode: "cors",
  });
  if (response.ok) {
    const result: CommentsData = await response.json();
    return result;
  } else {
    console.log("Error with getCommentsByPostID");
    return "error";
  }
}

async function getCommentsCountByPostID(postID: number) {
  const url = `${apiURL}/user/comments/count/${postID}`;

  const response = await fetch(url, {
    method: "get",
    mode: "cors",
  });
  if (response.ok) {
    const result = await response.json();
    const data: number = result[0].count;
    return data;
  } else {
    console.log("Error with getPostCommentCount");
    return "error";
  }
}

export {
  getCommentsByPostID,
  addComment,
  getPaginatedPostsIDs,
  getPostByID,
  getCommentsCountByPostID,
};
