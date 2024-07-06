export type HeadingProps = {
  name?: string;
};

export const Heading = ({ name = "World" }: HeadingProps): JSX.Element => (
  <h1>Hello {name}</h1>
);
