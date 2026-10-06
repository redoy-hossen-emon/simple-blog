import CategoryStories from './byCategoryPage.jsx'
import { categories } from './categoryData.js'

function TechnologyPage(props) {
  const category = categories.find((item) => item.slug === 'technology')
  return <CategoryStories {...props} title={category.name} tags={category.tags} />
}

export default TechnologyPage
