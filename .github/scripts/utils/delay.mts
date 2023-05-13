export default async function delay(index: number) {
  return new Promise((resolve) => setTimeout(resolve, index * 3000));
}
