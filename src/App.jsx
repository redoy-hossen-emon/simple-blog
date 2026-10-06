import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import BusinessPage from './category/businessPage.jsx'
import CulturePage from './category/culturePage.jsx'
import LifestylePage from './category/lifestylePage.jsx'
import TechnologyPage from './category/technologyPage.jsx'
import TravelPage from './category/travelPage.jsx'
import WorldPage from './category/worldPage.jsx'
import TopBar from './head/topbar.jsx'

const POSTS_URL = 'https://dummyjson.com/posts?limit=0'

function StoryList({ posts, loading, error, onRetry }) {
  const { pathname } = useLocation()
  const isPopular = pathname === '/popular'
  let filteredPosts = posts

  if (isPopular) {
    filteredPosts = [...filteredPosts].sort((first, second) => second.views - first.views)
  }

  const heading = isPopular ? 'Popular stories' : 'Latest stories'

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">The Daily Press</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{heading}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          The latest stories and ideas from around the world.
        </p>
      </div>

      {loading && (
        <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm" role="status">
          Loading stories...
        </p>
      )}

      {error && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800" role="alert">
          <p>{error}</p>
          <button className="rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800" onClick={onRetry} type="button">
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">No stories found. Try another search or category.</p>
      )}

      {!loading && !error && filteredPosts.length > 0 && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="News stories">
          {filteredPosts.map((post) => (
            <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key={post.id}>
              <div className="mb-4 flex flex-wrap gap-2">
                {(post.tags ?? []).map((tag) => (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-xl font-bold leading-snug text-slate-900">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{post.body}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span>{post.views.toLocaleString()} views</span>
                <span>{post.reactions?.likes ?? 0} likes</span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <section className="rounded-xl bg-slate-900 px-6 py-12 text-white sm:px-12 sm:py-16">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">About The Daily Press</p>
        <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          News for curious minds.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          We make it easy to discover interesting stories and explore the topics shaping our world.
        </p>
      </section>

      <section className="grid gap-10 py-12 sm:grid-cols-2 sm:py-16">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">Our purpose</p>
          <h2 className="font-serif text-3xl font-bold text-slate-900">A little more context. A little more curiosity.</h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-slate-600">
          <p>
            The Daily Press is a simple news and blog experience built for readers who want to keep learning.
            Browse the latest posts, search for a subject, or explore stories by category.
          </p>
          <p>
            Our stories are loaded from DummyJSON, so this project can focus on making it easy to explore
            real API data in a clean, straightforward way.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-7 sm:p-9">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">What you can do here</p>
        <div className="grid gap-6 pt-3 sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Read</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Catch up on the latest stories and popular posts.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Explore</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Choose a topic from the Categories menu to filter stories.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Discover</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Search headlines and story text to find something new.</p>
          </div>
        </div>
        <Link className="mt-7 inline-block rounded bg-red-600 px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-red-700" to="/">
          Browse latest stories
        </Link>
      </section>
    </main>
  )
}

function BlogPage({ posts, loading, error, onRetry }) {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">From our writers</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">The Blog</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Ideas, perspectives, and stories worth taking a moment to read.
        </p>
      </div>

      {loading && <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm" role="status">Loading blog posts...</p>}

      {error && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800" role="alert">
          <p>{error}</p>
          <button className="rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800" onClick={onRetry} type="button">
            Try again
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">No blog posts found.</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <section className="grid gap-5 md:grid-cols-2" aria-label="Blog posts">
          {posts.map((post) => (
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={post.id}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-600">
                {(post.tags ?? []).join(' · ')}
              </p>
              <h2 className="font-serif text-2xl font-bold leading-snug text-slate-900">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.body}</p>
              <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                {post.views.toLocaleString()} views · {post.reactions?.likes ?? 0} likes
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}



function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function getPosts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(POSTS_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Could not load stories. Please try again.')
        }

        const data = await response.json()
        if (!Array.isArray(data.posts)) {
          throw new Error('The news service returned an invalid response.')
        }

        setPosts(data.posts)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    getPosts()
    return () => controller.abort()
  }, [retry])

  const storyListProps = {
    posts,
    loading,
    error,
    onRetry: () => setRetry((value) => value + 1),
  }

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<StoryList {...storyListProps} />} />
        <Route path="/blogs" element={<BlogPage {...storyListProps} />} />
        <Route path="/popular" element={<StoryList {...storyListProps} />} />
        <Route path="/category/world" element={<WorldPage {...storyListProps} />} />
        <Route path="/category/business" element={<BusinessPage {...storyListProps} />} />
        <Route path="/category/technology" element={<TechnologyPage {...storyListProps} />} />
        <Route path="/category/culture" element={<CulturePage {...storyListProps} />} />
        <Route path="/category/travel" element={<TravelPage {...storyListProps} />} />
        <Route path="/category/lifestyle" element={<LifestylePage {...storyListProps} />} />
        <Route path="/about" element={<AboutPage />} />
       
      </Routes>
      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
        The Daily Press · Independent. Informed. Inspired.
      </footer>
    </>
  )
}

export default App
