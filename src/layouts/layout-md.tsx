type MdLayoutProps = {
  children: React.ReactNode;
};

export function LayoutMd(props: MdLayoutProps) {
  return <div>{props.children}</div>;
}
