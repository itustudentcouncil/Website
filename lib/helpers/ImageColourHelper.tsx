import sharp from "sharp";

// Used to get dominant colour of an image
export async function getDominantColorHex(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl, { next: { revalidate: 3600 } });
    if (!response.ok) return "#1f2937";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { data } = await sharp(buffer)
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const [r, g, b] = data;
    const toHex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch {
    return "#1f2937";
  }
}