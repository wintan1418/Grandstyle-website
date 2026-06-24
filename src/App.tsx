import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import ReadingProgress from "./components/ReadingProgress";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Admin (with the heavy WYSIWYG editor) loads only when the owner visits it,
// keeping the public site bundle light.
const Admin = lazy(() => import("./pages/Admin"));

// Public marketing layout — header, footer, floating buttons.
function SiteLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:tracking-wide"
      >
        Skip to content
      </a>
      <ReadingProgress />
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
        {/* Admin runs without the marketing chrome */}
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-cloud grid place-items-center text-ash">
                  Loading…
                </div>
              }
            >
              <Admin />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
