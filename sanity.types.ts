// Query TypeMap
import '@sanity/client'

/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Timeline = {
  _type: 'timeline'
  items?: Array<{
    title?: string
    milestones?: Array<
      {
        _key: string
      } & Milestone
    >
    _type: 'item'
    _key: string
  }>
}

export type Milestone = {
  _type: 'milestone'
  title?: string
  description?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  tags?: Array<string>
  duration?: Duration
}

export type Project = {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: null
    level?: number
    _type: 'block'
    _key: string
  }>
  coverImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  duration?: Duration
  client?: string
  site?: string
  tags?: Array<string>
  description?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | ({
        _key: string
      } & Timeline)
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        caption?: string
        alt?: string
        _type: 'image'
        _key: string
      }
  >
}

export type Page = {
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: null
    level?: number
    _type: 'block'
    _key: string
  }>
  body?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | ({
        _key: string
      } & Timeline)
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        caption?: string
        alt?: string
        _type: 'image'
        _key: string
      }
  >
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type Duration = {
  _type: 'duration'
  start?: string
  end?: string
}

export type Settings = {
  _id: string
  _type: 'settings'
  _createdAt: string
  _updatedAt: string
  _rev: string
  menuItems?: Array<
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'home'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'page'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'project'
      }
  >
  footer?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
  ogImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Home = {
  _id: string
  _type: 'home'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  overview?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
  showcaseProjects?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'project'
  }>
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Timeline
  | Milestone
  | Project
  | Page
  | Slug
  | Duration
  | Settings
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Home
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./sanity/lib/queries.ts
// Variable: homePageQuery
// Query: *[_type == "home"][0]{    _id,    _type,    overview,    showcaseProjects[]{      _key,      ...@->{        _id,        _type,        coverImage,        overview,        "slug": slug.current,        tags,        title,      }    },    title,  }
export type HomePageQueryResult = {
  _id: string
  _type: 'home'
  overview: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }> | null
  showcaseProjects: Array<{
    _key: string
    _id: string
    _type: 'project'
    coverImage: {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      media?: unknown
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
    } | null
    overview: Array<{
      children?: Array<{
        marks?: Array<string>
        text?: string
        _type: 'span'
        _key: string
      }>
      style?: 'normal'
      listItem?: never
      markDefs?: null
      level?: number
      _type: 'block'
      _key: string
    }> | null
    slug: string | null
    tags: Array<string> | null
    title: string | null
  }> | null
  title: string | null
} | null
// Variable: pagesBySlugQuery
// Query: *[_type == "page" && slug.current == $slug][0] {    _id,    _type,    body,    overview,    title,    "slug": slug.current,  }
export type PagesBySlugQueryResult = {
  _id: string
  _type: 'page'
  body: Array<
    | ({
        _key: string
      } & Timeline)
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        caption?: string
        alt?: string
        _type: 'image'
        _key: string
      }
  > | null
  overview: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: null
    level?: number
    _type: 'block'
    _key: string
  }> | null
  title: string | null
  slug: string | null
} | null
// Variable: projectBySlugQuery
// Query: *[_type == "project" && slug.current == $slug][0] {    _id,    _type,    client,    coverImage,    description,    duration,    overview,    site,    "slug": slug.current,    tags,    title,  }
export type ProjectBySlugQueryResult = {
  _id: string
  _type: 'project'
  client: string | null
  coverImage: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  } | null
  description: Array<
    | ({
        _key: string
      } & Timeline)
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        caption?: string
        alt?: string
        _type: 'image'
        _key: string
      }
  > | null
  duration: Duration | null
  overview: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: null
    level?: number
    _type: 'block'
    _key: string
  }> | null
  site: string | null
  slug: string | null
  tags: Array<string> | null
  title: string | null
} | null
// Variable: settingsQuery
// Query: *[_type == "settings"][0]{    _id,    _type,    footer,    menuItems[]{      _key,      ...@->{        _type,        "slug": slug.current,        title      }    },    ogImage,  }
export type SettingsQueryResult = {
  _id: string
  _type: 'settings'
  footer: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }> | null
  menuItems: Array<
    | {
        _key: null
        _type: 'home'
        slug: null
        title: string | null
      }
    | {
        _key: null
        _type: 'page'
        slug: string | null
        title: string | null
      }
    | {
        _key: null
        _type: 'project'
        slug: string | null
        title: string | null
      }
  > | null
  ogImage: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  } | null
} | null
// Variable: slugsByTypeQuery
// Query: *[_type == $type && defined(slug.current)]{"slug": slug.current}
export type SlugsByTypeQueryResult = Array<{
  slug: string | null
}>

declare module '@sanity/client' {
  interface SanityQueries {
    '\n  *[_type == "home"][0]{\n    _id,\n    _type,\n    overview,\n    showcaseProjects[]{\n      _key,\n      ...@->{\n        _id,\n        _type,\n        coverImage,\n        overview,\n        "slug": slug.current,\n        tags,\n        title,\n      }\n    },\n    title,\n  }\n': HomePageQueryResult
    '\n  *[_type == "page" && slug.current == $slug][0] {\n    _id,\n    _type,\n    body,\n    overview,\n    title,\n    "slug": slug.current,\n  }\n': PagesBySlugQueryResult
    '\n  *[_type == "project" && slug.current == $slug][0] {\n    _id,\n    _type,\n    client,\n    coverImage,\n    description,\n    duration,\n    overview,\n    site,\n    "slug": slug.current,\n    tags,\n    title,\n  }\n': ProjectBySlugQueryResult
    '\n  *[_type == "settings"][0]{\n    _id,\n    _type,\n    footer,\n    menuItems[]{\n      _key,\n      ...@->{\n        _type,\n        "slug": slug.current,\n        title\n      }\n    },\n    ogImage,\n  }\n': SettingsQueryResult
    '\n  *[_type == $type && defined(slug.current)]{"slug": slug.current}\n': SlugsByTypeQueryResult
  }
}
