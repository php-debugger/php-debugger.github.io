/* The installer commands and OS detection, shared by the Installation page's
   InstallCommand component and the home page's Quick Start card so the two can
   never drift apart. */

/* macOS and Linux run the same script -- it detects the OS and architecture
   itself -- so both platforms deliberately use the same command. */
export const UNIX_COMMAND =
  'curl -fsSL https://github.com/php-debugger/installer/releases/latest/download/install.sh | sh';
export const WINDOWS_COMMAND =
  'powershell -c "irm https://github.com/php-debugger/installer/releases/latest/download/install.ps1 | iex"';

export const PLATFORMS = [
  {id: 'macos', label: 'macOS', language: 'bash', command: UNIX_COMMAND},
  {id: 'linux', label: 'Linux', language: 'bash', command: UNIX_COMMAND},
  {id: 'windows', label: 'Windows', language: 'powershell', command: WINDOWS_COMMAND},
];

export function detectPlatform() {
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
