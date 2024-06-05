import HomeOne from "@/ico/component/homes/home-one"; // Use path alias for clarity
import Wrapper from "@/ico/layouts/Wrapper";

export const metadata = {
  title: "PROSPERA – is a cutting-edge De-Fi company at the forefront of innovation in the Artificial Intelligence sector.",
};

const Index = () => {
    console.log("Rendering IcoPage");
    return (
      <Wrapper>
        <HomeOne />
      </Wrapper>
    );
  };
  
  export default Index;
