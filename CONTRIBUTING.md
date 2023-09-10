Welcome to the Pangora-UI contributors zone! This will walk you through different ways you can contribute to the project to help it out

We have a matrix space [here](https://matrix.to/#/#pangora:matrix.org) thats used for chatting with each other

## Bug Reporting
Bug reports are handled in the issues tab in GitHub [here](https://github.com/PangoraWeb/pangora-ui/issues). Feel free to make an issue if you find something wrong with the UI

## Code Contributions
If you want to contribute code to the project feel free to say youre working on one of the issues in the issues tab. You can reach out to me (Ategon) if you want to be added to the github organization so you can access the task list for the project otherwise ill update the tasks there based on your comments in the issues.

If youre working on something make sure to give updates so we know its progressing. If youve claimed something but there hasnt been any updates for a bit we will try to reach out to see if youre still working on it or if someone else can start working on it

In the project we use:
- Next.js (Web development framework built on React)
- Typescript (Strongly typed programming language that builds on JavaScript)
- Tailwind (CSS framework)
- ESLint (Static code analysis tool)
- NextUI (UI library)
- Prettier (Code formatter)

When you commit code it will be checked against ESLint to see if theres any issues with the syntax. It will tell you everything wrong and then let you fix it before you can finish the commit

### Getting started
1. To get the project clone it using `git clone https://github.com/PangoraWeb/pangora-ui.git` (with that ran in a terminal with the location set to the parent folder you want the project folder to reside in)
2. Go into the folder you just made (pangora-ui) and type npm install to install the dependencies of the project
3. Type npm run dev to start up the site locally on port 3000. You should now be able to visit it by going to localhost:3000 in your browser (may take a bit to show up the first time but should say compiling /page in the terminal)
4. Now you can make changes to the code and when you save the file it will reflect it in the localhost:3000 site for instant feedback

### Adding UI
We use elements from NextUI to make building up various parts of the frontend much quicker and easier as well as with better accessibility support. You can check out their documentation here: https://nextui.org/docs/guide/introduction and they have various different kinds of things that can be added in as react elements (they have examples of all of the different kinds of elements along with a code tab for each with code on how they created it using the library)

### Styling Elements
To style elements we use tailwind which is a CSS framework that allows you to add CSS without leaving the main site code. Styling is done by assing an attribute named className (dont use class, instead className is used when working with Next.js) and then putting various different text in there based on what tailwind defines to style it. You can find their docs here https://tailwindcss.com/docs/aspect-ratio and you can easily search the tailwind equivalent of vanilla CSS there

### Types
We use TypeScript which is a strongly typed programming language that builds on JavaScript. This means that you need to explicitly define the types of things if you make a variable as opposed it to being able to be anything. Its a relatively easy syntax and if you know JavaScript you should be able to pick up it pretty easily since its just the same thing but with types. You can find their docs here: https://www.typescriptlang.org/docs/

Hope you enjoy working on the repo! :)  
Make sure to join us on [matrix](https://matrix.to/#/#pangora:matrix.org)
