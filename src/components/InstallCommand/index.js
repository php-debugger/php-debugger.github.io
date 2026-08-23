import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

/* macOS and Linux run the same script -- it detects the OS and architecture
   itself -- so both tabs deliberately show the same command. */
const UNIX_COMMAND =
  'curl -fsSL https://github.com/php-debugger/installer/releases/latest/download/install.sh | sh';
const WINDOWS_COMMAND =
  'powershell -c "irm https://github.com/php-debugger/installer/releases/latest/download/install.ps1 | iex"';

const iconProps = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const PLATFORMS = [
  {id: 'macos', label: 'macOS', language: 'bash', command: UNIX_COMMAND},
  {id: 'linux', label: 'Linux', language: 'bash', command: UNIX_COMMAND},
  {id: 'windows', label: 'Windows', language: 'powershell', command: WINDOWS_COMMAND},
];

function detectPlatform() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) {
    return 'windows';
  }
  if (/Mac OS X|Macintosh/i.test(ua)) {
    return 'macos';
  }
  /* Android reports Linux too, and the command is the same either way. */
  if (/Linux|Android|X11/i.test(ua)) {
    return 'linux';
  }
  return null;
}

export default function InstallCommand() {
  /* The page is prerendered without knowing the visitor's OS, so start on macOS
     and correct it after mounting. Detecting in an effect rather than during
     render keeps the first client render identical to the server's, which is
     what hydration compares. A visitor who picks a tab keeps their choice --
     the effect only runs on mount. */
  const [platform, setPlatform] = useState('macos');

  useEffect(() => {
    const detected = detectPlatform();
    if (detected) {
      setPlatform(detected);
    }
  }, []);

  const active = PLATFORMS.find((p) => p.id === platform) ?? PLATFORMS[0];
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  /* Fallback for when the async Clipboard API is unavailable or refused: it needs
     a secure context, and browsers decline it when the document is not focused.
     A throwaway textarea and execCommand works in those cases -- it is what
     Docusaurus's own copy button relies on. */
  function copyViaTextarea(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(field);
    return ok;
  }

  async function copy(event) {
    event.currentTarget.blur();
    let ok = false;
    try {
      await navigator.clipboard.writeText(active.command);
      ok = true;
    } catch {
      ok = copyViaTextarea(active.command);
    }
    /* Only confirm a copy that actually happened. If both routes fail the label
       stays put rather than claiming something untrue -- the whole command is on
       screen and can still be selected by hand. */
    if (!ok) {
      return;
    }
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.tabs} role="tablist" aria-label="Operating system">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === active.id}
              className={clsx(styles.tab, p.id === active.id && styles.tabActive)}
              onClick={() => setPlatform(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={clsx(styles.copy, copied && styles.copied)}
          onClick={copy}
          aria-label={`Copy the ${active.label} install command`}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <CodeBlock language={active.language}>{active.command}</CodeBlock>
    </div>
  );
}
