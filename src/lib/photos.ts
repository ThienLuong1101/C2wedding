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

/** Extra moments from /public/gallery */
export const gallery: GalleryItem[] = [
  { src: "/gallery/moment-01.jpg", orient: "portrait" },
  { src: "/gallery/moment-02.jpg", orient: "landscape" },
  { src: "/gallery/moment-03.jpg", orient: "portrait" },
  { src: "/gallery/moment-04.jpg", orient: "portrait" },
  { src: "/gallery/moment-05.jpg", orient: "landscape" },
  { src: "/gallery/moment-06.jpg", orient: "landscape" },
  { src: "/gallery/moment-07.jpg", orient: "portrait" },
  { src: "/gallery/moment-08.jpg", orient: "portrait" },
  { src: "/gallery/moment-09.jpg", orient: "landscape" },
  { src: "/gallery/moment-10.jpg", orient: "portrait" },
  { src: "/gallery/moment-11.jpg", orient: "portrait" },
  { src: "/gallery/moment-12.jpg", orient: "landscape" },
  { src: "/gallery/moment-13.jpg", orient: "portrait" },
];
