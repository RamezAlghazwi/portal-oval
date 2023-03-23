import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react'
import dynamic from 'next/dynamic'
import AssetList from '@shared/AssetList'
import queryString from 'query-string'
import Filters from './Filters'
import Sort from './sort'
import { getResults, updateQueryStringParameter } from './utils'
import { useUserPreferences } from '@context/UserPreferences'
import { useCancelToken } from '@hooks/useCancelToken'
import styles from './index.module.css'
import { useRouter } from 'next/router'

export default function SearchPage({
  setTotalResults,
  setTotalPagesNumber
}: {
  setTotalResults: (totalResults: number) => void
  setTotalPagesNumber: (totalPagesNumber: number) => void
}): ReactElement {
  const router = useRouter()
  const [parsed, setParsed] = useState<queryString.ParsedQuery<string>>()
  const { chainIds } = useUserPreferences()
  const [queryResult, setQueryResult] = useState<PagedAssets>()
  const [loading, setLoading] = useState<boolean>()
  const [serviceType, setServiceType] = useState<string>()
  const [accessType, setAccessType] = useState<string>()
  const [sortType, setSortType] = useState<string>()
  const [sortDirection, setSortDirection] = useState<string>()
  const newCancelToken = useCancelToken()
  const geoData2 = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [11.43226146697998, 48.77335941579284],
            [11.432476043701172, 48.77244021326843],
            [11.431403160095215, 48.77203010209762],
            [11.428892612457275, 48.769187515357935],
            [11.430180072784424, 48.76835309367359],
            [11.430845260620115, 48.767787376170105],
            [11.431446075439453, 48.76699536095809],
            [11.431703567504883, 48.76642962815863],
            [11.431746482849121, 48.76583560185989],
            [11.431660652160645, 48.76568002238241],
            [11.433227062225342, 48.76597703733026],
            [11.433613300323486, 48.765128418532996],
            [11.433699131011963, 48.76485968625767],
            [11.434192657470703, 48.76495869305272],
            [11.434385776519775, 48.764887973933305]
          ]
        }
      }
    ]
  }

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map/map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )

  useEffect(() => {
    const parsed = queryString.parse(location.search)
    const { sort, sortOrder, serviceType, accessType } = parsed
    setParsed(parsed)
    setServiceType(serviceType as string)
    setAccessType(accessType as string)
    setSortDirection(sortOrder as string)
    setSortType(sort as string)
  }, [router])

  const updatePage = useCallback(
    (page: number) => {
      const { pathname, query } = router
      const newUrl = updateQueryStringParameter(
        pathname +
          '?' +
          JSON.stringify(query)
            .replace(/"|{|}/g, '')
            .replace(/:/g, '=')
            .replace(/,/g, '&'),
        'page',
        `${page}`
      )
      return router.push(newUrl)
    },
    [router]
  )

  const fetchAssets = useCallback(
    async (parsed: queryString.ParsedQuery<string>, chainIds: number[]) => {
      setLoading(true)
      setTotalResults(undefined)
      const queryResult = await getResults(parsed, chainIds, newCancelToken())
      setQueryResult(queryResult)

      setTotalResults(queryResult?.totalResults || 0)
      setTotalPagesNumber(queryResult?.totalPages || 0)
      setLoading(false)
    },
    [newCancelToken, setTotalPagesNumber, setTotalResults]
  )
  useEffect(() => {
    if (!parsed || !queryResult) return
    const { page } = parsed
    if (queryResult.totalPages < Number(page)) updatePage(1)
  }, [parsed, queryResult, updatePage])

  useEffect(() => {
    if (!parsed || !chainIds) return
    fetchAssets(parsed, chainIds)
  }, [parsed, chainIds, newCancelToken, fetchAssets])

  return (
    <>
      <div className={styles.search}>
        <div className={styles.row}>
          <Filters
            serviceType={serviceType}
            accessType={accessType}
            setServiceType={setServiceType}
            setAccessType={setAccessType}
            addFiltersToUrl
          />
          <Sort
            sortType={sortType}
            sortDirection={sortDirection}
            setSortType={setSortType}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>
      <section className={styles.section}>
        <Map dataLayer={[geoData2]} />
      </section>
      <div className={styles.results}>
        <AssetList
          assets={queryResult?.results}
          showPagination
          isLoading={loading}
          page={queryResult?.page}
          totalPages={queryResult?.totalPages}
          onPageChange={updatePage}
          showAssetViewSelector
        />
      </div>
    </>
  )
}
