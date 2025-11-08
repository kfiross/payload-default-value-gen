import type { Config, CollectionSlug } from 'payload'

/**
 * Generic auto-increment helper
 */
export const autoIncrementFunc = async <T extends string = 'id'>(
  req: any,
  slug: string,
  field: T = 'id' as T,
): Promise<number> => {
  const latest = await req.payload.find({
    collection: slug,
    sort: `-${field}`,
    limit: 1,
  })

  const value = latest?.docs?.[0]?.[field]

  if (value == null) return 1

  const numericValue = Number(value)
  if (Number.isNaN(numericValue)) {
    throw new Error(
      `autoIncrementFunc: Field "${field}" in collection "${slug}" is not numeric (got: ${JSON.stringify(
        value,
      )})`,
    )
  }

  return numericValue + 1
}

type DefaultFunc = (
  req: any,
  slug: string,
  field?: string,
) => Promise<number | string> | number | string

type PluginOptions = {
  collections: {
    [key in CollectionSlug]?: {
      defaultFunc: DefaultFunc
    }
  }
  disabled?: boolean
}

/**
 * Generating default-value-function (like uuid) plugin function.
 */
export const genDefaultValueForIdPlugin =
  (pluginOptions: PluginOptions) =>
  (config: any): any => {
    if (!config.collections) config.collections = []
    if (pluginOptions.disabled) return config
    if (!pluginOptions.collections) return config

    for (const collection of config.collections) {
      const collectionOptions = pluginOptions.collections[collection.slug as CollectionSlug]
      if (!collectionOptions) continue

      collection.hooks = collection.hooks || {}

      // Normalize existing beforeValidate hooks to an array
      const existing = collection.hooks.beforeValidate
      const normalized: any[] = existing
        ? Array.isArray(existing)
          ? [...existing]
          : [existing]
        : []

      normalized.push(async ({ data, req, operation }: any) => {
        if (operation !== 'create') return data
        if (data?.id) return data

        // Generate next ID (defaultFunc may be sync or async)
        const nextId = await collectionOptions.defaultFunc(req, collection.slug)

        return { ...data, id: nextId }
      })

      collection.hooks.beforeValidate = normalized
    }

    return config
  }
