import { Heading } from "../components/Heading";
import { ViewProps } from "../eleventy";

/** Seperating out the internals into data types we can test
 * so that the parts are agnostic to Eleventy
 */
export type IndexProps = {
  filePathStem: string;
};

export const Index = ({ filePathStem }: IndexProps): JSX.Element => (
  <Heading name={filePathStem} />
);

/** This is what eleventy looks for when it's rendering a page */
export const render = ({ page }: ViewProps): JSX.Element => (
  <Index filePathStem={page.filePathStem} />
);
