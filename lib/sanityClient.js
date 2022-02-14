import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '5ukcvu29',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skVpeqdvUbHPJm8FidYajclsIbKqvbiKD1rxKHH3u6IVbshMqvlutovMUhkp9lbPifYPGNEzx7NPjcKvGBkShjBUlrKR6AgURqNhpnzxWfFFbls5VZZL6P8GXhXBy4HE4RACd3ruwwfz33q7Wk2OSHwTPUBPuRtD9FtCWHKaEMXrFkVFvi7d',
  useCdn: false,
})