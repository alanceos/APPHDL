import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import LoadingScreen from "@/components/sections/loading-screen";
import MobileNav from "@/components/layout/mobile-nav";
import Header from "@/components/layout/header";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ExperienciaPage from "@/pages/experiencia";
import VinoPage from "@/pages/vino";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/experiencia/:id" component={ExperienciaPage} />
      <Route path="/vino/:id" component={VinoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Actualizar el título de la página
    document.title = "Hacienda de Letras";
    
    // Simular tiempo de carga para una experiencia más lujosa
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loading ? <LoadingScreen /> : (
        <>
          <Header />
          <Router />
          {isMobile && <MobileNav />}
        </>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
