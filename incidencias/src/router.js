export function getRutaActual() {
  const hash = window.location.hash;

  if (!hash || hash === "#" || hash === "#/") {
    window.location.hash = "#/incidencies";
    return { vista: "llistat" };
  }

  if (hash === "#/incidencies") {
    return { vista: "llistat" };
  }

  const parts = hash.split("/");
  if (parts.length === 3 && parts[0] === "#" && parts[1] === "incidencies" && parts[2]) {
    return { vista: "detall", id: decodeURIComponent(parts[2]) };
  }

  return { vista: "not-found" };
}