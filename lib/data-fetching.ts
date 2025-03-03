import { DataManager } from "./data-manager"
import type { GetStaticProps, GetStaticPaths } from "next"
import type { PubData, Region } from "@/types/data"

export const getRegionPaths: GetStaticPaths = async () => {
  const dataManager = await DataManager.getInstance()
  const regions = await dataManager.getRegions()

  return {
    paths: regions.map((region) => ({
      params: { region: region.slug },
    })),
    fallback: false,
  }
}

export const getCountyPaths: GetStaticPaths = async () => {
  const dataManager = await DataManager.getInstance()
  const regions = await dataManager.getRegions()
  const paths = []

  for (const region of regions) {
    const counties = await dataManager.getCountiesByRegion(region.slug)
    paths.push(
      ...counties.map((county) => ({
        params: { region: region.slug, county: county.slug },
      })),
    )
  }

  return {
    paths,
    fallback: false,
  }
}

export const getPubPaths: GetStaticPaths = async () => {
  const dataManager = await DataManager.getInstance()
  const regions = await dataManager.getRegions()
  const paths = []

  for (const region of regions) {
    const pubs = await dataManager.searchPubs("", { region: region.slug })
    paths.push(
      ...pubs.map((pub) => ({
        params: {
          region: region.slug,
          county: pub.county,
          pub: pub.slug,
        },
      })),
    )
  }

  return {
    paths,
    fallback: "blocking",
  }
}

interface RegionPageProps {
  region: Region
  pubs: PubData[]
}

export const getRegionProps: GetStaticProps<RegionPageProps> = async ({ params }) => {
  const dataManager = await DataManager.getInstance()
  const regions = await dataManager.getRegions()
  const region = regions.find((r) => r.slug === params?.region)

  if (!region) {
    return { notFound: true }
  }

  const pubs = await dataManager.searchPubs("", { region: region.slug })

  return {
    props: {
      region,
      pubs,
    },
    revalidate: 3600, // Revalidate every hour
  }
}

