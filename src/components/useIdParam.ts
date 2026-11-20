import { useParams } from 'react-router'

/** The :id of a detail page as a number; 0 (which never exists) when it is not a valid id. */
export function useIdParam(): number {
  const { id } = useParams()
  const number = Number(id)
  return Number.isInteger(number) && number > 0 ? number : 0
}
