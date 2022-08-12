export default {
    name: 'featured',
    title: 'Featured menu categories',
    type: 'document',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Featured categories name',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'short_description',
        type: 'string',
        title: 'Short description ',
        validation: (Rule) => Rule.required(200),
      },
      {
        name: 'restaurant',
        type: 'array',
        title: 'Restaurant',
        of: [{type: "reference", to:[{type:"restaurant"}] }],
      },
    ]
}