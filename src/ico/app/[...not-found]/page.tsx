import Error from "../../component/error/Index";
import Wrapper from "../../layouts/Wrapper";

export const metadata = {
   title: "404 error || You have reached a non working page human. Please, try again!",
};
const index = () => {
   return (
      <Wrapper>
         <Error />
      </Wrapper>
   )
}

export default index
