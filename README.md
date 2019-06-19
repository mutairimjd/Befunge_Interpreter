# Befunge_Interpreter  

This Befunge Interpreter Tool is one of Codewars JavaScript Katas on Level Four, Esoteric languages are pretty hard to program, but it's fairly interesting to write interpreters for them!  

## Befunge-93
 Befunge-93 is a language in which the code is presented not as a series of instructions, but as instructions scattered on a 2D plane; the pointer starts at the top-left corner and defaults to moving right through the code. Read more about Befunge-93 and its instructions from [Wikipedia](https://en.wikipedia.org/wiki/Befunge).

[Give it a try here!](Befunge_Interpreter)

## Instructions 
If your befunge code instructions are separated by directions and each of them on a separate line, like the following befunge code:
```
>987v>.v
v456<  :
>321 ^ _@
```
So then,  please put ```\n``` instead of actual tap for a newline, here's an example of what the above code should look like:  
```
>987v>.v\nv456<  :\n>321 ^ _@
```
this will create the output: **123456789**

![demo](http://g.recordit.co/bAOzy0Hh7i.gif)  

It looks like this tool take time to interpret the given code but it's NOT, nothing with the performance but I do it this way actually to represent how the interpreter works and travel among the given directions!

## Known Issues
* Users must enter their instructions as one line.
* Only a single PC (thread) is supported.
* Just a single unbounded stack.  
**Note:** Befunge-93 code is supposed to be restricted to 80x25.
* The code flow is working asynchronously by using async functions that return promises in order to show users the progress of the interpreter, which affects the performance :").

## References
[The Befunge FAQ](https://web.archive.org/web/20010417044912/http://cantor.res.cmu.edu/bozeman/befunge/beffaq.html)  
[Befunge Interpreter Kata - 4 kyu](https://www.codewars.com/kata/526c7b931666d07889000a3c)  
[Befunge](https://en.wikipedia.org/wiki/Befunge)
