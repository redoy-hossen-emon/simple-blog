# The Daily Press

This project was created while I was learning React and trying to understand how the main pieces fit together. It is a small practice app designed to teach the basics of routing, API data fetching, component state, reusable layouts, and UI organization in a real project.

The Daily Press is a beginner-friendly news and blog portal built with React. It gets sample posts from the [DummyJSON posts API](https://dummyjson.com/posts?limit=0), displays them on different pages, and separates articles by news section.

> **Note:** DummyJSON is a demo data service. Its posts are meant for learning and testing, not for real-time breaking news or verified journalism.

## What this project is trying to teach

This app is not just a website; it is a learning project. It demonstrates several important front-end ideas in a simple build:

- How to create a React application with reusable components.
- How to organize code into page files and shared layout files.
- How to fetch JSON data from an API inside a React app.
- How to manage loading, error, and retry states.
- How to define URL routes and create navigation between pages.
- How to filter data into different categories using tags.
- How to style a UI with Tailwind utility classes.
- How to split a project into small, understandable pieces.

## What the app does

At a high level, the project works like this:

1. It loads a list of posts from an API.
2. It stores that data in React state.
3. It renders the data on different pages.
4. It lets the user browse by section, such as World or Business.
5. It shows the latest stories, popular stories, and blog-style layouts.
6. It gives users a simple reading experience with a clear visual structure.

## Getting started

Before running the project, make sure you have the following installed on your machine:

- Node.js
- npm

### Step-by-step setup

1. Open a terminal in the project folder.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open the local address shown in the terminal. In most cases, this will be:

   ```text
   http://localhost:5173
   ```

5. Make changes in the project files and save them. Vite will automatically reload the page so you can see the updates.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server for local development. |
| `npm run build` | Builds a production-ready version of the app in `dist/`. |
| `npm run preview` | Starts a local preview of the production build. Use this only after running `npm run build`. |
| `npm run lint` | Runs ESLint to check for common React and JavaScript mistakes. |

## Tools and libraries used

The app is built with a small set of front-end tools:

- **React**: creates the UI using reusable components.
- **React DOM**: connects React to the browser DOM.
- **Vite**: handles local development and production bundling.
- **React Router**: controls navigation based on the URL.
- **Tailwind CSS**: provides utility classes for styling.
- **DummyJSON**: supplies the sample data used for posts.
- **ESLint**: helps identify code issues and common mistakes.

One important detail: the browser's built-in `fetch` API is used for requests. Axios is in the project dependencies, but it is not currently used by the application.

## Project structure

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── head/
    │   └── topbar.jsx
    └── category/
        ├── categoryData.js
        ├── byCategoryPage.jsx
        ├── worldPage.jsx
        ├── businessPage.jsx
        ├── technologyPage.jsx
        ├── culturePage.jsx
        ├── travelPage.jsx
        └── lifestylePage.jsx
```

### What each important file does

- **`index.html`**: the main HTML page for the app. It includes the root container that React renders into and loads the app script.
- **`src/main.jsx`**: the entry point of the app. It creates the React root, imports the CSS, and wraps the app in `BrowserRouter` so the router can manage page changes.
- **`src/App.jsx`**: the main app component. It fetches data, manages loading and error states, defines routes, and contains the page components for the main views.
- **`src/head/topbar.jsx`**: the header component. It renders the top navigation, category menu, and general layout shell.
- **`src/category/categoryData.js`**: stores the category names, URLs, and tags used to group posts.
- **`src/category/byCategoryPage.jsx`**: shared logic for category pages. It filters the posts and renders the same card layout for each section.
- **`src/category/*Page.jsx`**: small page components for each category, such as `worldPage.jsx` or `technologyPage.jsx`.
- **`src/index.css`**: global styling file. It imports Tailwind and sets basic styles.
- **`vite.config.js`**: configures Vite, including the React and Tailwind plugins.
- **`package.json`**: lists dependencies and scripts used to run the app.

## How the app starts

The startup flow is simple and follows the normal React + Vite pattern:

1. The browser loads `index.html`.
2. `index.html` loads the JavaScript entry file, which is `src/main.jsx`.
3. `src/main.jsx` finds the element with the ID `root` and tells React to render the app into it.
4. `BrowserRouter` is enabled, which makes URL-based routing possible.
5. The app renders the shared top bar and the page that matches the current URL.
6. The footer and the page content appear in the browser.

`StrictMode` is used in development to help reveal problems by running some React checks more than once. It is not a production requirement; it is mainly a development aid.

## How data fetching works

The project fetches all posts from DummyJSON in `App.jsx` using a constant like this:

```js
const POSTS_URL = 'https://dummyjson.com/posts?limit=0'
```

`limit=0` tells the API to return all available sample posts instead of just the default collection size.

### The app state used for fetching

The `App` component stores all of the data it needs in React state:

```js
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [retry, setRetry] = useState(0)
```

Each piece of state has a specific purpose:

- `posts`: stores the downloaded post list.
- `loading`: tells the app whether data is still being fetched.
- `error`: stores an error message if the request fails.
- `retry`: tracks the number of retries when the user clicks a retry button.

### What React state means

State is data that React remembers between renders. When a state setter is called, such as `setPosts(newPosts)`, React re-renders the interface with the new data.

### How the request is triggered

The `useEffect` hook runs after the component first appears and again whenever the `retry` value changes.

The fetch logic happens in a clear sequence:

1. The app sets a loading state to true and clears any old error message.
2. It calls `fetch` with the DummyJSON URL.
3. It checks `response.ok` to confirm the server responded successfully.
4. It reads the response body using `response.json()`.
5. It verifies that the returned data contains a `posts` array.
6. It stores the posts in state with `setPosts`.
7. If something fails, it stores an error message and shows it on the page.
8. The `finally` block stops the loading indicator no matter what happened.

### Why `AbortController` is used

`AbortController` can cancel an in-flight request if the component unmounts or the effect re-runs before the request finishes. This prevents old fetches from updating the page after the user has moved elsewhere.

### How data is passed to child pages

The fetched data and the loading/error states are passed into page components as props. This is how parent components share information with children.

Example:

```jsx
<WorldPage {...storyListProps} />
```

The `...` syntax spreads the object into the component as individual props.

### Retry behavior

If the fetch fails, the page shows a **Try again** button. When the user clicks it, the `retry` state increases. Because `retry` is included in the `useEffect` dependency list, React runs the fetch effect again and tries the request a second time.

## Pages and routes

The app uses React Router to decide which screen to show based on the current URL.

| URL | Page |
| --- | --- |
| `/` | Latest stories |
| `/popular` | Popular stories sorted by view count |
| `/blogs` | Blog-style list of posts |
| `/about` | About page |
| `/category/world` | World posts |
| `/category/business` | Business posts |
| `/category/technology` | Technology posts |
| `/category/culture` | Culture posts |
| `/category/travel` | Travel posts |
| `/category/lifestyle` | Lifestyle posts |
| Any other URL | Not-found page |

### How routes are defined

The app uses `<Routes>` and `<Route>` elements:

- `<Routes>` groups all route definitions.
- Each `<Route>` connects a URL path to a component.
- `Link` and `NavLink` create navigation without forcing a full browser reload.
- `NavLink` can also highlight the active menu item.

### What each main page does

- **Home**: shows the newest posts.
- **Popular**: sorts a copy of the posts by the number of views and displays the highest ones first.
- **Blogs**: presents the same posts in a blog-style layout.
- **About**: explains the purpose of the publication.
- **Category pages**: display posts that match a specific lifestyle or topic section.

## How category filtering works

Category data is stored in `categoryData.js`. Each category is defined as an object with a name, slug, and tags:

```js
{
  name: 'World',
  slug: 'world',
  tags: ['american', 'ancient', 'community', 'crime', 'diversity', 'history']
}
```

### What each field means

- `name`: visible text for the section.
- `slug`: URL-friendly value used in routes such as `/category/world`.
- `tags`: post tags from DummyJSON that belong in this section.

### How the menu is built

The header maps through the category list and creates a navigation link for each section. When the user clicks a section, React Router opens the matching route.

### How matching happens

Each category page passes its category name and tags into a shared component, such as `CategoryStories` in `byCategoryPage.jsx`. The shared component then filters the full list of posts:

```js
const categoryPosts = posts.filter((post) =>
  (post.tags ?? []).some((tag) => tagSet.has(tag.toLowerCase())),
)
```

### Breaking that code down

- `filter` keeps only posts that match the condition.
- `some` checks whether at least one tag matches the category tags.
- `?? []` ensures an empty array is used if a post has no tags.
- `toLowerCase()` makes the comparison case-insensitive.

This means a section will show any post whose tags match one of the category's configured tags.

### Why the category pages are small

Each individual category file is intentionally minimal. For example, `worldPage.jsx` finds the World entry in the shared data and passes it to the reusable category page component. This keeps the project easier to read and reduces duplicated layout code.

### If you want to add or change categories

To change which posts appear in a section:

- update the `tags` array in `categoryData.js`.

To add a new main section:

1. add a new category object in `categoryData.js`.
2. create a small page component for that section.
3. import it in `App.jsx`.
4. add a matching `<Route>` in the router.

## Navigation menu

The top navigation uses HTML `<details>` and `<summary>` for the Categories dropdown.

- `<summary>` is the clickable label the user sees.
- `<details>` controls the open/closed state of the drop-down menu.
- The links inside the menu use `Link` from React Router.

The search field in the header is currently only visual. It is not connected to filtering logic, and it does not search posts.

## Styling with Tailwind CSS

Most of the styling is done directly in JSX with Tailwind classes.

Example:

```jsx
<article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
```

This gives the element:

- rounded corners
- a subtle border
- a white background
- spacing inside the component
- a light shadow

Responsive behavior is handled with prefixes such as `sm:` and `lg:`:

```jsx
<section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
```

This means:

- on small screens: one column
- on medium screens: two columns
- on large screens: three columns

Tailwind is enabled by Vite and imported into `src/index.css` using:

```css
@import "tailwindcss";
```

## Common React and JavaScript terms

These are some of the ideas the project is designed to teach:

- **Component**: a function that returns a portion of the interface.
- **JSX**: JavaScript syntax that looks like HTML and describes what React should render.
- **Props**: data passed from a parent component to a child component.
- **State**: data that a component stores and updates over time.
- **Hook**: a React function such as `useState` or `useEffect` that adds behavior to a component.
- **Render**: React updates the page when state or props change.
- **Array `map`**: creates one UI element for each item in an array.
- **Array `filter`**: creates a new array with only matching items.
- **`async` / `await`**: JavaScript syntax used for asynchronous work such as fetching data.
- **API**: an external service that provides data to an application.

## A good order for exploring the code

If you want to understand the app in a logical order, follow these steps:

1. Start with `src/main.jsx` to see how React boots up and how routing is configured.
2. Read `src/App.jsx` to understand the main app logic, state, and route setup.
3. Open `src/head/topbar.jsx` to study how the navigation and category menu are built.
4. Go into `src/category/` and inspect the category files and shared page layout.
5. Read `src/category/categoryData.js` and `src/category/byCategoryPage.jsx` to understand category tagging and filtering.
6. Check the JSX and `src/index.css` to see how the page layout and styling are implemented.

## Summary

This project is a practical React learning app. It is intentionally small, but it demonstrates the core ideas that many front-end projects rely on:

- component-based UI
- reusable page layouts
- route-based navigation
- API data loading
- state management
- category filtering
- responsive styling

If you are new to React, this project is a good way to see how those parts fit together in a real application without making the code too large or complicated.
