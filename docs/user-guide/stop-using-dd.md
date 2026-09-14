---
title: Stop using dd()
---

Most PHP developers debug by printing. A `dd()` here, a `var_dump()` and `die` there,
run it again, read the output, move the call somewhere else, run it again. Whole
careers have been built on it, and it works often enough to feel like a method
rather than a habit.

It is worth asking why it became the default, because the reasons were real — and
because most of them no longer hold.

## Why it made sense

For a long time, a step debugger for PHP was something you set up once, fought with,
and gave up on.

It was **hard to install**: a separate extension to get in place, and an editor to
configure to match it.

It was **slow**: loading it made every request noticeably worse, so it was something
you enabled to hunt one bug and disabled immediately afterwards.

It was **not there when you needed it**. Because it was slow, it stayed off. Because
it stayed off, hitting a bug meant stopping, turning it on, restarting things, and
trying to reproduce what you had just seen. By then, printing a variable and
re-running had already answered the question.

Against that, `dd()` was the rational choice. It needed nothing, cost nothing when
absent, and was always available.

## What changed

All three of those reasons are gone.

**The setup is one command.** The [installer](../getting-started/installation.mdx)
works out what you are running and puts the right build in place. There are
[prebuilt Docker images](../getting-started/docker.mdx) if you would rather not
install anything at all.

**It is fast.** With no editor connected the cost is close to nothing — the debugger
tries once, finds no one listening, and gets out of the way. This is the whole point
of the project.

**It is always available.** Because it costs almost nothing, there is no reason to
turn it off. Every request can be debugged, so the moment you want to look at
something you already can — no restart, no configuration change, no reproducing the
bug a second time.

The debugger being off when you needed it was what made printing worth it. That is
no longer true.

## What printing cannot do

Some of this is impossible with `dd()`. The rest is possible but so tedious that
nobody does it.

**See everything in scope, not just what you guessed.** `dd($order)` shows you
`$order`. If the problem turns out to be `$discount`, that is another edit and
another run. [The variables panel](./inspect-variables.md) shows all of it at once,
including private and protected properties, without a single guess.

**Look at the caller.** When a function chokes on what it was handed, the useful
question is what the caller passed and where it came from. A debugger lets you
[step up the call stack](./inspect-variables.md#stack-levels) and read the caller's
variables at the moment it made the call. With printing you have to go and edit the
caller too.

**Carry on afterwards.** `dd()` kills the request — that is the second `d`. You see
one moment and lose everything after it: the rest of the function, the response,
the shutdown, the commit. A breakpoint pauses; you look, and then you
[keep going](./step-debugging.md).

**Watch a value change.** Printing gives you one snapshot per edit-and-run cycle. To
see how a value evolves you add a dump per line, or a dump in a loop and then scroll
through a thousand of them. Stepping shows you the change as it happens, and a
[watch expression](./watches-and-edits.md) keeps the value in front of you at every
stop.

**Stop on the iteration that matters.** A dump inside a loop gives you every
iteration. A [conditional breakpoint](./breakpoints.md#conditions) gives you the one
where `$i > 1000 && $found === null` — the case you actually care about, with
everything else running at full speed.

**Catch a throw where it happens.** An
[exception breakpoint](./breakpoints.md#exception-breakpoints) stops at the line
that threw, before any `catch` runs, with the stack as it was. Printing gets you
whatever the handler chose to log, from wherever it eventually ended up.

**Change something and see what happens.** Force a retry path, hand an error handler
a malformed response, push a value over a threshold —
[edit the value in place](./watches-and-edits.md#editing-values) and carry on,
rather than contriving the input or editing the code to fake it.

**Debug what you cannot see.** A dump only helps if you can read the output. An API
request, a queue worker, a webhook, a redirect, an AJAX call that a browser swallows
— all of them are ordinary debugging sessions, and none of them show you a
`var_dump()`.

**Leave no trace.** Every `dd()` is an edit to your code, which means one can be
committed, and eventually one is. Breakpoints live in your editor and cannot ship.

## When it is still fine

None of this makes printing wrong.

If you want to know whether a line is reached, or what one variable holds at one
point, and the answer ends the matter — print it. Starting a session to answer a
question that a single `var_dump()` settles in five seconds is not a better
workflow, it is a worse one.

The line is roughly this: printing suits a question you already know the shape of.
The moment you find yourself moving the call around, adding a second one, or running
it a third time to see what changed, you have stopped answering a question and
started searching. That is what the debugger is for, and it will be faster from the
second run onwards.

## Worth reconsidering

If printing is your whole workflow, it is likely because of how debuggers used to
be, not because of a comparison you have made recently. That is a reasonable way to
have ended up here — the tools really were not good enough, and the habit really did
work.

The next time you reach for `dd()`, consider setting a breakpoint instead and seeing
how far it gets you. Start your editor listening, put a breakpoint on the line you
would have dumped from, and look around when it stops. There is nothing to install
and nothing to turn on.

If you have not tried it since the tooling got better, it is worth one afternoon to
find out.
