<script setup lang="ts">
type Route = {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distanceMeters: number;
  durationSeconds: number;
  encodedPolyline: string;
  calculatedAt: string;
};
type TravelMode = "DRIVE" | "TWO_WHEELER" | "WALK" | "BICYCLE";
const travelOptions: { value: TravelMode; icon: string; label: string; detail: string }[] = [
  { value: "DRIVE", icon: "🚗", label: "รถยนต์", detail: "คำนวณตามสภาพจราจร" },
  { value: "TWO_WHEELER", icon: "🏍️", label: "มอเตอร์ไซค์", detail: "คำนวณตามสภาพจราจร" },
  { value: "WALK", icon: "🚶", label: "เดิน", detail: "เส้นทางสำหรับการเดิน" },
  { value: "BICYCLE", icon: "🚲", label: "จักรยาน", detail: "เส้นทางสำหรับจักรยาน" },
];
const config = useRuntimeConfig(),
  mapElement = ref<HTMLElement | null>(null),
  route = ref<Route | null>(null),
  loading = ref(true),
  error = ref(""),
  travelMode = ref<TravelMode>("DRIVE"),
  currentPosition = ref<{ latitude: number; longitude: number } | null>(null);
declare global {
  interface Window {
    google?: any;
  }
}
const distance = computed(() => (route.value ? `${(route.value.distanceMeters / 1000).toFixed(1)} กม.` : "—"));
const duration = computed(() => {
  const m = Math.round((route.value?.durationSeconds ?? 0) / 60);
  return route.value ? (m > 59 ? `${Math.floor(m / 60)} ชม. ${m % 60} นาที` : `${m} นาที`) : "—";
});
const selectedTravel = computed(() => travelOptions.find(option => option.value === travelMode.value)!);
const alternateMode = computed(() => (travelMode.value === "DRIVE" ? "TWO_WHEELER" : "DRIVE"));
const googleMapsTravelMode: Record<TravelMode, string> = {
  DRIVE: "driving",
  TWO_WHEELER: "two-wheeler",
  WALK: "walking",
  BICYCLE: "bicycling",
};
const googleMapsUrl = computed(() => {
  if (!route.value) return "#";
  const origin = `${route.value.origin.latitude},${route.value.origin.longitude}`;
  const destination = `${route.value.destination.latitude},${route.value.destination.longitude}`;
  const selectedMode: TravelMode = travelMode.value as TravelMode;
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${googleMapsTravelMode[selectedMode]}`;
});
const loadMaps = (key: string) =>
  new Promise<void>((resolve, reject) => {
    if (window.google?.maps) return resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=geometry&language=th&v=weekly`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("โหลด Google Map ไม่สำเร็จ"));
    document.head.appendChild(script);
  });
const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }),
  );
const refresh = async (requestLocation = false) => {
  loading.value = true;
  error.value = "";
  try {
    if (!navigator.geolocation) throw new Error("อุปกรณ์นี้ไม่รองรับการระบุตำแหน่ง");
    if (!currentPosition.value || requestLocation) {
      const position = await getCurrentPosition();
      currentPosition.value = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    }
    const routeResponse = await fetch("/api/directions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin: currentPosition.value, travelMode: travelMode.value }),
    });
    if (!routeResponse.ok) {
      const responseError = (await routeResponse.json().catch(() => null)) as { message?: string } | null;
      throw new Error(responseError?.message ?? "ไม่สามารถคำนวณเส้นทางได้ในขณะนี้");
    }
    const data = (await routeResponse.json()) as Route;
    route.value = data;
    if (!config.public.googleMapsBrowserKey) throw new Error("ยังไม่ได้ตั้งค่า Browser Key");
    await loadMaps(config.public.googleMapsBrowserKey);
    const origin = { lat: data.origin.latitude, lng: data.origin.longitude },
      destination = { lat: data.destination.latitude, lng: data.destination.longitude },
      map = new window.google.maps.Map(mapElement.value, {
        center: origin,
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
      });
    const path = window.google.maps.geometry.encoding.decodePath(data.encodedPolyline),
      line = new window.google.maps.Polyline({ path, strokeColor: "#32d3c0", strokeWeight: 5, map });
    new window.google.maps.Marker({ position: origin, map, label: "A", title: "ตำแหน่งปัจจุบัน" });
    new window.google.maps.Marker({ position: destination, map, label: "B", title: "ตำแหน่งบริษัท" });
    const bounds = new window.google.maps.LatLngBounds();
    line.getPath().forEach((point: unknown) => bounds.extend(point));
    map.fitBounds(bounds, 48);
  } catch (e) {
    if (e instanceof GeolocationPositionError) error.value = "กรุณาอนุญาตการเข้าถึงตำแหน่ง แล้วกดคำนวณใหม่";
    else if (e instanceof Error) error.value = e.message;
    else error.value = "ไม่สามารถคำนวณเส้นทางได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง";
  } finally {
    loading.value = false;
  }
};
const selectTravelMode = (mode: TravelMode) => {
  if (mode === travelMode.value || loading.value) return;
  travelMode.value = mode;
  refresh();
};
onMounted(refresh);
</script>
<template>
  <main class="route-page">
    <header class="nav">
      <NuxtLink class="brand" to="/">Kawinpat <small>AI-ASSISTED DEVELOPMENT PORTFOLIO</small></NuxtLink
      ><NuxtLink class="route-back" to="/">← กลับหน้า Portfolio</NuxtLink>
    </header>
    <section class="route-hero wrap">
      <div>
        <p class="eyebrow">FULL-STACK ROUTE DEMO</p>
        <h1>เส้นทางไปยังบริษัท</h1>
        <p class="lede">ใช้ตำแหน่งปัจจุบันของผู้ใช้งาน ส่งให้ Nuxt Server API คำนวณระยะทางและเวลาเดินทางผ่าน Google Routes API</p>
      </div>
      <p class="route-status">● {{ loading ? "กำลังคำนวณเส้นทาง" : "Nuxt Server API พร้อมใช้งาน" }}</p>
    </section>
    <section class="wrap route-grid">
      <aside class="route-summary">
        <p class="label">ROUTE RESULT · {{ selectedTravel.label.toUpperCase() }}</p>
        <div class="travel-options" aria-label="เลือกวิธีเดินทาง">
          <button
            v-for="option in travelOptions"
            :key="option.value"
            :class="{ active: travelMode === option.value }"
            :disabled="loading"
            :title="option.label"
            @click="selectTravelMode(option.value)"
          >
            <span>{{ option.icon }}</span
            ><small>{{ option.label }}</small>
          </button>
        </div>
        <div>
          <span>ระยะทาง</span><b>{{ distance }}</b>
        </div>
        <div>
          <span>เวลาเดินทางโดยประมาณ</span><b>{{ duration }}</b
          ><small>{{ selectedTravel.detail }}</small>
        </div>
        <p>🅰️ ตำแหน่งปัจจุบันของคุณ<br /><small>Location Permission จาก Browser</small></p>
        <p>🅱️ ตำแหน่งบริษัท<br /><small>COMPANY_LAT / COMPANY_LNG</small></p>
        <button class="button primary" :disabled="loading" @click="refresh(true)">อัปเดตตำแหน่งปัจจุบัน ↻</button>
        <a v-if="route" class="maps-link" :href="googleMapsUrl" target="_blank" rel="noopener noreferrer">↗ เปิดนำทางใน Google Maps</a>
        <span v-else class="maps-link disabled">↗ เปิดนำทางใน Google Maps</span>
      </aside>
      <div class="map-shell">
        <div ref="mapElement" class="google-map"></div>
        <div v-if="loading || error" class="map-state">
          <b>{{ loading ? "กำลังโหลดแผนที่…" : "ยังแสดงแผนที่ไม่ได้" }}</b
          ><span v-if="error">{{ error }}</span>
          <button v-if="error" class="map-retry" @click="selectTravelMode(alternateMode)">
            ลองใช้ {{ alternateMode === "DRIVE" ? "รถยนต์" : "มอเตอร์ไซค์" }}
          </button>
        </div>
      </div>
    </section>
    <p v-if="travelMode === 'TWO_WHEELER'" class="wrap route-warning">
      หมายเหตุ: การคำนวณโหมดรถจักรยานยนต์ของ Google Routes API ยังเป็น Beta ควรตรวจสอบสภาพเส้นทาง ป้ายจราจร
      และกฎในพื้นที่จริงก่อนเดินทาง
    </p>
  </main>
</template>
