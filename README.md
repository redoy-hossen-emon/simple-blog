# The Daily Press

The Daily Press is a beginner-friendly React news and blog portal. It fetches posts from the [DummyJSON posts API](https://dummyjson.com/posts?limit=0), displays them on different pages, and lets readers browse posts by news section.

> **Note:** DummyJSON is a sample data service. Its posts are for practicing with API data; they are not live or verified breaking news.

## Getting started

You need Node.js and npm installed.

1. Open a terminal in the project folder.
2. Install the project's dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local address printed in the terminal, usually `http://localhost:5173`.

The development server updates the page as you save changes.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local Vite development server. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally so you can preview it. Run the build first. |
| `npm run lint` | Checks the project for common JavaScript and React code issues. |

## Tools and libraries

- **React** builds the interface from reusable components. A component is a JavaScript function that returns JSX (HTML-like syntax).
- **React DOM** puts the React interface into the page.
- **Vite** runs the local development server and bundles the project for production.
- **React Router** changes pages based on the URL without reloading the whole website.
- **Tailwind CSS** styles elements with utility classes such as `bg-white`, `p-6`, and `text-slate-600`.
- **DummyJSON** provides the sample post data.
- **ESLint** checks for common coding mistakes and style issues.

The project uses the browser's built-in `fetch` function to request posts. Axios is listed as a dependency but is not currently used by the application.

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

### What the important files do

- **`index.html`** is the browser page that contains the React root element and loads the app.
- **`src/main.jsx`** is the app's entry point. It creates the React root, imports the main CSS, and wraps the app in `BrowserRouter` so routes work.
- **`src/App.jsx`** fetches posts, keeps track of loading and error state, and declares the website's routes. It also contains the latest, popular, blog, about, and not-found page components.
- **`src/head/topbar.jsx`** renders the site header and navigation menu. It reads section names from `categoryData.js` and uses React Router links.
- **`src/category/categoryData.js`** defines the six main news sections and which API tags belong to each section.
- **`src/category/byCategoryPage.jsx`** is the shared layout and filtering logic for category pages.
- **`src/category/*Page.jsx`** files (for example, `worldPage.jsx`) are small components for each category. Each one passes its title and tags to the shared category page.
- **`src/index.css`** imports Tailwind CSS and contains a small set of global styles.
- **`vite.config.js`** connects Vite to the React and Tailwind plugins.
- **`package.json`** lists project dependencies and the commands you can run with npm.

## How the app starts

1. The browser loads `index.html`.
2. `index.html` loads `src/main.jsx`.
3. `main.jsx` finds the element with the ID `root` and tells React to render the app there.
4. `BrowserRouter` watches the browser URL and makes routing features available.
5. `App.jsx` renders the shared top bar, the page matching the current route, and the footer.

`StrictMode` in `main.jsx` is a React development helper. It can run some checks more than once during development to help reveal problems.

## How fetching posts works

In `App.jsx`, this constant sets the API address:

```js
const POSTS_URL = 'https://dummyjson.com/posts?limit=0'
```

`limit=0` asks DummyJSON to return all of its sample posts instead of only the default page of results.

The `App` component uses React state for the loaded posts, loading indicator, error message, and retry count:

```js
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [retry, setRetry] = useState(0)
```

Here, **state** means data React remembers between renders. Calling a state setter, such as `setPosts(...)`, tells React to render the updated interface.

The `useEffect` hook starts the request when `App` first appears. It also runs again when the retry count changes:

1. The app turns on its loading state and clears any old error.
2. `fetch` sends a request to the API.
3. `response.ok` is checked so HTTP errors are not treated as successful responses.
4. The response body is converted from JSON into JavaScript data with `response.json()`.
5. The app checks that the response contains a `posts` array, then saves those posts with `setPosts`.
6. If something fails, an error is saved and shown on the page.
7. The `finally` block turns off the loading state after the request finishes.

The `AbortController` cancels the request if the component is removed or the effect is restarted before the request finishes. This helps avoid updating the page with an old request result.

The same posts and loading/error information are passed to the page components as **props**. Props are values a parent component gives to a child component. For example:

```jsx
<WorldPage {...storyListProps} />
```

The `...` here is JavaScript's spread syntax: it passes each property in `storyListProps` to `WorldPage`.

If loading fails, pages show a **Try again** button. Clicking it increases the retry state. Since `retry` is listed as a `useEffect` dependency, React runs the fetch effect again.

## Pages and routes

React Router selects a page based on the current URL:

| URL | Page |
| --- | --- |
| `/` | Latest stories |
| `/popular` | Popular stories, sorted by view count |
| `/blogs` | Blog-style list of the fetched posts |
| `/about` | About The Daily Press |
| `/category/world` | World posts |
| `/category/business` | Business posts |
| `/category/technology` | Technology posts |
| `/category/culture` | Culture posts |
| `/category/travel` | Travel posts |
| `/category/lifestyle` | Lifestyle posts |
| Any other URL | Not-found page |

`<Routes>` contains the route definitions, and each `<Route>` connects a path to a page component. `Link` and `NavLink` change the URL without a full browser reload. `NavLink` can also style the active navigation item.

The **Home** and **New** links both go to `/`, which displays the latest posts. The **Popular** page sorts a copy of the posts by views, highest first. The **Blogs** page uses the same API data in a different layout.

## How category filtering works

`categoryData.js` contains objects like this:

```js
{
  name: 'World',
  slug: 'world',
  tags: ['american', 'ancient', 'community', 'crime', 'diversity', 'history']
}
```

- `name` is the text shown in the menu and page heading.
- `slug` is the simple URL part, used in `/category/world`.
- `tags` are DummyJSON post tags that should appear in that section.

The top bar maps over the category list to create one direct link for each section. When you select **World**, React Router opens `/category/world`.

Each category page passes its category's name and tags to `CategoryStories` in `byCategoryPage.jsx`. That shared component uses JavaScript's `filter` method to keep posts that have at least one matching tag:

```js
const categoryPosts = posts.filter((post) =>
  (post.tags ?? []).some((tag) => tagSet.has(tag.toLowerCase())),
)
```

In this expression:

- `filter` checks each post and keeps only posts that match.
- `some` checks whether at least one of the post's tags matches.
- `?? []` means “use an empty array if tags are missing.”
- `toLowerCase()` makes the comparison case-insensitive.

Each individual category file is intentionally small. For example, `worldPage.jsx` finds the World entry in the shared category data and passes its information to `CategoryStories`. This keeps the URL routes and category pages easy to find without copying the same card layout six times.

To change which posts appear in a section, edit that section's `tags` array in `categoryData.js`. To add a new main section, add its data, make a small page component that uses `CategoryStories`, import it in `App.jsx`, and add a matching `<Route>`.

## Navigation menu

The menu in `topbar.jsx` uses the HTML `<details>` and `<summary>` elements for its Categories dropdown:

- `<summary>` is the visible menu label.
- `<details>` opens when clicked and can also open on hover.
- The category links inside it use React Router's `<Link>`.

The search field in the header is currently **visual only**. It is read-only and does not search or filter posts.

## Styling with Tailwind CSS

Most styling is written directly in JSX using Tailwind utility classes. For example:

```jsx
<article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
```

This applies a rounded corner, border, white background, padding, and a light shadow. Responsive prefixes such as `sm:` and `lg:` apply styles at larger screen sizes:

```jsx
<section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
```

This makes the story cards one column on small screens, two columns on medium screens, and three columns on large screens.

Tailwind is enabled by the Vite plugin in `vite.config.js` and imported in `src/index.css` with:

```css
@import "tailwindcss";
```

## Understanding common React and JavaScript terms

- **Component:** A function that returns a piece of the interface, such as `TopBar` or `BlogPage`.
- **JSX:** HTML-like syntax used inside JavaScript to describe what React should display.
- **Props:** Data passed from a parent component to a child component.
- **State:** Data a component remembers and can update, such as posts or the loading flag.
- **Hook:** A React function such as `useState` or `useEffect` that adds behavior to a component.
- **Render:** React updating the page to match the current state and props.
- **Array `map`:** Makes one interface element for each item in an array. The story lists use it to make a card for each post.
- **Array `filter`:** Makes a new array containing only items that meet a condition. Category pages use it to select posts.
- **`async` / `await`:** JavaScript syntax for writing code that waits for a request or other asynchronous work.
- **API:** A service that lets one program request data from another. This project gets sample posts from DummyJSON.

## A good order for exploring the code

1. Start at `src/main.jsx` to see how React and routing are started.
2. Read the routes and fetch effect in `src/App.jsx`.
3. Open `src/head/topbar.jsx` to see how the navigation is displayed.
4. Follow a category route into its file under `src/category/`.
5. Read `src/category/categoryData.js` and `src/category/byCategoryPage.jsx` to understand how category posts are selected.
6. Inspect the Tailwind classes in the JSX and `src/index.css` to see how the pages are styled.
# simple-blog
