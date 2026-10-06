import CategoryStories from './byCategoryPage.jsx'
import { categories } from './categoryData.js'

function TravelPage(props) {
  const category = categories.find((item) => item.slug === 'travel')
  return <CategoryStories {...props} title={category.name} tags={category.tags} />
}

export default TravelPage
