/* eslint-disable react/jsx-filename-extension -- no JSX here, but kept .tsx for JSX.Element typing */
import dynamic from 'next/dynamic';

type ClientOnlyProps = { children: JSX.Element };
const ClientOnly = (props: ClientOnlyProps) => {
  const { children } = props;

  return children;
};

// eslint-disable-next-line import/no-default-export -- next/dynamic wrapper
export default dynamic(() => Promise.resolve(ClientOnly), {
  ssr: false,
});
