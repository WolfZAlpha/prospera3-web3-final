import Blog from "../../component/blogs/blog";
import Wrapper from "../../layouts/Wrapper";

export const metadata = {
  title: "PROSPERA – is a cutting-edge De-Fi company at the forefront of innovation in the Artificial Intelligence sector.",
};
const index = () => {
  return (
    <Wrapper>
      <Blog />
    </Wrapper>
  )
}

export default index