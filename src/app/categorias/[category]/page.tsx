import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/supabase'

type CategoryParams = {
  category: string;
}

// Buena práctica: Actualiza el tipo para reflejar que params es una Promesa
interface Props {
  params: Promise<CategoryParams>;
}

async function getProductsByCategory(category: string) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  return data as Product[]
}

const getCategoryDescription = (category: string) => {
  switch (category) {
    case 'ropa':
      return 'Explora nuestra colección de ropa para bebé'
    case 'juguetes':
      return 'Diviértete con nuestra selección de juguetes'
    case 'basicos':
      return 'Artículos esenciales para el hogar y cuidado diario'
    default:
      return ''
  }
}

// ==================================================================
//                              CAMBIOS AQUÍ
// 1. La función ahora recibe "props" en lugar de "{ params }"
// 2. Usamos "await" para obtener el valor de los params
// ==================================================================
export default async function CategoryPage(props: Props) {
  const params = await props.params; // <--- CAMBIO #1: Resolver la promesa
  const category = params.category;  // <--- CAMBIO #2: Ahora se puede acceder

  const products = await getProductsByCategory(category)
  const description = getCategoryDescription(category)
  
  const getBgColor = () => {
    switch(category) {
      case 'ropa': return 'from-[#f5c3cf] to-[#a34e96]';
      case 'juguetes': return 'from-[#a34e96] to-[#3e5497]';
      case 'basicos': return 'from-[#3e5497] to-[#a34e96]';
      default: return 'from-[#a34e96] to-[#3e5497]';
    }
  }

  return (
    <main>
      {/* Espacio para la navbar fija */}
      <div className="pt-16"></div>
      
      {/* Hero de categoría */}
      <section className={`bg-gradient-to-r ${getBgColor()} text-white py-14`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold capitalize mb-3">
              {category}
            </h1>
            <p className="text-base text-white/90 md:text-lg">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Lista de productos */}
      <section className="py-16 bg-white fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Nuestros Productos</h2>
            <div className="h-1 w-20 bg-[#a34e96] mx-auto mt-2"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {(!products || products.length === 0) && (
              <p className="text-center text-gray-500 py-12 col-span-3 text-lg">
                No hay productos en esta categoría aún.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}