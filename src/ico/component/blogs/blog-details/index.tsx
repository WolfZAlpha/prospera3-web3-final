import Breadcrumb from "../../common/Breadcrumb"
import BlogDetailsArea from "./BlogDetailsArea"
import DocumentArea from "../../common/DocumentArea"
import FooterThree from "../../../layouts/footers/FooterThree"
import HeaderThree from "../../../layouts/headers/HeaderThree"

const BlogDetails = () => {
  return (
    <main>
      <HeaderThree />
      <Breadcrumb title="Blog Details" />
      <BlogDetailsArea/>
      <DocumentArea />
      <FooterThree />
    </main>
  )
}

export default BlogDetails
