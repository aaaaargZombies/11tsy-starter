import { expect, test } from "vitest";
import { Heading } from "./Heading";
import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";

test("Render Heading with default name", async () => {
  document.body.innerHTML = await jsxToString(<Heading />);
  expect(screen.getByText("Hello World")).to.exist;
});

test("Render Heading with custom name", async () => {
  document.body.innerHTML = await jsxToString(<Heading name={"Component"} />);
  expect(screen.getByText("Hello Component")).to.exist;
});
