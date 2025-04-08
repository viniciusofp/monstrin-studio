import {Header} from '@/components/Header'
import {OptimisticSortOrder} from '@/components/OptimisticSortOrder'
import {ProjectListItem} from '@/components/ProjectListItem'
import type {HomePageQueryResult} from '@/sanity.types'
import {studioUrl} from '@/sanity/lib/api'
import {resolveHref, urlForImage} from '@/sanity/lib/utils'
import {createDataAttribute} from 'next-sanity'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import VideoHero from './home-page/VideoHero'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export async function HomePage({data}: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {overview = [], showcaseProjects = [], title = ''} = data ?? {}

  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  console.log(data)
  const videos = data?.showcaseProjects?.map((project) => {
    const imageUrl =
      project.coverImage &&
      urlForImage(project.coverImage as any)
        ?.height(405)
        .width(720)
        .url()

    return {
      _id: project._id,
      title: project.title,
      coverImage: imageUrl,
      video: project.videos![0].videoUrl,
    }
  })
  return (
    <div>
      <VideoHero videos={videos} />
    </div>
  )
}
