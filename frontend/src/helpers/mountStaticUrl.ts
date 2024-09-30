export default function mountStaticUrl(imageUrl: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/public/images/${imageUrl}`;
}
