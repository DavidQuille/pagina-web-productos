import { supabase } from '@/lib/supabase'
import ProductCarousel from '@/components/ProductCarousel'
export const dynamic = 'force-dynamic';

async function getProducts() {
  // Obtener hasta 100 productos y seleccionar aleatoriamente hasta 10
  const { data: allProducts, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }

  const productsArray = allProducts || [];

  // Mezclar array (Fisher-Yates) y tomar hasta 10
  for (let i = productsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = productsArray[i];
    productsArray[i] = productsArray[j];
    productsArray[j] = tmp;
  }

  return productsArray.slice(0, 10);
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      {/* Espacio para la navbar fija */}
      <div className="pt-16"></div>
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
        {/* Fondo: usar mismo gradiente que el footer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#a34e96] to-[#3e5497] z-0">
          <div className="absolute inset-0 bg-black opacity-15"></div>
        </div>
        
        <div className="relative z-10 p-6 fade-in-section is-visible">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
            Descubre Calidad<br/> y Estilo
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-6 text-gray-300">
            Los mejores productos seleccionados para toda la familia.
          </p>
          <a href="#catalogo" className="bg-[#3e5497] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#2d3f70] transition-colors duration-300 transform hover:scale-105 inline-block">
            Ver Colección
          </a>
        </div>
      </section>

      {/* CATEGORÍAS DESTACADAS */}
      <section id="categorias" className="py-16 bg-gray-50 fade-in-section animate-on-scroll">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Nuestras Categorías</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Encuentra todo lo que buscas en nuestras colecciones seleccionadas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Categoría 1 */}
            <div className="relative rounded-xl overflow-hidden group h-56">
              <div className="bg-[#f5c3cf] w-full h-full absolute"></div>
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                <a href="/categorias/ropa" className="block w-full h-full flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Ropa</h3>
                </a>
              </div>
            </div>
            {/* Categoría 2 */}
            <div className="relative rounded-xl overflow-hidden group h-56">
              <div className="bg-[#a34e96] w-full h-full absolute"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <a href="/categorias/juguetes" className="block w-full h-full flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Juguetes</h3>
                </a>
              </div>
            </div>
            {/* Categoría 3 */}
            <div className="relative rounded-xl overflow-hidden group h-56">
              <div className="bg-[#3e5497] w-full h-full absolute"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <a href="/categorias/basicos" className="block w-full h-full flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Productos Básicos</h3>
                </a>
              </div>
            </div>
            {/* Categoría 4 */}
            <div className="relative rounded-xl overflow-hidden group h-56">
              <div className="bg-[#e91e63] w-full h-full absolute"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <a href="/categorias/accesorios" className="block w-full h-full flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Accesorios</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="catalogo" className="py-16 bg-white fade-in-section animate-on-scroll">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Nuestros Productos</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Descubre una selección de productos disponibles en nuestra tienda.
            </p>
          </div>
          <ProductCarousel products={products} />
        </div>
      </section>
      
      {/* Espacio final reducido */}
      <div className="py-4"></div>
    </main>
  );
}

