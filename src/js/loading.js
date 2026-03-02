import { rootElement } from "../../main";

export function renderLoading() {
  rootElement.innerHTML = getLoadingHtml();
}

function getLoadingHtml() {
  return `
        <div class="loading">
            <div class="loading__message">...Wetterdaten werden abgerufen</div>
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
`;
}
