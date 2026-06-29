import ArtCategoriesSection from "@/components/homepage/ArtCategoriesSection";
import Banner from "@/components/homepage/Banner";
import FeaturedArtworksSection from "@/components/homepage/FeaturedArtworksSection";
import TopArtistSection from "@/components/homepage/TopArtistSection";

export const metadata = {
  title: "ArtHub - Home",
  description:
    "ArtHub is a digital platform that connects art lovers, collectors, and buyers with talented artists.",
};



const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedArtworksSection />
      <ArtCategoriesSection />
      <TopArtistSection />
    </div>
  );
};

export default HomePage;
