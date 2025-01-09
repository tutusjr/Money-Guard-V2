import style from "./index.module.css";

const Loading = () => {
  
  return (
    <div className={`${style.loadingContainer} bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900`}>
      <div className={style.loader}>
      <div className={style.dot}></div> 
      <div className={style.dot}></div>    
      <div className={style.dot}></div>    
      </div>
    </div>
  
  );
};

export default Loading;
