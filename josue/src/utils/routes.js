export function getHomeHash() {
  return "#/";
}

export function getProductHash(id) {
  return `#/producto/${id}`;
}

export function parseRouteHash(hash) {
  if (!hash || hash === "#" || hash === "#/" ) {
    return { type: "home" };
  }

  const match = hash.match(/^#\/producto\/(\d+)$/);
  if (match) {
    return { type: "product", id: Number(match[1]) };
  }

  return { type: "home" };
}
