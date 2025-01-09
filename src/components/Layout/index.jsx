import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router";
import { currentUser } from "../../redux/auth/operations";
import Loading from "../Loading";
import { selectToken } from "../../redux/auth/selectors";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(()=>{
    (
      async()=>{
        try{
          await dispatch(currentUser(token)); 
        }catch(err){
          console.error(err);
        }finally{
          setIsLoading(false);
        }
      }
    )();
  }, []);

  return (
    <div>
      {isLoading && <Loading/>}
      {!isLoading && 
      <main>
        <Outlet />
      </main>}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            pointerEvents: 'none',
          },
        }}
      />
      
    </div>
  );
};

export default Layout;
