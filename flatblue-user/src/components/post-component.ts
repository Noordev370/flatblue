import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./post-main-component.ts";
import "./post-footer-component.ts";
import "./comment-viewer-component.ts";
import "./comment-editing-component.ts";
import "./comment-component.ts";
const componentStyles = css`
  :host {
    display: block;
    border: 0.2em solid white;
    position: relative;
    font-family: var(--sans-font);
  }
`;

@customElement("post-element")
export class PostElement extends LitElement {
  post_id = 0; // initiale value
  constructor() {
    super();
    this.addEventListener("showComments", () => {
      const footerElement = this.shadowRoot?.querySelector("post-footer")!;
      footerElement.commentsIsShown = true;
      const commentViewerElement = document.createElement("comments-viewer");
      commentViewerElement.post_id = this.post_id;
      this.shadowRoot?.append(commentViewerElement);
    });

    this.addEventListener("hideComments", () => {
      const element = this.shadowRoot?.querySelector("comments-viewer")!;
      this.shadowRoot?.removeChild(element);
    });
  }
  render() {
    return html` <post-main post_id=${this.post_id}></post-main>
      <post-footer post_id=${this.post_id}></post-footer>`;
  }

  static styles = componentStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    "post-element": PostElement;
  }
}
