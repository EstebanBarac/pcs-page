'use client'
import Link from 'next/link'

export default function SpecialOrdersSection() {

  return (
    <section className=" text-white py-16">
      <div className="container mx-auto px-4 mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">¿Buscas algo a medida?</h2>
          <p className="text-xl mb-8 px-8">
            Si queres modificar cualquier caracteristica de los modelos que tenemos o buscas un producto en especifico, consultanos y te asesoramos sin cargo.
          </p>
          <Link href='https://wa.me/5492995286048'>
            <button
              className="bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white px-24 py-3 rounded-full text-lg font-semibold hover:opacity-75 transition duration-300"
            >
              Contactarse
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}