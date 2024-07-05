import { expect, test } from "vitest";
import { Index } from "./index.11ty";
import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";

test("Render index", async () => {
  const rendered = await jsxToString(<Index />);
  document.body.innerHTML = rendered;
  expect(screen.getByText("Hello Test!")).to.exist;
});
