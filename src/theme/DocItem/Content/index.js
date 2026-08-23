import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

/* Ejected from @docusaurus/theme-classic so the synthetic page title can carry
   an anchor. The table of contents is built from h2/h3 headings only, so the
   title is never in it; without an id here there is nothing for the "on this
   page" entry to link to. src/theme/TOC prepends that entry and targets this id. */
export const PAGE_TOP_ID = 'page-top';

/* Docusaurus renders a "synthetic title" from front matter only when the page
   has not asked to hide it and the content does not already open with its own
   h1. src/theme/TOC repeats this test, so keep the two in step. */
function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({children}) {
  const syntheticTitle = useSyntheticTitle();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header id={PAGE_TOP_ID}>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
