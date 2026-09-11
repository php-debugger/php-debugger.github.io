---
title: Debug Protocol
---

The debugger and your editor talk to each other over **DBGp**, a debugging protocol
originally designed for PHP and now spoken by every PHP debugging client worth
using.

That is why there is no editor plugin to install for PHP Debugger specifically.
Your editor already knows how to hold a DBGp conversation; the debugger connects to
it and they understand one another. Anything that could already debug PHP can debug
your code here, with no adapter in between.

Mechanically it is a small thing: a TCP connection opened by the debugger, carrying
XML messages in both directions. The editor asks — set a breakpoint here, step over,
give me the value of `$order` — and the debugger answers. Everything the
[User Guide](../user-guide/starting-the-debugger.md) describes is that conversation
under a friendlier name.

## The specification

The protocol is documented in full at
[xdebug.org/docs/dbgp](https://xdebug.org/docs/dbgp) — every command, its arguments
and the shape of its response.

You do not need any of it to use the debugger. It is worth reading if you are
building a client, debugging a client, or trying to work out why your editor and the
debugger disagree about something — for which the raw message log at
[level 5](./settings.md#php_debuggerlog_level) is the other half of the answer.

## Compatibility

PHP Debugger currently implements DBGp version 1.0 as specified, with no
deliberate differences. If your editor works with the protocol, it works here.

:::info[This may not always be exactly true]

Keeping the protocol unchanged is a deliberate choice for now, not a permanent
commitment. Some improvements we would like to make are difficult to express within
the specification as it stands, and we may eventually add to it or diverge from it
where the benefit is worth the cost.

Anything of that kind would be documented here, and compatibility with existing
clients is something we intend to keep rather than break casually.

:::
