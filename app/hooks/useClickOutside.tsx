import { useEffect, RefObject } from 'react';

/**
 * Belirtilen ref dışındaki alanlara tıklandığında callback fonksiyonunu çalıştıran hook
 * @param ref Dışında tıklanması izlenecek element referansı
 * @param callback Dışında tıklandığında çalıştırılacak fonksiyon
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
): void => {
  useEffect(() => {
    // Tıklama olayı işleyicisi
    const handleClickOutside = (event: MouseEvent) => {
      // ref ve event.target kontrol edilir
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Event listener'ı ekle
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup fonksiyonu
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]); // ref veya callback değiştiğinde effect yeniden çalışır
}; 