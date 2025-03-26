import type { Config } from 'payload';
type PluginOptions = {
    /**
     * List of collections to generate for them default value for the id field
     */
    collections: string[];
    defaultFunc: () => any;
    disabled?: boolean;
};
/**
 * Generating default-value-function (like uuid) plugin function.
 *
 * @param {PluginOptions} pluginOptions
 * @returns {Plugin}
 */
export declare const genDefaultValueForIdPlugin: (pluginOptions: PluginOptions) => (incomingConfig: Config) => Config;
export {};
