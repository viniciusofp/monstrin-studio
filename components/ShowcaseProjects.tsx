'use client'

import {resolveHref} from '@/sanity/lib/utils'
import Link from 'next/link'
import {OptimisticSortOrder} from './OptimisticSortOrder'
import {ProjectListItem} from './ProjectListItem'

export type ShowcaseProjectsProps = {data: any; showcaseProjects: any; dataAttribute: any}

export default function ShowcaseProjects({
  showcaseProjects,
  data,
  dataAttribute,
}: ShowcaseProjectsProps) {
  return (
    <div className="mx-auto max-w-[100rem] rounded-md border">
      <OptimisticSortOrder id={data?._id} path={'showcaseProjects'}>
        {showcaseProjects &&
          showcaseProjects.length > 0 &&
          showcaseProjects.map((project) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                className="flex flex-col gap-x-5 p-2 transition odd:border-b odd:border-t hover:bg-gray-50/50 xl:flex-row odd:xl:flex-row-reverse"
                key={project._key}
                href={href}
                data-sanity={dataAttribute?.(['showcaseProjects', {_key: project._key}])}
              >
                <ProjectListItem project={project as any} />
              </Link>
            )
          })}
      </OptimisticSortOrder>
    </div>
  )
}
