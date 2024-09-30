export default function goToProductPage(
  productId: string,
  push: (url: string) => void
) {
  return push(`produto/${productId}`);
}
