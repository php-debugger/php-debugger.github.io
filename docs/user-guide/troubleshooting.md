---
title: Troubleshooting
---

Almost every "the debugger does not work" report is one of three things: it is not
running, it is running but cannot reach your editor, or it reaches your editor and
the breakpoints do not match your files. This page walks those in order.

## Start here: is it loaded?

Before anything else, confirm the debugger is present in the PHP that is actually
running your code:

```bash
php -v
```

You are looking for a line like this among the ones that follow the version:

```
    with PHP Debugger v0.3.0, Copyright (c) 2002-2026, by Derick Rethans
```

If it is not there, nothing else on this page will help until it is.

**Using the interpreter with the debugger built in?** Then that line is always
present, so its absence means you are running a *different* PHP from the one you
think. Check with `which php`, and remember that your web server, your container
and your shell can each have their own.

**Using the extension?** Look above the version output for a loading error. A line
starting `Failed loading` names the problem directly — a path that does not exist,
or a build that does not match this PHP. An extension has to be built for the same
PHP version, and the same thread-safety and debug settings; a mismatch will not
load. If there is no error at all, the extension is simply not being loaded, so
check that a `zend_extension=` line for it exists in a file this PHP actually reads
— `php --ini` lists them.

If none of that gets it loaded, start again from
[Installation](../getting-started/installation.mdx), which covers each way of
installing it and what that puts where.

## Then ask the debugger

With it loaded, ask the debugger what it thinks is going on before changing any
settings. Put this somewhere the request will reach:

```php
php_debugger_info();
```

It prints a page telling you whether the debugger is loaded, what mode it is in,
whether a session is active, and — if one is — which client it connected to.

The part worth scrolling to is **Diagnostic Log**. It lists every warning and error
the debugger raised during this request, with a link explaining each one. A refused
connection, a rejected trigger value, an unreadable log file: they all show up here
without you configuring anything first.

If that page does not appear at all, the debugger is not loaded after all, whatever
`php -v` seemed to say — most likely the request is being served by a different PHP
from the one you checked. Go back to the section above.

## Nothing happens at all

No connection attempt, no error, nothing in your editor.

**Check the mode.** `php_debugger.mode` has to be `debug`, which is the default. If
something set it to `off`, the debugger does nothing and says nothing.

**Check nothing else is loaded alongside it.** PHP Debugger takes the place of
Xdebug and the two cannot both be loaded. A leftover `zend_extension=xdebug.so`
line is the usual culprit — one of the two loses, and which one is not something to
rely on. Look for it in every file, not just `php.ini`: distributions scatter
`conf.d` snippets, and Docker images add their own.

**Check a session is meant to start.** By default every request starts one. If
`php_debugger.start_with_request` has been set to `trigger`, nothing happens
without a trigger present; if it is `no`, nothing happens at all. See
[starting the debugger](./starting-the-debugger.md).

## It tries to connect but nothing arrives

This is the common one, and the log answers it directly. Point it at a file:

```ini
php_debugger.log=/tmp/php-debugger.log
```

Then make a single request and read what it wrote. At the default level there is a
line for every connection attempt, saying where it tried and whether it worked, and
that one line usually ends the investigation.

**"Connecting to configured address/port" and then nothing** means the address is
wrong or nothing is listening. Two things to confirm, in this order: that your
editor is actually listening — most only listen while you have started a listening
session, not merely because the editor is open — and that
`php_debugger.client_host` names a machine your code can reach. Inside a container
`localhost` is the container itself, which is the single most frequent cause. See
[connecting to a client](./connecting-to-a-client.md).

**No connection line at all** means the debugger never got as far as trying. Go
back to the section above — this is a session that never started, not a connection
that failed.

## It connects but breakpoints do not fire

The session is live, stepping might even work, but your breakpoints are ignored.

**Path mapping is the first suspect.** The debugger reports paths as the machine
running your code sees them. When that is a container, or another machine, those
are not the paths your editor knows, and a breakpoint set on
`/home/you/project/src/Foo.php` means nothing to a debugger running
`/var/www/src/Foo.php`. Your editor has a path
mapping setting for exactly this; it needs to know that one directory corresponds
to the other. Nothing about this is configured in `php.ini`.

**The line may not be executable.** Blank lines, comments, closing braces and `use`
statements are never reached. Most editors move the marker or mark the breakpoint
unverified — if yours shows breakpoints as resolved or unresolved, trust that
signal.

**A condition may never be true.** An expression that cannot be evaluated in that
scope counts as false and fails silently, so a typo in a condition looks exactly
like a breakpoint that does not work. Remove the condition and see if it fires.

**The file may not be the one running.** A stale OPcache copy, a deployed build
rather than your working tree, a vendored duplicate of the class you think you are
editing. Set a breakpoint on the first line of the file and, if it fires, look at
the path the debugger reports.

## It works, but everything is slow

**Look for breakpoints you have forgotten.** Every one is checked on every request,
and a list built up over an afternoon is not free. Delete rather than disable.

**Check `php_debugger.on_demand_debugging_enabled`.** If it is on, every request is
compiled with debugging instrumentation whether or not it is debugged, which costs
roughly half the benefit of using this debugger at all. Turn it off unless you
genuinely need to attach mid-request.

## Still stuck

Raise `php_debugger.log_level` to `10` and make one request. That level records the
decisions leading up to a session — each trigger it checked for, each configuration
value it resolved — so it answers "why did it not even try" rather than "why did
the attempt fail".

If you are certain the debugger and your editor are talking but disagreeing, level
`5` logs every protocol message in both directions. It is verbose and it is the
right tool for exactly one question: what was actually sent.

Both are described on the [logging](./logging.md) page. A log from level `10`, with
the request you made and what you expected, is also the most useful thing you can
attach to a bug report.
