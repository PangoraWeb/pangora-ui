Welcome to the Pangora-UI contributors zone! This will walk you through different ways you can contribute to the project to help it out

We have a matrix space [here](https://matrix.to/#/#pangora:matrix.org) thats used for chatting with each other

# Bug Reporting
Bug reports are handled in the issues tab in GitHub [here](https://github.com/PangoraWeb/pangora-ui/issues). Feel free to make an issue if you find something wrong with the UI

# Code Contributions
If you want to contribute code to the project feel free to say youre working on one of the issues in the issues tab. You can reach out to me (Ategon) if you want to be added to the github organization so you can access the task list for the project otherwise ill update the tasks there based on your comments in the issues.

If youre working on something make sure to give updates so we know its progressing. If youve claimed something but there hasnt been any updates for a bit we will try to reach out to see if youre still working on it or if someone else can start working on it

In the project we use:
- Next.js (Web development framework built on React)
- Typescript (Strongly typed programming language that builds on JavaScript)
- Tailwind (CSS framework)
- ESLint (Static code analysis tool)
- NextUI (UI library)
- Prettier (Code formatter)
- Jam Icons (Icons)

When you commit code it will be checked against ESLint to see if theres any issues with the syntax. It will tell you everything wrong and then let you fix it before you can finish the commit

## Getting started
*you can also check out [this repo](https://github.com/firstcontributions/first-contributions) for getting help starting out with contributing on github and for more details on the first steps*
1. Fork the repository to create a copy of it in your account 
2. Clone your forked repository to your machine
3. Go into the folder you just made (pangora-ui) and type npm install to install the dependencies of the project
4. Type npm run dev to start up the site locally on port 3000. You should now be able to visit it by going to localhost:3000 in your browser (may take a bit to show up the first time but should say compiling /page in the terminal)
5. Now you can make changes to the code and when you save the file it will reflect it in the localhost:3000 site for instant feedback

## Adding UI
We use elements from NextUI to make building up various parts of the frontend much quicker and easier as well as with better accessibility support. You can check out their documentation here: https://nextui.org/docs/guide/introduction and they have various different kinds of things that can be added in as react elements (they have examples of all of the different kinds of elements along with a code tab for each with code on how they created it using the library)

## Styling Elements
To style elements we use tailwind which is a CSS framework that allows you to add CSS without leaving the main site code. Styling is done by assing an attribute named className (dont use class, instead className is used when working with Next.js) and then putting various different text in there based on what tailwind defines to style it. You can find their docs here https://tailwindcss.com/docs/aspect-ratio and you can easily search the tailwind equivalent of vanilla CSS there

## Icons
For icons we mostly use things from jam icons. You can check out their site [here](https://jam-icons.com/) and search for any icon you might need (note some may have slightly different names than what you expect, e.g. the chat bubble is called "message")). TO use one just hit the copy icon button when hovering over it and then paste that code into where you want it. You can adjust the width property to change the width of it and set the text color in a surrounding div to change the color of the icon

If the icon you want is the icon of a brand you cna get it from https://simpleicons.org/ instead

## Types
We use TypeScript which is a strongly typed programming language that builds on JavaScript. This means that you need to explicitly define the types of things if you make a variable as opposed it to being able to be anything. Its a relatively easy syntax and if you know JavaScript you should be able to pick up it pretty easily since its just the same thing but with types. You can find their docs here: https://www.typescriptlang.org/docs/

Hope you enjoy working on the repo! :)  
Make sure to join us on [matrix](https://matrix.to/#/#pangora:matrix.org)
