import ArtCategoriesSection from "@/components/homepage/ArtCategoriesSection";
import Banner from "@/components/homepage/Banner";
import FeaturedArtworksSection from "@/components/homepage/FeaturedArtworksSection";
import TopArtistSection from "@/components/homepage/TopArtistSection";

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
