import CategoryStories from './byCategoryPage.jsx'
import { categories } from './categoryData.js'

function BusinessPage(props) {
  const category = categories.find((item) => item.slug === 'business')
  return <CategoryStories {...props} title={category.name} tags={category.tags} />
}

export default BusinessPage
