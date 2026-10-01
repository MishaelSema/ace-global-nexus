// `/fr/insights` is its own route segment, so the tailored loading state from
// the English route doesn't reach it — re-export it rather than fall back to
// the generic root skeleton.
export { default } from "../../insights/loading";
