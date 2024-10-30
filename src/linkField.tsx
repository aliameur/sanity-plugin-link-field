import {definePlugin, defineType} from 'sanity'

import {buildLinkType} from './link-type'
import type {LinkFieldPluginOptions} from './types'

/**
 * A plugin that adds a custom Link field for creating internal and external links,
 * as well as `mailto` and `tel`-links, all using the same intuitive UI.
 *
 * @param options - Options for the plugin. See {@link LinkFieldPluginOptions}
 *
 * @example Minimal example
 * ```ts
 * // sanity.config.ts
 * import { defineConfig } from 'sanity'
 * import { linkField } from 'sanity-plugin-link-field'
 *
 * export default defineConfig((
 *  // ...
 *  plugins: [
 *    linkField()
 *  ]
 * })
 *
 * // mySchema.ts
 * import { defineField, defineType } from 'sanity';
 *
 * export const mySchema = defineType({
 *  // ...
 *  fields: [
 *    // ...
 *    defineField({
 *      name: 'link',
 *      title: 'Link',
 *      type: 'link'
 *    }),
 *  ]
 *});
 * ```
 */
export const linkField = definePlugin<LinkFieldPluginOptions | void>((opts) => {
  const {
    linkableSchemaTypes = ['page'],
    weakReferences = false,
    referenceFilterOptions,
    descriptions = {
      internal: 'Link to another page or document on the website.',
      external: 'Link to an absolute URL to a page on another website.',
      email: 'Link to send an e-mail to the given address.',
      phone: 'Link to call the given phone number.',
      advanced: 'Optional. Add anchor links and custom parameters.',
      parameters: 'Optional. Add custom parameters to the URL, such as UTM tags.',
      anchor: 'Optional. Add an anchor to link to a specific section on the page.',
    },
    enableLinkParameters = true,
    enableAnchorLinks = true,
    customLinkTypes = [],
  } = opts || {}

  const linkType = buildLinkType({
    linkableSchemaTypes,
    customLinkTypes,
    enableAnchorLinks,
    enableLinkParameters,
    descriptions,
    weakReferences,
    referenceFilterOptions,
  })

  return {
    name: 'link-field',
    schema: {
      types: [defineType(linkType)],
    },
  }
})
