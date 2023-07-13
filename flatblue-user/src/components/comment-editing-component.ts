import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { addComment } from "../api";

const componentStyles = css`
  :host {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 300px;
    transform: translate(-50%, -50%);
  }

  .container{
    background-color: #e9e9ed;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  #close {
    background-color: red;
    position: relative;
    min-width:30px;
    
  }

  #submit {
    min-height: 30px;
  }

  #owner_name{
    min-height: 30px;
  }
  textarea {
    background-color: white;
    box-sizing: border-box;
    padding: 0.3em;
    resize: none;
    border: 0.2em solid black;
    font-size: 1rem;
    font-family: var(--san-serf-font);
  }
`;

@customElement("comment-editor")
export class CommentEditor extends LitElement {
  @property({ type: Number })
  post_id = 0;

  async firstUpdated() {
    const textareaElement = this.renderRoot.querySelector("textarea")!;
    textareaElement.addEventListener("input", () => {
    const scrollHeight = textareaElement.scrollHeight;
    textareaElement.style.height = Math.max(scrollHeight, 80) + "px";
  });
  }
  async submitHandler(event: Event) {
    event.preventDefault();
    const form = event.target!;
    const data = new FormData(form as HTMLFormElement);
    console.log(data);
    const result = await addComment(
      this.post_id,
      data.get("owner_name") as string,
      data.get("content") as string
    );
    if (result === "ok") {
      console.log("ok");
      this.dispatchEvent(
        new CustomEvent("closeCommentEditor", { bubbles: true, composed: true })
      );
    } else {
      console.log("error");
    }
  }

  closeHandler() {
    this.dispatchEvent(
      new CustomEvent("closeCommentEditor", { bubbles: true, composed: true })
    );
  }
  render() {
    return html`<div class = "container">
      <button id="close" @click=${this.closeHandler}>X</button>
      <form @submit=${this.submitHandler}>
        <input id="owner_name" type="text" name="owner_name" value="Anonymous" />
        <textarea name="content" id=""></textarea>
        <button type="submit" id="submit">submit</button>
      </form>
    </div>`;
  }

  static styles = componentStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    "comment-editor": CommentEditor;
  }
}
