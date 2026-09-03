import { Link } from "react-router-dom";

export default function AuthLayout({
  image,
  title,
  subtitle,
  children,
}) {
  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 sm:p-6">

      <section
        className="
          w-full
          max-w-7xl
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden

          grid

          lg:grid-cols-2
        "
      >

        {/* IMAGE */}

        <div
    className="
        xl:flex
        relative
        items-center
        justify-center
        min-h-187.5
        overflow-hidden
        bg-red-500
    "
>

          <img
            src={image}
            alt="EcoTrack"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/30" />

          {/* Text */}

          <div className="absolute bottom-10 left-10 right-10 z-10 text-white">

            <h2 className="text-4xl font-bold mb-3">
              Together for a Greener Planet 🌍
            </h2>

            <p className="text-lg leading-relaxed opacity-90">
              Calculate your carbon footprint,
              monitor your impact,
              earn eco achievements
              and inspire sustainable living.
            </p>

          </div>

        </div>

        {/* FORM */}

        <div
          className="
            flex
            flex-col
            justify-center

            px-6
            sm:px-10
            lg:px-16

            py-10
            sm:py-12
          "
        >

          <Link
            to="/"
            className="
              text-gray-500
              hover:text-green-700
              mb-8
              w-fit
            "
          >
            ← Home
          </Link>

          <p className="uppercase tracking-[6px] text-sm text-gray-400 mb-2">
            Welcome 
          </p>

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-bold
              text-gray-900
              mb-3
            "
          >
            {title}
          </h1>

          <p className="text-gray-500 mb-10">
            {subtitle}
          </p>

          {children}

        </div>

      </section>

    </main>
  );
}