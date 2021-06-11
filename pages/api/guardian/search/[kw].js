import axios from 'axios'
import { process_guardian_results } from '..'

// search Guardian articles by keyword
const search_guardian_results = async query => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/search?q=${query}` +
        `&api-key=8f86228c-9df5-451e-a505-f7979e6ec8a3` +
        `&show-blocks=all&page-size=20`
    )
    console.log(`Searching Guardian article by ${query} - ${response.status}`)
    return response.data?.response?.results
  } catch (error) {
    console.log(error)
  }
}

export default async ({ query: { kw } }, res) => {
  const results = await search_guardian_results(kw)
  res.status(200).json(process_guardian_results(results))
}
