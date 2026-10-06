import CategoryStories from './byCategoryPage.jsx'
import { categories } from './categoryData.js'

function CulturePage(props) {
  const category = categories.find((item) => item.slug === 'culture')
  return <CategoryStories {...props} title={category.name} tags={category.tags} />
}

export default CulturePage
