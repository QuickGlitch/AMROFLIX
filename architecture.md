# Amroflix Arhcitecture

## Stack

Amroflix is a SPA powered by Vue (3) using the composition API. Vue is the framework used within ABN-AMRO, but is also a suitable framework for this use case due to:

- no major benefits to implementing SSR:
  - SEO isn't relevant for such apps (usually behind a login and serving personalized content)
  - Initial response / speed: The bottleneck will probably be in fetching the show content, so this isn't changing the UX much
  - no immediate benefit to hosting a Node application / server, just additional infrastructure overhead and cost.
- content is dynamic so SSG is not suitable

The Vue 3 setup comes with several DX features we leverage here: vite, typescript, vitest and playwright.

#### Data

The data for this application comes from a single source: the (REST) api of https://www.tvmaze.com/. Since we are only loading data from this source and it is not coupled to the user, we can make the client application stateless. (In practice this assumption would not hold as users would nee to be tracked for personalized content, preferences etc.)

## State Management

For the simple use case we have, we can implement a stateless application that relies on data entirely from a seperate backend. Since the scope of the project is small, we do not need a store library - although we should be careful about excesivelly fetching data.

### Limitations of API

The target API is rate limited and can send reasonably sized payloads (show index, for example is ~109kb. Not great, not terrible). Thus we should avoid repeatedly querying the API for data that is unlikely to change. As noted by the API documentation `As opposed to the other endpoints, results from the show index are cached for up to 24 hours.`

Which means we might as well cache that data on the client because it will not go stale quickly.

## State Management & Data Strategy

Given the API setup and needs, I have opted to use Tanstack / Vue Query to manage our data fetching and propogating it to the relevant front end components. Each API endpoint has its own Query function, shared as a (vue) composable. Components can simply import and use these composables to handle their data fetching.

This approach enables the usage of the same Query wherever the need arises in the application. Thus, if we need to modify the logic or add middleware, we only need to do so in the query definition. This is shown by [useShowsInfinite](src/composables/TVMaze/useShowsInfiniteQuery.ts) and its usage in both the search page and home page. This pattern comes with another major advantage - tanstack queries locally cache the results.

This means that instead of querying the API each time, the Queries can leverage the locale cache. This is very useful for the show carousels, where the first page already containts 250 shows. Instead of re-fetching these shows over and over, tanstack query caches this data increasing performance and decreasing the load on the API server.

Lastly, Vue Query provides convenient fetching states like loading, error etc. The application uses these states to indicate to the user the state of the application (mostly the loading cog when data is being fetched.)

### Infinite carousel

The Query approach is demonstrated in the Home Page for the carousel data.

````typescript
// src/pages/AmroflixHome.vue
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useShowsInfinite()

const shows = computed(() => data.value?.pages.flat() || [])```
````

In this instance we use the infinite query, enabling us to have an infinite carousel (swipe for days..). Whenever the carousel reaches the end of its current shows, it will emit an event which triggers the Query to fetch more data. During the fetch we can leverage `isLoading` to indicate the status to the user.

<b>This is great, but what about genres and sorting by rating?</b>

Glad you asked! Because Vue Query leverages the reactive patterns of vue, we can simply add a query that takes the (reactive) data returned by useShowsInfinite() and split it into a Map with some JS looping.

> A potential improvement would be to serially couple the `useShowsByGenre` to `useShowsInfinite` so it is automatically updated under the hood.

## Design System

This project demonstrates a design-system based UX with a [conventional 3 tiered token system](https://design.dev/guides/design-systems/#introduction).

You can see these being setup by the [root styles file](src/styles.css) with core tokens and theme tokens, which are consumed by component tokens in turn.

I added two themes for a light and dark mode. Light mode doesn't look great - I will admit.. but a proper design takes a lot of time so here it is more of a demonstrator/bonus!

### Styling

The components I use are all styled with scoped SCSS. Most are written in the project and not off the shelf (carousel and dialog being the exceptions, because its important to pick your battles!) but even these are headless implementations with styles added on top.

Theming is provided as a [composable](src/composables/useTheme.ts), following a singleton pattern that uses a Vue provider to let child components access the theme (and change it).

### Responsive / Breakpoints

Responsive design of this application leverages breakpoints with [SCSS mixins](src/styles/_breakpoints.scss). Why SCSS here? CSS tokens do not support breakpoints, so we cannot leverage the styles.css to provide such a utility (without reaching for something like PostCSS anyhow).

## Composition

For all of the components implemented in this project, they employ composition and extensibility. This means its easier to assemble a coherent collection of components (a la atomic design, atoms -> organisms etc,) but also leave freedom for using "escape hatches" where necessary.

### Composition example

The [AmroflixButton](src/components/essentials/AmroflixButton.vue) gives a clear example of composition.

```typescript
// AmroflixButton.vue
  <component :is="as" :class="['amroflix-button', `amroflix-button--${variant}`]">
    <slot name="leadingIcon">
      <AmroflixTypography
        v-if="leadingIcon"
        :weight="'bold'"
        :size="'large'"
        class="amroflix-button__content"
      >
        <AmroflixIcon :name="leadingIcon" />
      </AmroflixTypography>
    </slot>
    <slot name="content">
      <AmroflixTypography v-if="$slots.default" :weight="'bold'" :size="'large'">
        <slot></slot>
      </AmroflixTypography>
    </slot>
    <slot name="trailingIcon">
      <AmroflixTypography
        v-if="trailingIcon"
        :weight="'bold'"
        :size="'large'"
        class="amroflix-button__content"
      >
        <AmroflixIcon :name="trailingIcon" />
      </AmroflixTypography>
    </slot>
  </component>
```

Here we use the Icon and Typography components to construct the final Button component.

### Extensibility example

The [AmroflixButton](src/components/essentials/AmroflixButton.vue) also shows extinsibility by utilizing `<slot>` and `<component :is>`.

These two mechanisms allow us to change the button as needed by wrapping components and templates. For example in the sidebar navigation:

```typescript
    <AmroflixButton
      as="a"
      class="amroflix-sidebar-item__button"
      variant="plain"
      :leading-icon="icon"
    >
```

The button becomes a semantic anchor (link). If you want to be fancy you can call this <i>polymorphism</i> 🎩.

#### Variants

The button also demonstrates using variants, controlled via props, to enable the same component to take multiple implementations. In this case we use the `plain` variant across the project where we wish to drop the button styling (like in the searchbar or navigation).

## Semantics and A11y

I have included some semantic and a11y considerations, within reason of the time constraint.

- the navbar is a semantic <nav> tag that casts its <button> children to semantic <a> components.
- A11Y: tab-indexing is applied so that keyboard users enter the page by interacting with the navigation (and not the header). Similarly they are redirect to the first carousel after the navbar items. I started with some a11y with the carousel leveraging its of the shelf plugin, but its not up to snuff. For example, I tested it with VoiceOver and the <aria-live> is not meanigfully announcing the content as the carousel is traversed. So this would be a major point of improvement in a production grade app.
