'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { Product } from '@/lib/supabase'

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('list')
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')
  
  // Verificar autenticación
  useEffect(() => {
    // Verificamos si existe el token en sessionStorage
    const adminAuth = sessionStorage.getItem('adminAuth')
    
    if (adminAuth !== 'true') {
      // Si no está autenticado, redirigir al login
      router.push('/admin-login')
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  const [productData, setProductData] = useState({
    id: null as number | null,
    name: '',
    price: '',
    description: '',
    category: 'ropa',
    image: null as File | null,
    image_url: '',
    is_new: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Subir imagen
      let image_url = ''
      if (productData.image) {
        try {
          if (!productData.image) throw new Error('No se ha seleccionado una imagen')
          
          // Crear un nombre de archivo único usando timestamp y un número aleatorio
          const fileName = `product-images/${Math.random()}.${productData.image.name.split('.').pop()}`
          console.log('Subiendo archivo:', fileName)
        
        // Subir el archivo
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, productData.image, {
            cacheControl: '3600',
            contentType: productData.image.type,
            upsert: true
          })

        if (uploadError) {
          console.error('Error al subir:', uploadError)
          throw uploadError
        }
        
        console.log('Archivo subido:', uploadData)
        
        // Obtener la URL pública
        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)
        
        if (!urlData?.publicUrl) {
          throw new Error('No se pudo obtener la URL pública')
        }

        image_url = urlData.publicUrl
        console.log('URL pública generada:', image_url)
      } catch (error) {
        console.error('Error subiendo imagen:', error)
        throw error
      }
      }

      // Crear producto
      const { error } = await supabase.from('products').insert([
        {
          name: productData.name,
          price: parseFloat(productData.price),
          description: productData.description,
          category: productData.category,
          image_url,
          is_new: true, // Siempre establecemos is_new como true para nuevos productos
          created_at: new Date().toISOString() // Asegurar que created_at se establezca explícitamente
        }
      ])

      if (error) throw error

      toast.success('Producto agregado exitosamente')
      router.refresh()
      
      // Limpiar formulario
      setProductData({
        id: null,
        name: '',
        price: '',
        description: '',
        category: 'ropa',
        image: null,
        image_url: '',
        is_new: false
      })
      setSelectedFileName('')
    } catch (error) {
      toast.error('Error al agregar el producto')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar productos
  useEffect(() => {
    async function fetchProducts() {
      setIsLoadingProducts(true);
      try {
        let query = supabase.from('products').select('*');
        
        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        toast.error('Error al cargar productos');
      } finally {
        setIsLoadingProducts(false);
      }
    }
    
    fetchProducts();
  }, [searchTerm]);
  
  // Función para editar producto
  const handleEdit = (product: Product) => {
    setProductData({
      id: product.id,
      name: product.name || '',
      price: product.price?.toString() || '',
      description: product.description || '',
      category: product.category || 'ropa',
      image: null,
      image_url: product.image_url || '',
      is_new: product.is_new || false
    });
    
    // Extraer el nombre del archivo de la URL de la imagen si existe
    if (product.image_url) {
      const urlParts = product.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      setSelectedFileName(fileName ? `Imagen actual: ${fileName}` : 'Imagen actual');
    } else {
      setSelectedFileName('');
    }
    
    setEditingProduct(product);
    setActiveTab('add');
  };
  
  // Función para eliminar producto
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      // Primero, obtenemos el producto para ver si tiene imagen
      const { data: product } = await supabase
        .from('products')
        .select('image_url')
        .eq('id', id)
        .single();
      
      // Eliminamos el producto
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Actualizar la lista de productos
      setProducts(products.filter(product => product.id !== id));
      toast.success('Producto eliminado correctamente');
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.error('Error al eliminar el producto');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Función para actualizar un producto
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let image_url = productData.image_url;
      
      // Si hay una imagen nueva, la subimos
      if (productData.image) {
        try {
          // Crear un nombre de archivo único
          const fileName = `product-images/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${productData.image.name.split('.').pop()}`;
          
          // Subir el archivo
          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, productData.image, {
              cacheControl: '3600',
              contentType: productData.image.type,
              upsert: true
            });
            
          if (uploadError) throw uploadError;
          
          // Obtener la URL pública
          const { data: urlData } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);
            
          if (!urlData?.publicUrl) {
            throw new Error('No se pudo obtener la URL pública');
          }
          
          image_url = urlData.publicUrl;
        } catch (error) {
          console.error('Error subiendo nueva imagen:', error);
          throw error;
        }
      }
      
      // Actualizar el producto
      const { error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          price: parseFloat(productData.price),
          description: productData.description,
          category: productData.category,
          image_url,
          is_new: productData.is_new,
          updated_at: new Date()
        })
        .eq('id', productData.id);
        
      if (error) throw error;
      
      // Actualizar la lista de productos
      setProducts(products.map(p => 
        p.id === productData.id ? { ...p, 
          name: productData.name,
          price: parseFloat(productData.price),
          description: productData.description,
          category: productData.category,
          image_url,
          is_new: productData.is_new
        } : p
      ));
      
      toast.success('Producto actualizado correctamente');
      
      // Limpiar formulario y volver a la lista
      setProductData({
        id: null,
        name: '',
        price: '',
        description: '',
        category: 'ropa',
        image: null,
        image_url: '',
        is_new: false
      });
      
      setSelectedFileName('');
      setEditingProduct(null);
      setActiveTab('list');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      toast.error('Error al actualizar el producto');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <button 
            onClick={() => {
              sessionStorage.removeItem('adminAuth');
              router.push('/admin-login');
            }}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'list' 
              ? 'border-b-2 border-indigo-600 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('list')}
          >
            Lista de Productos
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'add' 
              ? 'border-b-2 border-indigo-600 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => {
              setActiveTab('add');
              setEditingProduct(null);
              setSelectedFileName('');
              setProductData({
                id: null,
                name: '',
                price: '',
                description: '',
                category: 'ropa',
                image: null,
                image_url: '',
                is_new: false
              });
            }}
          >
            {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
          </button>
        </div>
        
        {activeTab === 'list' ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Productos</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {isLoadingProducts ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay productos disponibles.</p>
                <button 
                  onClick={() => setActiveTab('add')}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Agregar un producto
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imagen
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                            {product.image_url ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-400 text-xs">
                                Sin imagen
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{product.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price?.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800 capitalize">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.is_new ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Nuevo
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {deleteConfirmId === product.id ? (
                            <div className="flex items-center justify-end space-x-2">
                              <span className="text-xs text-red-600">¿Eliminar?</span>
                              <button
                                onClick={() => handleDelete(product.id)}
                                disabled={isLoading}
                                className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                              >
                                Sí
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="text-gray-700 hover:text-gray-900 px-2 py-1 rounded text-xs"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(product.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="bg-gradient-to-r from-[#a34e96] to-[#3e5497] p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold text-white">{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            </div>
            
            <form onSubmit={editingProduct ? handleUpdate : handleSubmit} className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Mameluco para bebé"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a34e96] focus:ring-[#a34e96] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-[#a34e96] focus:ring-[#a34e96] transition-colors"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del Producto
          </label>
          <textarea
            required
            placeholder="Describe el producto con detalles como material, tamaño, uso recomendado, etc."
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a34e96] focus:ring-[#a34e96] transition-colors"
          />
          <p className="mt-1 text-xs text-gray-500">
            Una buena descripción ayuda a los clientes a entender mejor el producto
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <div className="mt-1 relative">
            <select
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none pl-3 pr-10 py-2"
            >
              <option value="ropa">Ropa</option>
              <option value="juguetes">Juguetes</option>
              <option value="basicos">Básicos</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Selecciona una de las categorías establecidas de tu tienda
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <div className="mt-1 flex items-center">
            <div className={`w-full flex justify-center px-6 pt-5 pb-6 border-2 ${selectedFileName ? 'border-[#a34e96]' : 'border-gray-300'} ${selectedFileName ? 'bg-purple-50' : ''} border-dashed rounded-md transition-colors`}>
              <div className="space-y-1 text-center">
                {selectedFileName ? (
                  <>
                    <div className="mx-auto h-12 w-12 text-[#a34e96] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#a34e96] break-all">
                      {selectedFileName}
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      No hay imagen seleccionada
                    </p>
                  </>
                )}
                <div className="flex justify-center text-sm text-gray-600 mt-2">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#a34e96] hover:text-[#8a4280] focus-within:outline-none px-3 py-1.5 border border-[#a34e96] hover:bg-purple-50 transition-colors">
                    <span>{selectedFileName ? 'Cambiar imagen' : 'Seleccionar imagen'}</span>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProductData({ ...productData, image: file });
                          setSelectedFileName(file.name);
                        } else {
                          setProductData({ ...productData, image: null });
                          setSelectedFileName('');
                        }
                      }}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hasta 5MB</p>
                {selectedFileName && (
                  <button 
                    type="button"
                    onClick={() => {
                      setProductData({ ...productData, image: null });
                      setSelectedFileName('');
                    }}
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                  >
                    Eliminar imagen
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_new"
              checked={productData.is_new}
              onChange={(e) => setProductData({ ...productData, is_new: e.target.checked })}
              className="h-4 w-4 text-[#a34e96] focus:ring-[#a34e96] border-gray-300 rounded"
            />
            <label htmlFor="is_new" className="ml-2 block text-sm text-gray-900">
              Marcar como Nuevo
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Los productos marcados como "Nuevo" aparecerán destacados en la página principal.
          </p>
        </div>

        <div className="flex justify-between mt-8">
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setSelectedFileName('');
                setActiveTab('list');
              }}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`${editingProduct ? 'ml-auto' : 'w-full'} flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#a34e96] to-[#3e5497] hover:from-[#8e4483] hover:to-[#344680] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a34e96] disabled:opacity-70`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {editingProduct ? 'Actualizando...' : 'Agregando...'}
              </span>
            ) : (
              <span className="flex items-center">
                {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
        )}
      </div>
    </div>
  );
}
