---
"fnm": patch
---

fix `cd /d <drive>` failing in Windows Command Prompt when use-on-cd is enabled: the generated `cd.cmd` always prepended `/d`, so a user-supplied `/d` was passed twice and `cd` failed with "The syntax of the command is incorrect". Fixes #1556

```sh-session
> cd /d D:\
The syntax of the command is incorrect.
```
