export default async function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
