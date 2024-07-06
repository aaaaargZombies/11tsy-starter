import { ViewProps } from "../../eleventy";
import { Heading } from "../_components/Heading";

export const MainLayout = ({ content, title }: ViewProps): JSX.Element => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </head>
    <Heading name={title}></Heading>
    <body>{content}</body>
  </html>
);

export const render = MainLayout;
