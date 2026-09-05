---
title: Step Debugging
---

When a [breakpoint](./breakpoints.md) fires, your script freezes exactly where it
is and the debugger hands control to your editor. Nothing else happens until you
say so — PHP is sitting inside the request, holding its stack, its variables and
its open connections, waiting.

From there you have four ways to move, and two ways to finish.

## Moving through the code

| Action | What happens |
| --- | --- |
| Step into | Runs the next statement. If it calls a function, enter the function and stop on its first line. |
| Step over | Runs the next statement, including any calls it makes, and stops on the line after without entering them. |
| Step out | Runs the rest of the current function and stops just after it returns. |
| Run | Carries on until the next breakpoint, or to the end of the request. |

**Step into** is the one that follows your code down. It descends into your
functions, methods and closures, and into files pulled in by `include` or
`require`. Bear in mind that it descends into *everything* your code calls — step
into a line that starts with a framework call and you can find yourself several
layers deep in code you did not write.

**Step over** is what you want on the lines you already trust. The call still
happens, and its breakpoints still fire — stepping over a function does not disable
what is inside it. It only means you do not want to watch.

**Step out** is the way back up when you have descended too far, or when you have
seen what you needed to and want to get back to the caller. If you are already at
the top level, there is nothing to return to, and it behaves like Run.

**Run** — your editor may call it Continue or Resume — continues running the
script. If nothing else stops it, the request completes normally and the session
ends with it.

## Run to cursor

Most editors offer a "run to cursor" or "run to here": put the caret somewhere
ahead and the script continues until it reaches that spot.

There is no such command in the debugger. What your editor does is set a
[temporary breakpoint](./breakpoints.md#temporary-breakpoints) on that line and
then Run. The breakpoint fires once and switches itself off, which produces exactly
the behaviour you asked for.

Worth knowing for two reasons. The line still has to be one that executes, exactly
as with any other breakpoint — aim at a comment or a closing brace and the script
will run straight past it to the end. And it is subject to everything else in the
way: any other breakpoint that fires first will stop you before you arrive.

## Seeing return values

By default, stepping out of a function drops you on the line after the call, and
the value that came back is not shown anywhere — you have to step on and inspect
whatever it was assigned to. If it was not assigned to anything, or the call is
part of a longer chain, that value is awkward to get at.

The debugger can add an extra stop on the way out of each function, showing what it
is about to return. This is off unless your editor asks for it — it is negotiated
when the session starts, so where you turn it on is an editor setting, usually
along the lines of "break on return" or "show return values".

The cost is one more stop per function you step out of, which is the reason it is
not on by default. Turn it on while you are chasing a wrong value through a chain
of calls, and off again afterwards.

## Stopping and detaching

Two ways to end a session, and the difference matters:

| Action | Effect |
| --- | --- |
| Stop | The script is killed. It does not finish. |
| Detach | The debugger lets go and the script runs to completion on its own. |

**Stop** terminates the request where it stands. Nothing after the current point
runs — no remaining output, no shutdown functions, no destructors you were counting
on. Anything half-finished stays half-finished: a transaction that was never
committed, a file that was written but not closed, a queue message taken but not
acknowledged.

**Detach** disconnects the debugger and leaves the script running. Breakpoints stop
firing, the request finishes as it normally would, and your editor goes quiet. This
is the one to use when you have seen what you came for on a request that ought to
complete — a checkout that should reach the end, a job that should be marked done.

Neither turns the debugger off. The next request starts a fresh session and
connects again, so if you are stepping through something and want the noise to stop
for a while, disconnect your editor rather than detaching from each request in turn.
