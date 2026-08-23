import Footer from '@theme-original/DocItem/Footer';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import CtaBanner from '@site/src/components/CtaBanner';

export default function FooterWrapper(props) {
  const {metadata} = useDoc();
  // The home page composes CtaBanner in its own MDX.
  const isHome = metadata.id === 'home';
  return (
    <>
      <Footer {...props} />
      {!isHome && (
        <div style={{marginTop: '3rem'}}>
          <CtaBanner />
        </div>
      )}
    </>
  );
}
