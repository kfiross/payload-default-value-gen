# Generating default-value function Plugin

Generating default-value function (like uuid) plugin for Payload CMS.

# Documentation

Please refer to the [documentations](https://authsmith.com/docs/plugins/payload) for the installation and usages.

# Usage
Under `payload.config.ts`:

```ts
export default buildConfig({
  // ..other payload configs
  plugins: [
    // ..other plugins
    genDefaultValueForIdPlugin({
      // list of collection(s) to apply 
      collections: ['slug_name_1', 'slug_name_2'],
      // function to generate each time to
      defaultFunc: () => uuidv4()
    })
  ],
})
```
