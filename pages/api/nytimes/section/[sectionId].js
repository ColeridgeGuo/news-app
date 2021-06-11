import axios from 'axios'
import { process_nytimes_results } from '..'

// get NYTimes articles by section
const get_nytimes_section = async section => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?` +
        `api-key=1HzpS5vMG5GY8t5nTyN0Gj2SssDJ71Ye`
    )
    console.log(`Getting NYTimes section \'${section}\' - ${response.status}`)
    return response.data.results.slice(0, 10)
  } catch (error) {
    console.log(error)
  }
}

export default async (req, res) => {
  const sections = ['world', 'politics', 'business', 'technology', 'sports']
  const sectionId = req.query.sectionId
  if (!sections.includes(sectionId)) {
    res.status(400).json({ message: `Unknown section ID: ${sectionId}` })
    return
  }
  const results = await get_nytimes_section(sectionId)
  res.status(200).json(process_nytimes_results(results))
}
