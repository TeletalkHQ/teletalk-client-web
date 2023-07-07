interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
