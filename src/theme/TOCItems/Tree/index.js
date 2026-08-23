import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {PAGE_TOP_ID} from '@theme/DocItem/Content';

/* Ejected from @docusaurus/theme-classic to put the page title at the top of
   the table of contents. Docusaurus builds the list from h2/h3 headings alone,
   so the title -- rendered as a synthetic h1 from front matter -- never appears.

   Ejected rather than wrapped because the component recurses into itself, so a
   wrapper cannot reach inside the list it renders. Both the desktop sidebar and
   the mobile "on this page" dropdown render through here, so they stay in step. */

/* Docusaurus only renders a synthetic title when the page has not hidden it and
   the content does not already open with its own h1. src/theme/DocItem/Content
   makes the same test before adding the anchor; keep the two in step. */
function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  if (frontMatter.hide_title || typeof contentTitle !== 'undefined') {
    return null;
  }
  return metadata.title;
}

/* A plain <a>, not a Docusaurus <Link>, on purpose. The build-time broken-anchor
   checker inspects <Link> only, and derives the valid anchors from the page's
   headings -- it cannot see an id added by a theme component, so a <Link> here
   reports a broken anchor on every page that has a title. */
function PageTitleItem({linkClassName}) {
  const title = useSyntheticTitle();
  if (!title) {
    return null;
  }
  return (
    <li>
      <a className={linkClassName ?? undefined} href={`#${PAGE_TOP_ID}`}>
        {title}
      </a>
    </li>
  );
}

function TOCItemTree({toc, className, linkClassName, isChild}) {
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? undefined : className}>
      {!isChild && <PageTitleItem linkClassName={linkClassName} />}
      {toc.map((heading) => (
        <li key={heading.id}>
          <Link
            to={`#${heading.id}`}
            className={linkClassName ?? undefined}
            // Developer provided the HTML, so assume it's safe.
            dangerouslySetInnerHTML={{__html: heading.value}}
          />
          <TOCItemTree
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
