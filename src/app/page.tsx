import HeroCarousel from '../components/HeroCarousel';
import SocialMediaSection from '../components/SocialMediaSection';
import ProductsCarousel from '../components/ProductsCarousel';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <div className=''>
      <HeroCarousel />
      <SocialMediaSection />
      <ProductsCarousel />
      <FeaturedProducts /> 
      {/* <OutletExplanation /> */}
       {/* <ImprovedHomepageSection />  */}
      
      {/* <AboutUs />
       <InformativeSection
        text1="En nuestra tienda, entendemos que el costo de las placas de video de alta gama ha alcanzado precios elevados. Para solucionar esto, hemos desarrollado una alternativa: nuestras computadoras nuevas incluyen placas de video outlet certificadas, lo que nos permite reducir los costos significativamente sin comprometer la calidad ni el rendimiento."
        text2="Con esta solución, logramos que el precio final de nuestras PCs se reduzca hasta la mitad en comparación con equipos que usan tarjetas completamente nuevas, ahorrando millones de pesos. Así, brindamos a nuestros clientes una excelente oportunidad para acceder a la tecnología más avanzada a un costo mucho más accesible."
       /> */}
      
       {/* <PromotionalBanner
        title="¡Oferta especial de lanzamiento!"
        description="Obtén un descuento en todas las computadoras con RTX serie 30 Outlet"
        linkText="Ver Productos"
        linkHref="/categoria/pcs-nuevas-graficas-outlet"
      /> */}
       
      {/* <SpecialOrdersSection /> */} 
    </div>
  )
}