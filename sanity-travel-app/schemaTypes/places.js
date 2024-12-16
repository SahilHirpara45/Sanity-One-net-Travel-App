import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'places',
  title: 'Places',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Id',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'placeType',
      title: 'PlaceType',
      type: 'string',
    }),
    // defineField({
    //   name: 'subcategories',
    //   title: 'Subcategories',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{ type: 'subcategory' }],
    //     },
    //   ],
    // }),
    defineField({
      name: 'match',
      title: 'Match',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          { title: 'Spring', value: 'Spring' },
          { title: 'Summer', value: 'Summer' },
          { title: 'Autumn', value: 'Autumn' },
          { title: 'Winter', value: 'Winter' },
        ],
      },
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      options: {
        list: [
          { title: 'January', value: 'Jan' },
          { title: 'February', value: 'Feb' },
          { title: 'March', value: 'Mar' },
          { title: 'April', value: 'Apr' },
          { title: 'May', value: 'May' },
          { title: 'June', value: 'Jun' },
          { title: 'July', value: 'Jul' },
          { title: 'August', value: 'Aug' },
          { title: 'September', value: 'Sep' },
          { title: 'October', value: 'Oct' },
          { title: 'November', value: 'Nov' },
          { title: 'December', value: 'Dec' },
        ],
      },
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
        },
      ],
    }),
    defineField({
      name: 'travellers',
      title: 'Choose Your Travellers',
      type: 'string',
      options: {
        list: [
          { title: 'Solo', value: 'Solo' },
          { title: 'Couple', value: 'Couple' },
          { title: 'Family', value: 'Family' },
          { title: 'Friends', value: 'Friends' },
        ],
      },
    }),
  ],
})
