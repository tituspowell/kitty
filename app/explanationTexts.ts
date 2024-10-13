// This is the text that appears in a modal in each mini-app when the user clicks 'explain please'.
// So as to not appear as a wall of text, each one is broken into paragraphs, stored as an array of strings.

export const todoAppExplanation: string[] = [
  `This Task List React app keeps track of a list of tasks that you can add to, delete and edit, storing them with React's useState hook and persisting them to localStorage so they aren't reset if you refresh the page.`,
  `It uses Context API to manage the state, and useMemo and useCallback hooks for optimisation purposes, to avoid unnecessary re-renders.`,
  `Next.js handles the nested routing; the navbar is shared across all pages while each page has its own content. Typescript is used to impose rigorous type safety since Javascript is overly relaxed about it, which can lead to subtle bugs. Tailwind CSS is used for the styling and toggleable light/dark theme. The animations, such as when you move tasks up or down in the list, are done with Framer Motion.`,
];

export const moviesAppExplanation: string[] = [
  `This Movie Search React app demonstrates data fetching via an external API, in this case the TMDB movie database API.`,
  `The user enters a search term and that is used to fetch the relevant movie data from TMDB. The results are then displayed in a grid.`,
  `The layout is responsive, as is the rest of the website, so that it adapts to whatever screen size the user is using. If you are familiar with browser dev tools, you can verify this by changing the display size.`,
  `Since the data fetching is asynchronous, a loading animation is shown until the results are returned.`,
  `Next.js is a full-stack framework and where possible server components are used to allow server side rendering and then the interactive parts are hydrated client-side. This is faster, so a better user experience and SEO.`,
];

export const storyAppExplanation: string[] = [
  `This Story Generator React app uses Huggingface's API to interact with a pre-trained AI model, in this case 'Mistral-7B-Instruct-v0.1'.`,
  `The code does some simple prompt engineering incorporating user-supplied inputs to generate a prompt requesting a story which it then submits to Huggingface. The response it gets back (the story) is then checked and displayed to the user.`,
  `Huggingface requires an API access token, and in a purely front-end web app, it would be difficult to guarantee that this stays private. But because Next.js has server components, the API can be accessed from the local environment on the server and it is never sent to the client.`,
];
