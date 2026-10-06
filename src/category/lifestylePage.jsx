import CategoryStories from './byCategoryPage.jsx'
import { categories } from './categoryData.js'

function LifestylePage(props) {
  const category = categories.find((item) => item.slug === 'lifestyle')
  return <CategoryStories {...props} title={category.name} tags={category.tags} />
}

export default LifestylePage
