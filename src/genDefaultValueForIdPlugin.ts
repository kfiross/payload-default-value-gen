import type {Config} from 'payload'


type PluginOptions = {
  /**
   * List of collections to generate for them default value for the id field
   */
  collections: string[]
  defaultFunc: () => any
  disabled?: boolean
}

/**
 * Generating default-value-function (like uuid) plugin function.
 *
 * @param {PluginOptions} pluginOptions
 * @returns {Plugin}
 */
export const genDefaultValueForIdPlugin =
  (pluginOptions: PluginOptions) =>
    (incomingConfig: Config): Config => {
      // create copy of incoming config
      let config = {...incomingConfig}
      if (!config.collections) {
        config.collections = []
      }

      /**
       * If the plugin is disabled, do nothing
       * If your plugin heavily modifies the database schema, you may want to remove this property.
       */
      if (pluginOptions.disabled) {
        return config
      }

      if(!pluginOptions.collections){
        return config;
      }

      for (let collection of config.collections) {
        if (pluginOptions.collections.includes(collection.slug)) {
          collection.hooks = collection.hooks || {}

          collection.hooks.beforeValidate = [
            ...((collection.hooks.beforeValidate as any[]) || []),
            ({data}) => {
              if (data && !data.id) {
                return {...data, id: pluginOptions.defaultFunc()}
              }
              return data
            },
          ]
        }
      }

      return config
    }
