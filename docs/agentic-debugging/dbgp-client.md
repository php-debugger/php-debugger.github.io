---
title: DBGP Client
description: DBGP Client lets AI agents debug PHP with PHP Debugger, the way you would. It also works as a standalone debugger in your terminal.
---

[DBGP Client](https://github.com/php-debugger/dbgp-client) is a debugger client for
PHP. Its `dbgp` command speaks [DBGp](../reference/debug-protocol.md), the same
protocol your IDE uses to talk to PHP Debugger, and it can be used in two ways:

- **As a debugging tool for AI agents.** `dbgp mcp` is an
  [MCP](https://modelcontextprotocol.io) server that lets an agent such as Claude
  Code debug PHP the way you would: set breakpoints, run the code, step through it,
  and look at the stack, variables, output and warnings.
- **As a command-line debugger.** `dbgp` on its own is an interactive debugger in
  your terminal, for when you want to debug PHP yourself without an IDE.

Both work with PHP scripts and web requests, on your own machine, in a container or
on a server.

## Why let an agent use a debugger?

Ask a coding agent to find out why something is broken and it will usually do one of
two things. It reads the code and reasons about what *should* happen, which works
until the bug is in something it cannot see: the data in your database, a value
from the request, a config setting, the order in which things actually ran. Or it
adds `var_dump()` and log lines, runs the code, reads the output, adds some more, and
eventually has to remember to take them all out again.

That second approach is the one [we tell people to stop using](../user-guide/stop-using-dd.md),
and the reasons are the same for an agent. Every round adds code you did not ask for,
each run shows only what it decided to print beforehand, and anything it forgot to
print means another round.

With a debugger, the agent stops the code where it wants to look and sees everything:
the real values of every variable, the call stack that led there and the path the
code actually took. It does not have to guess what to print, and there is nothing to
clean up afterwards, because your code is never changed.

## Why it pairs well with PHP Debugger

An agent debugs in short bursts, between long stretches of reading and editing code.
For most of that time nothing is being debugged, so the debugger should cost nothing
then.

That is how PHP Debugger works: it can stay on all the time and costs almost nothing
until something is listening. dbgp only listens while the agent is actually
debugging, and stops when it is done. You can leave both of them set up permanently,
and PHP runs at full speed except while the agent is stepping through it.

dbgp also works with Xdebug. Run `php -v` to see which one your PHP has.

## What an agent can do with it

dbgp gives the agent the same tools you have in your IDE:

- **Breakpoints** on a line, optionally with a condition, when a function is called
  or returns, or when an exception is thrown
- **Running and stepping**: run to the next breakpoint, or step into, over and out
  of the code
- **The call stack and variables** in any frame, including large arrays and objects
  a page at a time
- **The source** around where the code stopped
- **What the script printed** and the **PHP warnings and notices** it raised
- **Evaluating PHP expressions** and **changing variables** in the stopped script
- **Path mappings** for PHP running in a container or on another machine

The agent also starts the code to debug on its own, running a script or sending a
web request, so you only have to tell it what is wrong. For example:

> Find out why the total on the checkout page is wrong: debug the request to
> /checkout with a breakpoint in CartService::total().

## How it works

dbgp sits between the agent and PHP. The agent talks to dbgp over MCP, and dbgp
talks to PHP Debugger over DBGp, on port `9003` by default:

```text
AI agent  ──MCP──▶  dbgp  ◀──DBGp, port 9003──  PHP Debugger, in PHP
```

A typical debugging run goes like this:

1. The agent adds a breakpoint and tells dbgp to start listening.
2. It runs the script or sends the request. PHP Debugger connects to dbgp, and the
   script waits there.
3. The agent runs the code to the breakpoint, and looks at the stack, the variables
   and the source.
4. It steps through the code, or runs on to another breakpoint, until it has found
   what it was looking for.
5. It ends the session, removes the breakpoint and stops listening, and PHP runs at
   full speed again.

Each script run or request that connects is a separate session, so the agent can
debug several at a time, for example a web request and the queue job it sets off.

## Security

Like any debugger, dbgp trusts the PHP that connects to it and the agent that uses
it:

- **The agent sees what your code sees.** While debugging, an agent can read every
  variable of the script, including passwords and API keys, and any file PHP can
  read. Start dbgp with `-no-eval` to stop the agent from running PHP code of its own
  in the script, so it can only look. This does not hide anything from it.
- **The PHP port is not authenticated.** Anything that can reach port `9003` can
  connect to dbgp as if it were PHP, and show the agent made-up code and values. Make
  sure only your own PHP hosts and containers can reach it, and use an SSH tunnel or
  a VPN to debug PHP across a network you do not trust.
