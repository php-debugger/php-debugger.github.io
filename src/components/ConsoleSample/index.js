import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/* Console output with __VERSION__ swapped for the release the docs were built
   against. Sample output that quotes a version goes stale the moment a new one
   ships; this way a rebuild is enough to correct it. The version itself is
   resolved in docusaurus.config.js. */
export default function ConsoleSample({children}) {
  const {siteConfig} = useDocusaurusContext();
  const text = String(children).replace(
    /__VERSION__/g,
    siteConfig.customFields.debuggerVersion,
  );
  return <CodeBlock language="console">{text}</CodeBlock>;
}
