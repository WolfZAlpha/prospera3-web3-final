import Breadcrumb from "../../common/Breadcrumb";
import BlogArea from "./BlogArea";
import DocumentArea from "../../common/DocumentArea";
import FooterThree from "../../../layouts/footers/FooterThree";
import HeaderThree from "../../../layouts/headers/HeaderThree";

const Blog = () => {
  return (
    <main>
      <HeaderThree />
      <Breadcrumb title="Our Blog" />
      <BlogArea/>
      <DocumentArea />
      <FooterThree />
    </main>
  )
}

export default Blog;
