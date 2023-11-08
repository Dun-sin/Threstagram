import Link from 'next/link';

export default function Home() {
  return (
    <section className='bg-primary text-secondary flex items-center flex-col justify-between h-screen w-screen font-sans sm:gap-0 gap-12 relative'>
      <div
        className='absolute h-screen w-screen bg-repeat-x'
        style={{
          backgroundImage:
            "url('https://e0.pxfuel.com/wallpapers/487/755/desktop-wallpaper-black-and-blue-black-blue-backgrounds-new.jpg')",
        }}
      />
      <div className='flex items-center w-full flex-col justify-center overflow-auto bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 h-full pb-10 gap-4'>
        <h1 className='font-bold text-f3xl'>Threstagram</h1>
        <h2 className='font-semibold text-f2xl text-center -mt-7'>
          Welcome to the social toolbox
        </h2>
        <main className='flex gap-5 flex-col sm:flex-row'>
          <Link href='/threads'>
            <section className='h-52 w-64 text-fmd text-center cursor-pointer border border-secondary flex items-center justify-center rounded px-4 hover'>
              <span>Convert Your Threads Post to Image</span>
            </section>
          </Link>
          <Link href='/instagram'>
            <section className='h-52 w-64 text-fmd text-center cursor-pointer border border-secondary flex items-center justify-center rounded px-4'>
              <span>Convert Your Instagram Post to PDF</span>
            </section>
          </Link>
        </main>
      </div>
    </section>
  );
}
