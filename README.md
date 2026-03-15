# Bankampanya Mobile

Expo Router tabanlı, TypeScript ile geliştirilmiş Bankampanya mobil frontend projesi.

## Özellikler

- Expo + React Native + TypeScript
- Expo Router ile route tabanlı mimari
- TanStack Query ile query katmanı
- Zustand ile local store yönetimi
- React Hook Form + Zod ile form doğrulama
- Backend-ready service / hooks / mutation ayrımı
- Türkçe içerikli premium fintech UI

## Kapsanan ekranlar

- Onboarding
- Login / Register / Şifremi Unuttum
- Senin İçin
- Keşfet
- Takip
- Kampanya Detayı
- Takip Detayı
- Kredi
- Cüzdanım
- AI Asistan
- Bildirimler
- Profil
- Başarı ekranı

## Proje yapısı

```text
app/                      Expo Router ekranları
src/components/           Ortak UI ve ekran bileşenleri
src/hooks/                Query ve mutation hook'ları
src/mocks/                Typed mock data
src/services/api/         API abstraction katmanı
src/store/                Zustand store'ları
src/theme/                Tasarım token'ları
src/types/                Domain type tanımları
```

## Kurulum

```bash
npm install
npm run start
```

## Faydalı komutlar

```bash
npm run start
npx tsc --noEmit
```

## Notlar

- Uygulama şu anda typed mock data ile çalışır.
- Mimari, gerçek backend entegrasyonuna geçişi kolaylaştıracak şekilde hazırlanmıştır.
- Ana tab yapısı: `Senin İçin / Keşfet / Takip / Kredi / Cüzdanım`

## Sonraki adım

Bir sonraki teknik adım, `src/services/api` altında gerçek API client ve env tabanlı entegrasyon altyapısını eklemektir.
