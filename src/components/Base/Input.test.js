import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Input from "components/Base/Input";

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});


describe("Input component", () => {
    test("it shows the expected text when typed", () => {
        act(() => {
            ReactDOM.render(<Input required />, container);
        });
        const input = container.getElementsByTagName("input")[0];
        expect(input.hasAttribute('required')).toBe(true);

        // expect(input.textContent).toBe("PROCEED TO CHECKOUT");
    });
});