// `/fr/insights` is its own route segment, so the tailored loading state from
// the English route doesn't reach it — re-export it rather than fall back to
// the generic root skeleton. The group mirrors the English `(index)` group for
// the same reason: see the note there about soft 404s.
export { default } from "../../../insights/(index)/loading";