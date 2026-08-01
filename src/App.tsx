import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import TravelProtectedRoute from './components/travel/TravelProtectedRoute';
import { TravelAuthProvider } from './context/TravelAuthContext';
import OfflineBanner from './components/OfflineBanner';

import Login from './pages/Login';
import LoginSlug from './pages/LoginSlug';
import Beranda from './pages/Beranda';
import Panduan from './pages/Panduan';
import TataCara from './pages/TataCara';
import PanduanIhram from './pages/PanduanIhram';
import PanduanMiqat from './pages/PanduanMiqat';
import FaqFikih from './pages/FaqFikih';
import Glosarium from './pages/Glosarium';
import Ibadah from './pages/Ibadah';
import CounterTawaf from './pages/CounterTawaf';
import CounterSai from './pages/CounterSai';
import JadwalSholat from './pages/JadwalSholat';
import Doa from './pages/Doa';
import DoaDetail from './pages/DoaDetail';
import Peta from './pages/Peta';
import LokasiDetail from './pages/LokasiDetail';
import Profil from './pages/Profil';
import Persiapan from './pages/Persiapan';
import Sertifikat from './pages/Sertifikat';
import ManasikInteraktif from './pages/ManasikInteraktif';
import ManasikModulDetail from './pages/ManasikModulDetail';
import Jurnal from './pages/Jurnal';
import RitualNavigator from './pages/RitualNavigator';
import Tahallul from './pages/Tahallul';
import AgendaLengkap from './pages/AgendaLengkap';
import KartuJamaah from './pages/KartuJamaah';
import Pengumuman from './pages/Pengumuman';

import AdminLogin from './pages/admin/AdminLogin';
import AdminTenantList from './pages/admin/AdminTenantList';
import AdminTenantForm from './pages/admin/AdminTenantForm';

import TravelLogin from './pages/travel/TravelLogin';
import TravelDashboard from './pages/travel/TravelDashboard';

import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <>
      <OfflineBanner />
      <Routes>
      {/* ── App jamaah ── */}
      <Route path="/t/:slug" element={<LoginSlug />} />
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/panduan" element={<Panduan />} />
        <Route path="/panduan/tata-cara" element={<TataCara />} />
        <Route path="/panduan/ihram" element={<PanduanIhram />} />
        <Route path="/panduan/miqat" element={<PanduanMiqat />} />
        <Route path="/panduan/faq-fikih" element={<FaqFikih />} />
        <Route path="/panduan/glosarium" element={<Glosarium />} />
        <Route path="/panduan/manasik-interaktif" element={<ManasikInteraktif />} />
        <Route path="/panduan/manasik-interaktif/:modulId" element={<ManasikModulDetail />} />
        <Route path="/ibadah" element={<Ibadah />} />
        <Route path="/ibadah/navigator" element={<RitualNavigator />} />
        <Route path="/ibadah/tawaf" element={<CounterTawaf />} />
        <Route path="/ibadah/sai" element={<CounterSai />} />
        <Route path="/ibadah/tahallul" element={<Tahallul />} />
        <Route path="/ibadah/jadwal-sholat" element={<JadwalSholat />} />
        <Route path="/doa" element={<Doa />} />
        <Route path="/doa/:id" element={<DoaDetail />} />
        <Route path="/peta" element={<Peta />} />
        <Route path="/peta/:id" element={<LokasiDetail />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/persiapan" element={<Persiapan />} />
        <Route path="/profil/sertifikat" element={<Sertifikat />} />
        <Route path="/profil/jurnal" element={<Jurnal />} />
        <Route path="/profil/agenda" element={<AgendaLengkap />} />
        <Route path="/profil/kartu" element={<KartuJamaah />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
      </Route>

      {/* ── Admin panel — terpisah dari app jamaah ── */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminTenantList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/tenants/:id"
        element={
          <AdminProtectedRoute>
            <AdminTenantForm />
          </AdminProtectedRoute>
        }
      />

      {/* ── Travel Agency Portal ── */}
      <Route
        path="/travel"
        element={<TravelAuthProvider><TravelProtectedRoute><TravelDashboard /></TravelProtectedRoute></TravelAuthProvider>}
      />
      <Route
        path="/travel/login"
        element={<TravelAuthProvider><TravelLogin /></TravelAuthProvider>}
      />

      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  );
}
