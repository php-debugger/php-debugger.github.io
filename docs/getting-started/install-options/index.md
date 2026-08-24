---
title: More install options
---

There is more than one way to get PHP Debugger onto a machine. They differ in how
much work they are and in what you end up with — either a **self-contained PHP
interpreter** with the debugger compiled in, or the **extension** loaded into a
PHP you already have.

If you have no particular reason to choose, use the [installer](../installation.mdx).

| Option | Installs | Good for |
| --- | --- | --- |
| **[Installer](../installation.mdx)** | Either | Almost everyone. One command, and it can undo itself. |
| **[Docker](../docker.mdx)** | Either | Containerised projects. |
| **[PIE](./pie.mdx)** | Extension | Keeping the PHP you have, managed by a standard tool. |
| **[Prebuilt binaries](./binaries.mdx)** | Either | No build tools, no installer — just a file to download. |
| **[From source](./from-source.mdx)** | Either | A platform nothing else covers, or local changes to the code. |
| **[From source on Windows](./windows.mdx)** | Either | The same, on Windows, where the toolchain differs. |

## Which one gives me what

The **interpreter** is a complete PHP with the debugger built into it. Nothing to
enable, and it cannot be accidentally unloaded. The trade-off is that it replaces
the `php` you run.

The **extension** leaves your existing PHP in place and loads the debugger into
it. That keeps whatever else you had configured, at the cost of a `zend_extension`
line and matching a build to your exact PHP.

## Notes before you pick

- **Building from source is a last resort.** Every other option gives you a tested
  build. Reach for it when nothing else covers your platform, or when you are
  changing the code.
- **The extension has to match your PHP exactly** — same minor version, same thread
  safety, same architecture. The installer and PIE work that out for you; with
  prebuilt binaries you match it yourself.
- **Only the installer knows how to undo itself.** It backs up what it replaced and
  restores it on `uninstall`. The other routes leave you to reverse them by hand.
