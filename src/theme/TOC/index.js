import {useState} from 'react';
import TOC from '@theme-original/TOC';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function NeedHelpCard() {
  return (
    <div className={styles.card}>
      <span className={styles.mark}>{'{•}'}</span>
      <h3 className={styles.cardTitle}>Need help?</h3>
      <p className={styles.cardText}>
        Join our community on GitHub Discussions.
      </p>
      <Link
        className={styles.cardButton}
        href="https://github.com/php-debugger/php-debugger/discussions">
        Go to Discussions &rarr;
      </Link>
    </div>
  );
}

function WasThisHelpful() {
  const [voted, setVoted] = useState(false);
  return (
    <div className={styles.feedback}>
      {voted ? (
        <p className={styles.feedbackThanks}>Thanks for your feedback!</p>
      ) : (
        <>
          <p className={styles.feedbackLabel}>Was this helpful?</p>
          <div className={styles.feedbackButtons}>
            {['\u{1F600}', '\u{1F610}', '\u{1F641}'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={styles.feedbackButton}
                onClick={() => setVoted(true)}>
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TOCWrapper(props) {
  return (
    <div className={styles.tocColumn}>
      <TOC {...props} />
      <NeedHelpCard />
      <WasThisHelpful />
    </div>
  );
}
