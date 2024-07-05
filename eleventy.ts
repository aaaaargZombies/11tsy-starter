/** @module eleventy
 * Eleventy passes a lot of data around with no types so we're going to define
 * some expectations here that our code knows what the contract is.
 */

export type ViewProps = {
  content: string;
  title: string;
};
