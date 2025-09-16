import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

async function getProducts() {
  // Obtener productos creados en los últimos 2 días (48 horas)
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .gte('created_at', twoDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error al obtener productos:', error)
    return []
  }

  return products || []
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      {/* Espacio para la navbar fija */}
      <div className="pt-16"></div>
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-white text-center bg-gray-900">
        {/* Fondo de color sólido */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5c3cf] to-[#a34e96] z-0">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="catalogo" className="py-16 bg-white fade-in-section animate-on-scroll">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Productos Nuevos</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Descubre las últimas tendencias y novedades en nuestra tienda.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-8">
                No hay productos nuevos disponibles
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Espacio final reducido */}
      <div className="py-4"></div>
    </main>
  );
}

