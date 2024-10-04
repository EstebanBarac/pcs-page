import { Product } from '../data/products'
import ProductCard from './ProductCard'

type ProductListProps = {
  products: Product[]
  title: string
}

export default function ProductList({ products, title }: ProductListProps) {
  return (
    <section className="py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 item">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}