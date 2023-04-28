import React, { ReactElement, useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Button from '@shared/atoms/Button'
import { generateBaseQuery, getFilterTerm } from '@utils/aquarius'
import { useUserPreferences } from '@context/UserPreferences'
import { SortTermOptions } from '../../@types/aquarius/SearchQuery'
import SectionQueryResult from './SectionQueryResult'
import styles from './index.module.css'
import { useAddressConfig } from '@hooks/useAddressConfig'
import TopSales from './TopSales'
import TopTags from './TopTags'
import HomeContent from './Content'
import { Marker } from 'leaflet'
import AssetActions from '@components/Asset/AssetActions'
import AssetContent from '@components/Asset/AssetContent'
import gjsonfFile from '../Map/map.json'
import { stringify } from 'querystring'

interface FeaturedSection {
  title: string
  query: SearchQuery
}

function AllAssetsButton(): ReactElement {
  return (
    <Button
      className={styles.allAssetsButton}
      style="text"
      to="/search?sort=nft.created&sortOrder=desc"
      arrow
    >
      All datasets and algorithms
    </Button>
  )
}

export default function HomePage(): ReactElement {
  const { chainIds } = useUserPreferences()
  const { featured, hasFeaturedAssets } = useAddressConfig()
  const asset = [
    'did:op:f62ff55f4c056af42b1e8a9e69563b480e8d9d1d20016ebd7c9853e3531c5d94'
  ]
  const [queryFeatured, setQueryFeatured] = useState<FeaturedSection[]>([])
  const [queryRecent, setQueryRecent] = useState<SearchQuery>()
  const [queryMostSales, setQueryMostSales] = useState<SearchQuery>()
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

  // const obj = JSON.parse(JSON.stringify(gjsonfFile))
  // console.log('obj', obj)

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map/map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )
  useEffect(() => {
    const baseParams = {
      chainIds,
      esPaginationOptions: {
        size: 6
      },
      sortOptions: {
        sortBy: SortTermOptions.Created
      } as SortOptions
    } as BaseQueryParams

    const baseParamsSales = {
      chainIds,
      esPaginationOptions: {
        size: 6
      },
      sortOptions: {
        sortBy: SortTermOptions.Orders
      } as SortOptions
    } as BaseQueryParams

    setQueryRecent(generateBaseQuery(baseParams))
    setQueryMostSales(generateBaseQuery(baseParamsSales))

    if (hasFeaturedAssets()) {
      const featuredSections = featured.map((section) => ({
        title: section.title,
        query: generateBaseQuery({
          ...baseParams,
          esPaginationOptions: {
            size: section.assets.length
          },
          filters: [getFilterTerm('_id', section.assets)]
        })
      }))

      setQueryFeatured(featuredSections)
    }
  }, [chainIds, featured, hasFeaturedAssets])

  return (
    <>
      <section className={styles.section}>
        {/* <h3>Bookmarks</h3>
        <Bookmarks /> */}
        <Map dataLayer={[geoData2]} datasetwithgeojson={asset} />
      </section>
      {hasFeaturedAssets() && (
        <>
          {queryFeatured.map((section, i) => (
            <SectionQueryResult
              key={`${section.title}-${i}`}
              title={section.title}
              query={section.query}
            />
          ))}
          <AllAssetsButton />
        </>
      )}
      <SectionQueryResult
        title="Recently Published"
        query={queryRecent}
        action={<AllAssetsButton />}
      />
      <TopTags title="Top Tags" />
      <HomeContent />
    </>
  )
}
