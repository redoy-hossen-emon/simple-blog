import CategoryStories from './byCategoryPage.jsx'
import { categories } from './categoryData.js'

function WorldPage(props) {
  const category = categories.find((item) => item.slug === 'world')
  return <CategoryStories {...props} title={category.name} tags={category.tags} />
}

export default WorldPage
