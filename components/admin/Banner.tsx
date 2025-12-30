
// import BannerForm from "./BannerForm";


// async function getBannerData() {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/features/find-banner`);
//     if (response.ok) {
//       return await response.json();
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// }

// export default async function BannerPage() {
//   const bannerData = await getBannerData();
// //   console.log(bannerData);
// const banner = bannerData?.data || {};

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <BannerForm existingBanner={bannerData?.data} />
//       </div>
//     </div>
//   );
// }