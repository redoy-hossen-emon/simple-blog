import { Link, NavLink } from 'react-router-dom'
import { categories } from '../category/categoryData.js'

function TopBar() {
  const linkStyle = ({ isActive }) => (
    `py-4 text-sm font-semibold no-underline ${isActive ? 'text-red-600' : 'text-slate-600 hover:text-red-600'}`
  )

  return (
    <header className="bg-white text-slate-900 shadow-sm">
      <div className="flex min-h-9 items-center justify-between gap-3 bg-slate-900 px-5 text-[11px] text-slate-200 sm:px-10">
        <span><strong className="text-amber-400">THE DAILY BRIEF</strong> &nbsp; Your world, in focus.</span>
        <time>{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</time>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link className="flex items-center gap-3 no-underline" to="/">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-600 font-serif text-2xl font-bold text-white">N</span>
          <span>
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              THE DAILY <span className="text-red-600">PRESS</span>
            </span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Independent. Informed. Inspired.
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-400 sm:flex">
          <span aria-hidden="true" className="text-lg leading-none">⌕</span>
          <input
            aria-label="Search stories"
            className="w-36 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
            placeholder="Search stories..."
            readOnly
            type="search"
          />
        </div>
      </div>

      <nav className="border-t border-slate-100" aria-label="Main navigation">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-5 sm:gap-8 sm:px-8">
        
          <NavLink className={linkStyle} to="/">Home</NavLink>
          <NavLink className={linkStyle} end to="/">New</NavLink>
          <NavLink className={linkStyle} to="/popular">Popular</NavLink>

          <NavLink className={linkStyle} to="/blogs">Blogs</NavLink>
          <details
            className="group relative shrink-0"
            onMouseEnter={(event) => { event.currentTarget.open = true }}
            onMouseLeave={(event) => { event.currentTarget.open = false }}
          >
            <summary className="cursor-pointer list-none py-4 text-sm font-semibold text-slate-600 hover:text-red-600 [&::-webkit-details-marker]:hidden">
              Categories <span className="ml-1 text-xs">▾</span>
            </summary>
            <div className="absolute left-0 top-full z-20 min-w-56 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
              {categories.map((category) => (
                <Link
                  className="block px-4 py-2 text-sm text-slate-600 no-underline hover:bg-slate-50 hover:text-red-600"
                  key={category.slug}
                  to={`/category/${category.slug}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </details>
          <NavLink className={linkStyle} to="/about">About</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default TopBar
