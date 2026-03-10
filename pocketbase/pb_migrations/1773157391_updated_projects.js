/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // remove field
  collection.fields.removeById("json174739582")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "select174739582",
    "maxSelect": 1,
    "name": "icons",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "astro",
      "css",
      "expo",
      "figma",
      "github",
      "html",
      "instagram",
      "javascript",
      "linkedin",
      "next",
      "node",
      "pocketbase",
      "preact",
      "react native",
      "react",
      "supabase",
      "typescript"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "json174739582",
    "maxSize": 0,
    "name": "icons",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("select174739582")

  return app.save(collection)
})
