export function formatPrice(value) {
  return `$${new Intl.NumberFormat("es-CO").format(value)}`;
}
