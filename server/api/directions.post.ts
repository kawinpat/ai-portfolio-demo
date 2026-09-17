const coordinate = (value: unknown, name: string) => { const parsed = Number(value); if (!Number.isFinite(parsed)) throw createError({ statusCode: 400, message: `Invalid ${name}` }); return parsed }
const unavailableMessage = (travelMode: string) => ({
  BICYCLE: 'Google Maps ยังไม่พบเส้นทางจักรยานที่รองรับระหว่างสองจุดนี้ ลองเลือก รถยนต์ หรือ มอเตอร์ไซค์',
  WALK: 'Google Maps ยังไม่พบเส้นทางเดินที่รองรับระหว่างสองจุดนี้ ลองเลือก รถยนต์ หรือ มอเตอร์ไซค์',
  TWO_WHEELER: 'Google Maps ยังไม่พบเส้นทางมอเตอร์ไซค์ที่รองรับในขณะนี้ ลองเลือก รถยนต์',
  DRIVE: 'Google Maps ยังไม่พบเส้นทางรถยนต์ระหว่างสองจุดนี้ ลองอัปเดตตำแหน่งหรือเลือกวิธีเดินทางอื่น',
}[travelMode] ?? 'Google Maps ไม่พบเส้นทางที่รองรับระหว่างสองจุดนี้')
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(); if (!config.googleMapsServerKey) throw createError({ statusCode: 500, message: 'Google Maps server key is not configured' })
  const body = await readBody<{ origin?: { latitude?: number; longitude?: number }; travelMode?: string }>(event)
  const origin = { latitude: coordinate(body?.origin?.latitude, 'origin latitude'), longitude: coordinate(body?.origin?.longitude, 'origin longitude') }
  const destination = { latitude: coordinate(config.companyLat, 'COMPANY_LAT'), longitude: coordinate(config.companyLng, 'COMPANY_LNG') }
  const travelMode = ['DRIVE', 'TWO_WHEELER', 'WALK', 'BICYCLE'].includes(body?.travelMode ?? '') ? body.travelMode! : 'DRIVE'
  const requestBody = { origin: { location: { latLng: origin } }, destination: { location: { latLng: destination } }, travelMode, ...(travelMode === 'DRIVE' || travelMode === 'TWO_WHEELER' ? { routingPreference: 'TRAFFIC_AWARE', departureTime: new Date(Date.now() + 60_000).toISOString() } : {}) }
  const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': config.googleMapsServerKey, 'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline' }, body: JSON.stringify(requestBody) })
  if (!response.ok) {
    const detail = await response.text()
    console.error('Google Routes API error', { status: response.status, travelMode, detail })
    throw createError({ statusCode: response.status >= 500 ? 502 : 422, message: unavailableMessage(travelMode) })
  }
  const data = await response.json() as { routes?: Array<{ distanceMeters?: number; duration?: string; polyline?: { encodedPolyline?: string } }> }; const route = data.routes?.[0]
  if (!route?.distanceMeters || !route.duration || !route.polyline?.encodedPolyline) throw createError({ statusCode: 422, message: unavailableMessage(travelMode) })
  return { origin, destination, travelMode, distanceMeters: route.distanceMeters, durationSeconds: Number(route.duration.replace('s', '')), encodedPolyline: route.polyline.encodedPolyline, calculatedAt: new Date().toISOString() }
})
