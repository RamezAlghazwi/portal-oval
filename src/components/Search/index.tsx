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
import { FeatureCollection } from 'geojson'
import { es, id } from 'date-fns/locale'
import { asset } from '.jest/__fixtures__/datasetWithAccessDetails'

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
  const [geojsonField, setGeojsonField] = useState<FeatureCollection[]>()
  const [datasetdid, setDatasetdid] = useState<FeatureCollection[]>()
  const [datasetwithgeojson, setdatasetwithgeojson] =
    useState<FeatureCollection[]>()
  const [loading, setLoading] = useState<boolean>()
  const [serviceType, setServiceType] = useState<string>()
  const [accessType, setAccessType] = useState<string>()
  const [sortType, setSortType] = useState<string>()
  const [sortDirection, setSortDirection] = useState<string>()
  const newCancelToken = useCancelToken()

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
      setGeojsonField(undefined)
      const queryResult = await getResults(parsed, chainIds, newCancelToken())
      setQueryResult(queryResult)
      setTotalResults(queryResult?.totalResults || 0)
      setTotalPagesNumber(queryResult?.totalPages || 0)
      console.log('queryResult', queryResult)
      // if queryResult is not undefined, get the metadata field from the queryResult
      if (queryResult === undefined) {
        console.log('queryResult is undefined')
      } else {
        console.log('queryResult is not undefined')
        // get all metadata elements from the queryResult
        const metadata = queryResult?.results?.map((asset) => asset.metadata)
        // get data did of all datasets
        const datasetdid = queryResult?.results?.map((asset) => asset.id)
        console.log('datasetsdid', datasetdid)
        setDatasetdid(datasetdid)
        // Filter those metadata elements that have a geojson field
        console.log('metadata', metadata)
        const geojson = metadata.filter(
          (assetMetadata) => assetMetadata?.additionalInformation?.geojson
        )
        // find did only for dataset having geojson field
        const datasetwithgeojson = []
        for (let i = 1; i < queryResult.results.length; i++) {
          if (
            queryResult.results[i].metadata.additionalInformation.geojson !==
              '' &&
            queryResult.results[i].metadata.additionalInformation.geojson !==
              undefined
          ) {
            datasetwithgeojson.push(queryResult.results[i].id)
            console.log('datasetwithgeojson', datasetwithgeojson)
          } else {
            console.log('geojson not defined')
          }
        }
        console.log('datasetwithgeojson1', datasetwithgeojson)
        setdatasetwithgeojson(datasetwithgeojson)
        // Get the geojson field from the filtered metadata elements
        console.log('geojson', geojson)
        const geojsonField = geojson.map((filteredAsset) =>
          JSON.parse(filteredAsset.additionalInformation.geojson)
        )
        console.log('geojsonField', geojsonField)
        setGeojsonField(geojsonField)
      }
      setLoading(false)
    },
    [newCancelToken, setTotalPagesNumber, setTotalResults, setGeojsonField]
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
      {geojsonField && (
        <section className={styles.section}>
          <Map
            dataLayer={geojsonField}
            datasetwithgeojson={datasetwithgeojson}
          />
        </section>
      )}
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
