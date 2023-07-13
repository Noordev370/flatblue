import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

const componentStyels = css`
.container{
    border: 0.3rem solid white;
    border-radius: 15px;
    padding-left:1rem;
    padding-top: 0.5rem;
    font-family: inherit;
    }
    .header{
        font-weight:bold;
        margin-bottom: 0.5rem;
    }
    .header::first-letter{
        text-transform: uppercase;
    }
`;

@customElement("comment-element")
export class CommentElement extends LitElement{
    static styles = componentStyels;
    userName = "";
    comment = "";

    protected render() {
        return html`<div class = "container">
            <div class = "header">${this.userName}</div>
            <div class = "main">${this.comment}</div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "comment-element": CommentElement;
    }
  }
  