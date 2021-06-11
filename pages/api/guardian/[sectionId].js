import axios from 'axios'
import { process_guardian_results } from '.'

// get Guardian articles by section
const get_guardian_section = async section => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/${section}` +
        `?api-key=8f86228c-9df5-451e-a505-f7979e6ec8a3` +
        `&show-blocks=all&page-size=20`
    )
    console.log(`Getting Guardian section \'${section}\' - ${response.status}`)
    return response.data?.response?.results
  } catch (error) {
    console.log(error)
  }
}

export default async ({ query: { sectionId } }, res) => {
  const sections = ['world', 'politics', 'business', 'technology', 'sport']
  sectionId = sectionId === 'sports' ? 'sport' : sectionId
  // validate the sectionId passed in
  if (!sections.includes(sectionId)) {
    res.status(400).json({ message: 'Unknown section ID.' })
    return
  }
  const results = await get_guardian_section(sectionId)
  res.status(200).json(process_guardian_results(results))
}
