/**
 * Generating default-value-function (like uuid) plugin function.
 *
 * @param {PluginOptions} pluginOptions
 * @returns {Plugin}
 */
export const genDefaultValueForIdPlugin = (pluginOptions) => (incomingConfig) => {
    // create copy of incoming config
    let config = { ...incomingConfig };
    if (!config.collections) {
        config.collections = [];
    }
    /**
     * If the plugin is disabled, do nothing
     * If your plugin heavily modifies the database schema, you may want to remove this property.
     */
    if (pluginOptions.disabled) {
        return config;
    }
    if (!pluginOptions.collections) {
        return config;
    }
    for (let collection of config.collections) {
        if (pluginOptions.collections.includes(collection.slug)) {
            collection.hooks = collection.hooks || {};
            collection.hooks.beforeValidate = [
                ...(collection.hooks.beforeValidate || []),
                ({ data }) => {
                    if (data && !data.id) {
                        return { ...data, id: pluginOptions.defaultFunc() };
                    }
                    return data;
                },
            ];
        }
    }
    return config;
};
