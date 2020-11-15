import usePaginationData from "../queries/usePaginationData"

export const usePaginate = () => {
  const pages = usePaginationData()

  const hasNextPage = (currentPage, currentGroup) => {
    const currentGroupInt = parseInt(currentGroup)
    const nextGroup = currentGroupInt - 1

    const maxLength = 4

    const currentPageArray = currentPage.split("/")

    // Remove current group if exists
    if (currentPageArray.length > maxLength) {
      currentPageArray.pop()
      currentPage = currentPageArray.join("/")
    }
    const nextPage = `${currentPage}/${nextGroup.toString()}`
    const doesPageExist = pages.filter(page => page.node.path === nextPage)

    if (doesPageExist.length > 0) {
      return true
    } else return false
  }

  const paginate = (currentPage, currentGroup) => {
    const currentGroupInt = parseInt(currentGroup)
    const nextGroup = currentGroupInt - 1

    const maxLength = 4
    const currentPageArray = currentPage.split("/")

    // Remove current group if exists
    if (currentPageArray.length > maxLength) {
      currentPageArray.pop()
      currentPage = currentPageArray.join("/")
    }
    const nextPage = `${currentPage}/${nextGroup.toString()}`
    const doesPageExist = pages.filter(page => page.node.path === nextPage)

    if (doesPageExist.length > 0) {
      return nextPage
    } else return false
  }
  return { paginate, hasNextPage }
}
