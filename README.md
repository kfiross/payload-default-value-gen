# Generating default-value function Plugin

Plugin for Payload CMS, which enables generating custom default-value function (like uuid) for colletions

# Usage

Under `payload.config.ts`:

```ts
export default buildConfig({
  // ..other payload configs
  plugins: [
    // ..other plugins
    genDefaultValueForIdPlugin({
      // collections is map colletion by CollectionSlug as keys, each one has it own defaultFunc
      collections: {
        municipalities: {
          // If collection's Id is numeric, you can use this as autoIncrement after new row created
          // especially good if you defined pgAdapter with `idType: uuid`
          defaultFunc: autoIncrementFunc,
        },
        items: {
          // You can use your custom generator, for exapmle
          defaultFunc: () => uuidv7(),
        }
    })
  ],
})
```
