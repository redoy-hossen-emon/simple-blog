function CategoryStories({ title, tags, posts, loading, error, onRetry }) {
  const tagSet = new Set(tags)
  const categoryPosts = posts.filter((post) =>
    (post.tags ?? []).some((tag) => tagSet.has(tag.toLowerCase())),
  )

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">The Daily Press · Category</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          The latest stories from our {title.toLowerCase()} desk.
        </p>
      </header>

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

      {!loading && !error && categoryPosts.length === 0 && (
        <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">No stories found in this category.</p>
      )}

      {!loading && !error && categoryPosts.length > 0 && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label={`${title} stories`}>
          {categoryPosts.map((post) => (
            <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key={post.id}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-600">
                {(post.tags ?? []).join(' · ')}
              </p>
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

export default CategoryStories
