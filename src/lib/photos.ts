/** Couple photos served from /public */
export const photos = {
  pavilion: "/couple-pavilion.jpg",
  selfie: "/couple-selfie.jpg",
  flowerField: "/couple-flower-field.jpg",
  handKiss: "/couple-hand-kiss.jpg",
  sunflowers: "/couple-sunflowers.jpg",
  lanterns: "/couple-lanterns.jpg",
  courtyard: "/couple-courtyard.jpg",
  /** Featured gallery picks reused in page sections */
  countdownLead: "/gallery/moment-06.jpg",
  rsvpLead: "/gallery/moment-01.jpg",
} as const;

export type GalleryOrient = "portrait" | "landscape";

export type GalleryItem = {
  src: string;
  orient: GalleryOrient;
};

/** Section leads — kept out of the gallery mosaic so they aren't repeated */
const sectionLeads = new Set([photos.countdownLead, photos.rsvpLead]);

const allMoments: GalleryItem[] = [
  { src: "/gallery/moment-01.jpg", orient: "portrait" },
  { src: "/gallery/moment-02.jpg", orient: "landscape" },
  { src: "/gallery/moment-03.jpg", orient: "portrait" },
  { src: "/gallery/moment-04.jpg", orient: "portrait" },
  { src: "/gallery/moment-05.jpg", orient: "landscape" },
  { src: "/gallery/moment-06.jpg", orient: "landscape" },
  { src: "/gallery/moment-07.jpg", orient: "portrait" },
  { src: "/gallery/moment-09.jpg", orient: "landscape" },
  { src: "/gallery/moment-10.jpg", orient: "portrait" },
  { src: "/gallery/moment-12.jpg", orient: "landscape" },
  { src: "/gallery/moment-13.jpg", orient: "portrait" },
  { src: "/gallery/moment-14.jpg", orient: "portrait" },
];

/** Gallery mosaic — excludes photos already used in other sections */
export const gallery: GalleryItem[] = allMoments.filter((item) => !sectionLeads.has(item.src));

/** Swipe pile — courtyard first, then the gallery mosaic only. */
export const photoReel: GalleryItem[] = [
  { src: photos.courtyard, orient: "landscape" },
  ...gallery,
];

/** Page colors that follow the scrolling last photo */
export const reelBackdrops = [
  "#f3ebe3",
  "#f7e2e7",
  "#dfe8e6",
  "#f6eadf",
  "#dff3ea",
  "#fbf8f2",
  "#f6f4ed",
] as const;
