import { COMPANY_INFO } from '@/data/constants';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Versión móvil: Barra fija con título */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-white shadow-md px-4 flex items-center">
          <h1 className="text-xl font-serif text-wine-red">{COMPANY_INFO.name}</h1>
        </div>
      )}
      
      {/* Versión escritorio: Implementar más adelante */}
      {!isMobile && null}
    </>
  );
}