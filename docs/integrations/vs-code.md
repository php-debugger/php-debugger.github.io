---
title: VS Code
---

VS Code has no PHP debugging of its own, so there is one thing to install: the
**PHP Debug** extension, which is the piece that speaks the protocol. Once it is
there, its defaults already match ours — it listens on port `9003`, which is where
the debugger connects.

This page follows the [User Guide](../user-guide/starting-the-debugger.md) section
by section, saying what each one looks like in VS Code.

**Extension:** [PHP Debug on the Marketplace](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)
· [source and settings reference](https://github.com/xdebug/vscode-php-debug)

## Starting the debugger

[Guide: Starting the Debugger](../user-guide/starting-the-debugger.md)

There is nothing to start on our side. In VS Code, open the **Run and Debug** view,
add a PHP configuration if you have not already, and start the one called **Listen
for Xdebug**. That is the switch: start it when you want to debug, stop it when you
are finished.

The configuration it generates needs no changes to work here:

```json
{
  "name": "Listen for Xdebug",
  "type": "php",
  "request": "launch",
  "port": 9003
}
```

Its `stopOnEntry` option breaks at the first line of every script. That is
occasionally useful and usually not what you want, especially here, where every
request arrives.

**VS Code docs:** [Start a debugging session](https://code.visualstudio.com/docs/debugtest/debugging#_start-a-debugging-session)

## Connecting to a client

[Guide: Connecting to a Client](../user-guide/connecting-to-a-client.md)

VS Code's debug port is the `port` setting in your launch configuration, and
defaults to `9003`. If you change it there, change
[`php_debugger.client_port`](../reference/settings.md#php_debuggerclient_port) to
match.

Whenever the paths the debugger reports are not the paths on your own machine, add
`pathMappings` so VS Code can turn one into the other. A container is the common
case, but so is a VM, a remote host, or any mount whose root differs from your
workspace. It is written server path first:

```json
"pathMappings": {
  "/var/www/html": "${workspaceFolder}"
}
```

Getting this wrong is the usual reason breakpoints are ignored: the session
connects, and nothing ever stops.

## Breakpoints

[Guide: Breakpoints](../user-guide/breakpoints.md)

Click the gutter beside a line to set one. Right-click for a condition or a hit
count, and use the **Breakpoints** panel for the full list, including exception
breakpoints and function breakpoints by name.

VS Code also has **logpoints** — a breakpoint that prints a message instead of
stopping. It is a comfortable middle ground when you want to watch a value go past
without pausing on every iteration.

**VS Code docs:** [Breakpoints](https://code.visualstudio.com/docs/debugtest/debugging#_breakpoints)

## Step debugging

[Guide: Step Debugging](../user-guide/step-debugging.md)

The debug toolbar carries the four actions the guide describes — Continue, Step
Over, Step Into and Step Out — and **Run to Cursor** is on the editor's context
menu.

One default worth knowing: the extension's `skipFiles` is set to `**/vendor/**`, so
stepping walks over your dependencies rather than into them. That is usually what
you want, and it is the first thing to check when a step seems to skip past
something it should have entered.

**VS Code docs:** [Debug actions](https://code.visualstudio.com/docs/debugtest/debugging#_debug-actions)

## Inspect variables

[Guide: Inspect Variables](../user-guide/inspect-variables.md)

The **Variables** panel shows what is in scope and the **Call Stack** panel shows
the frames. Selecting a frame repoints the variables panel at that frame, which is
the habit worth forming.

Hovering a variable in the editor shows its value without going to the panel at
all.

**VS Code docs:** [Data inspection](https://code.visualstudio.com/docs/debugtest/debugging#_data-inspection)

## Watches and edits

[Guide: Watches and Edits](../user-guide/watches-and-edits.md)

The **Watch** panel holds expressions re-evaluated at every stop, and the **Debug
Console** handles one-off evaluation. Both run real PHP inside the paused request,
so the guide's warnings about side effects apply exactly as written.

To change a value, double-click it in the Variables panel, or choose **Set Value**
from its context menu.

**VS Code docs:** [Debug Console](https://code.visualstudio.com/docs/debugtest/debugging#_debug-console-repl)

## Logging

[Guide: Logging](../user-guide/logging.md)

The **Debug Console** carries your script's output, and PHP's warnings and notices
appear there as the request produces them. Nothing needs enabling on our side.

The extension's own `log` option is a different thing: setting it to `true` prints
every protocol message between VS Code and the debugger into the same console.
That is the editor-side equivalent of our
[log level 5](../reference/settings.md#php_debuggerlog_level), and it is for
diagnosing the conversation rather than your code.

## Troubleshooting

[Guide: Troubleshooting](../user-guide/troubleshooting.md)

If a session never arrives, check the two things that are VS Code's rather than
ours: that the **Listen for Xdebug** configuration is actually running, and that
`pathMappings` matches where the code really lives. Our
[troubleshooting page](../user-guide/troubleshooting.md) covers the debugger side,
and the debug log at its default level will tell you whether a connection was
attempted and where to.

Turning on the extension's `log` option at the same time gives you both halves of
the conversation, which is usually enough to see which end is confused.
