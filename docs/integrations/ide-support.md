---
title: IDE Support
---

If you have debugged PHP from your editor before, there is almost certainly nothing
to change. PHP Debugger speaks the same [protocol](../reference/debug-protocol.md)
your editor already knows, on the same port it already listens on. No plugin, no
adapter, no new configuration.

What does change is not the setup. It is a few habits.

## Three habits worth adopting

**Stop worrying about turning it on.** Out of the box the debugger is always
available: every request starts a session and connects the moment your editor is
listening. There is no trigger to set, no browser extension to click, no
`?XDEBUG_SESSION_START=1` to remember, and no separate configuration to switch
between "debugging" and "not debugging". If your existing setup has any of that in
it, you can take it out.

**Listen when you want to debug, and stop when you are done.** This is the switch
now — your editor's, not the debugger's. Start listening when you want to step
through something, stop listening when you have finished. With nothing listening
the debugger tries once, finds no one, and costs you almost nothing for the rest of
the request.

**Remove your breakpoints once you are finished with them.** Every breakpoint left
behind is checked on every request for as long as the session lasts. One forgotten
breakpoint is nothing; twenty of them, accumulated over an afternoon, are a slow
session that gets blamed on the debugger. Delete them rather than disabling them —
a disabled breakpoint is cheaper, not free.

Together these replace the old routine of enabling the debugger for the work and
disabling it afterwards. Leave it on; control the session from your editor instead.

## Editor guides

The two editors most PHP developers use have a page each, covering how to use each
one with the debugger:

- [PhpStorm](./phpstorm.md)
- [VS Code](./vs-code.md)

## Everything else

Any client that speaks DBGp works, and there is nothing specific to do for it.
Point it at port `9003`, start listening, and debug exactly as you always have.

If your editor's existing PHP debugging setup works today, it will keep working —
the three habits above are all that is worth revisiting.
