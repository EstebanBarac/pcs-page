import HomePage from '../components/HomePage'
import FeaturedProducts from '../components/FeaturedProducts'
import PromotionalBanner from '../components/PromotionalBanner'
import OutletExplanation from '../components/OutletExplanation'
import AboutUs from '../components/AboutUs'
import SpecialOrdersSection from '../components/SpecialOrdersSection'

export default function Home() {
  return (
    <div className=''>
      <HomePage />
      <AboutUs />
      <OutletExplanation />
      <PromotionalBanner
        title="¡Oferta especial de lanzamiento!"
        description="Obtén un descuento en todas las computadoras con RTX serie 30 Outlet"
        linkText="Ver Productos"
        linkHref="/categoria/pcs-nuevas-graficas-outlet"
      />
      <FeaturedProducts />
      <SpecialOrdersSection />
    </div>
  )
}