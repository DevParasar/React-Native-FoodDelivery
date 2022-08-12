import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const client = SanityClient({
    projectId: "69ii5fqy",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;

//sanity cors add http://localhost:19006