---
title: PhpStorm
---

PhpStorm needs no plugin and no special configuration to work with PHP Debugger. It
already speaks the protocol, and its defaults already match ours — it listens on
port `9003`, which is where the debugger connects.

This page follows the [User Guide](../user-guide/starting-the-debugger.md) section
by section, saying what each one looks like in PhpStorm. Each links on to
JetBrains' own documentation, which is the authority on the editor side.

## Starting the debugger

[Guide: Starting the Debugger](../user-guide/starting-the-debugger.md)

There is nothing to start. The debugger is available on every request, so the only
switch is PhpStorm's: **Run | Start Listening for PHP Debug Connections**, or the
telephone icon in the toolbar. Turn it on when you want to debug and off when you
are finished.

This is what JetBrains call zero-configuration debugging, and it is the mode to
use — you do not need a run configuration, a server entry, or a browser extension
to trigger a session.

One setting worth knowing about: **Settings | PHP | Debug | Break at first line in
PHP scripts**. With it on, PhpStorm stops at the first line of every request it
receives. That is occasionally useful and usually not what you want, especially
here, where every request arrives.

**JetBrains docs:** [Zero-configuration debugging](https://www.jetbrains.com/help/phpstorm/zero-configuration-debugging.html)
· [Start a PHP debugging session](https://www.jetbrains.com/help/phpstorm/php-debugging-session.html)

## Connecting to a client

[Guide: Connecting to a Client](../user-guide/connecting-to-a-client.md)

PhpStorm's debug port lives at **Settings | PHP | Debug**, and defaults to `9003`.
If you change it there, change
[`php_debugger.client_port`](../reference/settings.md#php_debuggerclient_port) to
match.

Whenever the paths the debugger reports are not the paths on your own machine, the
other half of the setup is path mapping — telling PhpStorm which local directory
corresponds to which remote one. A container is the common case, but so is a VM, a
remote host, or any mount whose root differs from your project. That is configured
under **Settings | PHP | Servers**, and it is the usual reason breakpoints are
ignored.

Over HTTP that is all you need — PhpStorm matches the connection to a server entry
by the URL that was requested. On the command line there is no URL to match on, so
you have to say which entry applies. Set `PHP_IDE_CONFIG` in the environment the
script runs in, naming the server exactly as it is named in that dialog:

```bash
PHP_IDE_CONFIG="serverName=myapp"
```

Leaving it out, or misspelling the name, looks exactly like a mapping problem: the
session connects and the breakpoints are ignored. The
[Docker](../getting-started/docker.mdx) page sets it alongside the debugger's own
settings.

**JetBrains docs:** [Configure Xdebug](https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html)

## Breakpoints

[Guide: Breakpoints](../user-guide/breakpoints.md)

Click the gutter beside a line to set one. Right-click it for a condition or a hit
count, and use **Run | View Breakpoints** for the full list, including exception
breakpoints and breakpoints on a function by name.

PhpStorm's **Mute Breakpoints** button disables them all at once without deleting
them. It is handy mid-session, but muted breakpoints are still breakpoints as far as
the debugger is concerned — for the overhead to go away they have to be removed.

**JetBrains docs:** [Breakpoints](https://www.jetbrains.com/help/phpstorm/using-breakpoints.html)

## Step debugging

[Guide: Step Debugging](../user-guide/step-debugging.md)

The Debug tool window has the four actions the guide describes — Step Into, Step
Over, Step Out and Resume — plus **Run to Cursor**, which PhpStorm implements as a
temporary breakpoint just as the guide explains.

When a step seems to skip past something, the cause is usually PhpStorm rather than
the debugger. Two settings pages decide what it steps into: **Debugger | Stepping**,
which can skip library scripts and any scripts you list, and **PHP | Debug | Step
Filters**, which can skip magic methods, constructors and named methods. **Force
Step Into** ignores both for a single step.

**JetBrains docs:** [Step through the program](https://www.jetbrains.com/help/phpstorm/stepping-through-the-program.html)

## Inspect variables

[Guide: Inspect Variables](../user-guide/inspect-variables.md)

The Debug tool window shows the call stack on one side and variables on the other.
Selecting a frame in the stack repoints the variables pane at that frame, which is
the part worth getting into the habit of using.

PhpStorm also shows values inline, greyed out beside the code itself, which often
saves going to the panel at all.

**JetBrains docs:** [Examine a suspended program](https://www.jetbrains.com/help/phpstorm/examining-suspended-program.html)

## Watches and edits

[Guide: Watches and Edits](../user-guide/watches-and-edits.md)

Watches live in their own pane in the Debug tool window, and **Evaluate Expression**
handles the one-off case. Both run real PHP in the paused request, so the guide's
warnings about side effects apply exactly as written.

To change a value, double-click it in the variables pane, or use **Set Value** from
its context menu.

**JetBrains docs:** [Evaluate expressions](https://www.jetbrains.com/help/phpstorm/evaluating-expressions.html)

## Logging

[Guide: Logging](../user-guide/logging.md)

The Console tab of the Debug tool window carries your script's output, and PHP's
warnings and notices appear there as the request produces them. Nothing needs
enabling on our side; PhpStorm asks for both when the session opens.

**JetBrains docs:** [Debug tool window: Console](https://www.jetbrains.com/help/phpstorm/debug-tool-window-console.html)

## Troubleshooting

[Guide: Troubleshooting](../user-guide/troubleshooting.md)

If a session never arrives, check the two things that are PhpStorm's rather than
ours: that it is actually listening, and that path mappings are right for where the
code runs. Our [troubleshooting page](../user-guide/troubleshooting.md) covers the
debugger side, and the debug log at the default level will tell you whether a
connection was attempted and where to.

**JetBrains docs:** [Troubleshooting PHP debugging](https://www.jetbrains.com/help/phpstorm/troubleshooting-php-debugging.html)
